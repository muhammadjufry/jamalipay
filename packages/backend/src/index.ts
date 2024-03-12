import dotenv from "dotenv";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import router from "./router/index";
import passport from "passport";
import expressSession from "express-session";
import passportLocal from "passport-local";
import passportGoogle from "passport-google-oauth20";
import passportGithub from "passport-github2";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "./lib/users";
import bcrypt from "bcryptjs";
import { LoginValidator } from "./validator/Login";
import flash from "express-flash";

declare module "express-session" {
  interface SessionData {
    cookie: Cookie;
    passport?: {
      user?: string;
    };
    messages?: string[];
  }
}

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;
const GithubStrategy = passportGithub.Strategy;
const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config({});
app.use(
  cors({
    origin: [
      process.env.NODE_ENV === "production"
        ? "https://jamalipay.com"
        : "http://localhost:3000",
    ],
  })
);
app.use(flash());
app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());
app.use(bodyParser.json());

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      const validatedFields = LoginValidator.safeParse({ email, password });
      if (!validatedFields.success)
        return done(null, { error: "Invalid fields!" });
      const existingUser = await getUserByEmail(validatedFields.data.email);
      if (existingUser.status === "error")
        return done(null, { error: existingUser.error });
      if (!existingUser.data.user.password)
        return done(null, {
          error: "User already taken using other provider!",
        });
      if (!existingUser.data.user.verified)
        return done(null, { error: "Email not yet verified" });
      const checkPassword = await bcrypt.compare(
        password,
        existingUser.data.user.password
      );
      if (!checkPassword) return done(null, { error: "Password not correct!" });
      const token = jwt.sign(existingUser.data.user, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });
      return done(null, token);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const userEmail = profile.emails[0]?.value;
      if (!userEmail)
        return done(null, false, { message: "Email is required!" });
      const existingUser = await getUserByEmail(userEmail);
      if (existingUser.statusCode === 404) {
        const user = await createUser({
          name: profile.displayName,
          email: userEmail,
          provider: "google",
          verified: profile?._json?.email_verified || true,
        });
        const token = jwt.sign(user, process.env.JWT_SECRET!, {
          expiresIn: "7d",
        });
        return done(null, token);
      }
      if (existingUser.status === "error" && existingUser.statusCode !== 404) {
        return done(null, false, existingUser.error);
      }
      if (existingUser.data.user?.provider === "credentials") {
        return done(null, false, {
          message: "Email already taken with other provider!",
        });
      }
      const token = jwt.sign(existingUser.data.user, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });
      return done(null, token);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/v1/auth/github/callback",
      scope: ["user:email"],
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: (err?: Error | null, profile?: any) => void
    ) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api/v1", router);
app.get("/", (req, res) => {
  res.send("Welcome to Jamali Pay Server!");
});
