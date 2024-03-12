import * as z from "zod";
import express from "express";
import { createUser, getUserByEmail } from "../lib/users";
import bcrypt from "bcryptjs";
import { RegisterValidator } from "../validator/Register";
import { createUserVerification } from "../lib/userVerification";
import sendEmail from "../lib/mail";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { name, username, email, password } = req.body as z.infer<
      typeof RegisterValidator
    >;
    const validatedFields = RegisterValidator.safeParse(req.body);
    if (!validatedFields.success) {
      return res.send({ error: "Invalid fields!" }).status(400);
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.send({ error: "User already exist!" }).status(400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      name,
      username,
      email,
      password: hashedPassword,
      provider: "credentials",
    });
    const userVerification = await createUserVerification(user.email);
    sendEmail({
      emailDestination: user.email,
      subject: `JAMALI PAY | YOUR VERIFICATION CODE IS ${userVerification.token}`,
      content: `Your verification code is: ${userVerification.token}`,
    });
    return res.send({ user });
  } catch (error) {
    console.log(error);
    return res.send({ error: "Something went wrong!" }).status(400);
  }
};
