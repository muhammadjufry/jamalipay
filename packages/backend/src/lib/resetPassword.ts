import db from "../db/db";
import { v4 as uuidv4 } from "uuid";

export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    const resetPassordToken = await db("reset-password")
      .where({ email })
      .returning("*");
    if (!resetPassordToken) return null;
    return resetPassordToken[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getResetPasswordTokenByToken = async (token: string) => {
  try {
    const resetPassordToken = await db("reset-password")
      .where({ token })
      .returning("*");
    if (!resetPassordToken) return null;
    return resetPassordToken[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const createResetPasswordToken = async (email: string) => {
  try {
    const existingResetPassordToken = await db("reset-password").where({
      email,
    });
    if (existingResetPassordToken) {
      const deletedToken = await deleteResetPasswordTokenByEmail(email);
      if (!deletedToken) return null;
    }
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const newResetPassordToken = await db("reset-password")
      .insert({
        email,
        token,
        expires,
      })
      .returning("*");
    return newResetPassordToken[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const deleteResetPasswordTokenByEmail = async (email: string) => {
  try {
    const resetPassordToken = await db("reset-password").where({ email });
    if (!resetPassordToken) return null;
    await db("reset-password").where({ email }).delete();
    return { success: "Token successfully deleted!" };
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const deleteResetPasswordTokenByToken = async (token: string) => {
  try {
    const resetPassordToken = await db("reset-password").where({ token });
    if (!resetPassordToken) return null;
    await db("reset-password").where({ token }).delete();
    return { success: "Token successfully deleted!" };
  } catch (error) {
    console.log(error);
    return null;
  }
};
