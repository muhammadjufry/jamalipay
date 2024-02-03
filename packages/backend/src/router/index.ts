import express from "express";
import { register } from "../controllers/authentication";
import passport, { Profile } from "passport";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserByEmail } from "../utils/users";

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.get("/auth/google/callback", (req, res) => {
  passport.authenticate("google", (err: any, user: Profile, info: any) => {
    if (err) {
      const error = err.toString();
      return res.send({ error: error }).status(400);
    }
    if (user) {
      req.login(user, (error) => {
        if (error) {
          return res.send(error);
        } else {
          return res.send(user);
        }
      });
    } else {
      if (info?.message) {
        return res.send({ error: info?.message });
      }
      return res.send("Something went wrong!");
    }
  })(req, res);
});
router.get(
  "/auth/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);
router.get("/auth/github/callback", (req, res) => {
  passport.authenticate("github", (err: any, user: any, info: any) => {
    if (err) {
      const error = err.toString();
      return res.send({ error: error }).status(400);
    }
    if (user) {
      req.login(user, (error) => {
        if (error) {
          return res.send(error);
        } else {
          return res.send(user);
        }
      });
    } else {
      if (info?.message) {
        return res.send({ error: info?.message });
      }
      return res.send("Something went wrong!");
    }
  })(req, res);
});

router.post("/auth/login", passport.authenticate("local"), (req, res) => {
  if (!req.session?.passport?.user)
    res.send({ error: "Session not found!" }).status(400);
  res.send(req.session?.passport?.user);
});
router.post("/auth/register", register);

router.post("/user", async (req, res) => {
  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader.split(" ")[1];
  if (!token) return res.status(400).send({ error: "Missing bearer token!" });
  const decodedUser = jwt.verify(token, process.env.JTW_SECRET!);
  const { email } = decodedUser as JwtPayload;
  const user = await getUserByEmail(email);
  if (!user) return res.send({ error: "User does not exist!" }).status(400);
  return res.send(decodedUser);
});

router.post("/auth/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.send({ message: "Successfully logout!" });
  });
});

export default router;
