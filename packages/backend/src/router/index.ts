import express from "express";
import { register } from "../controllers/authentication";
import passport, { Profile } from "passport";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  deleteUserByEmail,
  getUserByEmail,
  updateUserByEmail,
} from "../lib/users";
import { ForgotPasswordValidator } from "../validator/ForgotPassword";
import { ResetPasswordValidator } from "../validator/ResetPassword";
import {
  createResetPasswordToken,
  getResetPasswordTokenByToken,
} from "../lib/resetPassword";
import { DeleteUserValidator } from "../validator/DeleteUser";
import { UserVerificationValidator } from "../validator/UserVerification";
import {
  deleteUserVerificationByEmail,
  getUserVerificationByToken,
} from "../lib/userVerification";

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

router.post("/auth/verify-user", async (req, res) => {
  try {
    const validatedFields = UserVerificationValidator.safeParse(req.body);
    if (!validatedFields.success)
      return res.send({ error: "Invalid fields!" }).status(400);
    const existingUserVerificationToken = await getUserVerificationByToken(
      validatedFields.data.verficationCode
    );
    if (!existingUserVerificationToken)
      return res.send({ error: "Verification code is invalid!" }).status(400);
    const existingUser = await getUserByEmail(
      existingUserVerificationToken.email
    );
    if (existingUser.status === "error") {
      return res.send(existingUser.error).status(existingUser.statusCode);
    }
    if (existingUser.data.user.verified)
      return res.send({ error: "User already verified!" }).status(400);
    const updatedUser = await updateUserByEmail(
      existingUserVerificationToken.email,
      { verified: true }
    );
    if (updatedUser.error)
      return res.send({ error: updatedUser.error }).status(400);
    await deleteUserVerificationByEmail(existingUserVerificationToken.email);
    return res.send({ success: "User successfully verified!" });
  } catch (error) {
    console.log(error);
    return res.send({ error: "Something went wrong!" }).status(400);
  }
});

router.post("/user", async (req, res) => {
  try {
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader.split(" ")[1];
    if (!token) return res.status(400).send({ error: "Missing bearer token!" });
    const decodedUser = jwt.verify(token, process.env.JTW_SECRET!);
    const { email } = decodedUser as JwtPayload;
    const existingUser = await getUserByEmail(email);
    if (existingUser.status === "error") {
      return res.send(existingUser.error).status(existingUser.statusCode);
    }
    return res.send(existingUser).status(existingUser.statusCode);
  } catch (error) {
    console.log(error);
    return res.send({ error: "Something went wrong!" }).status(400);
  }
});

router.post("/auth/logout", (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) return next(err);
      res.send({ message: "Successfully logout!" });
    });
  } catch (error) {
    console.log(error);
    return res.send({ error: "Something went wrong!" }).status(400);
  }
});

router.post("/user/delete", async (req, res) => {
  try {
    const validatedFields = DeleteUserValidator.safeParse(req.body);
    if (!validatedFields.success)
      return res.status(400).send({ error: "Invalid fields!" });
    const deletedUser = await deleteUserByEmail(validatedFields.data.email);
    if (deletedUser.status === "success") {
      return res.status(deletedUser.statusCode).send(deletedUser.success);
    } else if (deletedUser.status === "error") {
      return res.status(deletedUser.statusCode).send(deletedUser.error);
    }
  } catch (error) {
    console.log(error);
    return res.send("Something went wrong!").status(400);
  }
});

router.post("/auth/forgot-password", async (req, res) => {
  try {
    const validatedFields = ForgotPasswordValidator.safeParse(req.body);
    if (!validatedFields.success)
      return res.send({ error: "Invalid fields!" }).status(400);
    const existingUser = await getUserByEmail(validatedFields.data.email);
    if (existingUser.status === "error") {
      return res.send(existingUser.error).status(existingUser.statusCode);
    }
    const resetPassordToken = await createResetPasswordToken(
      validatedFields.data.email
    );
    if (!resetPassordToken)
      return res.send({ error: "Something went wrong!" }).status(400);
    return res.send(resetPassordToken);
  } catch (error) {
    console.log(error);
    return res.send({ error: "Something went wrong!" }).status(400);
  }
});

router.post("/auth/reset-password", async (req, res) => {
  try {
    const validatedFields = ResetPasswordValidator.safeParse(req.body);
    if (!validatedFields.success)
      return res.send({ error: "Invalid fields!" }).status(400);
    const resetPasswordToken = await getResetPasswordTokenByToken(
      validatedFields.data.token
    );
    if (!resetPasswordToken)
      return res.send({ error: "Token does not exist!" }).status(400);
    const currentDate = new Date();
    if (resetPasswordToken.expires < currentDate) {
      return res.send({ error: "Token already expired!" }).status(400);
    }
    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);
    await updateUserByEmail(resetPasswordToken.email, {
      password: hashedPassword,
    });
    return res.send({ success: "Password successfully updated!" });
  } catch (error) {
    console.log(error);
    return res.send({ error: "Something went wrong!" }).status(400);
  }
});

export default router;
