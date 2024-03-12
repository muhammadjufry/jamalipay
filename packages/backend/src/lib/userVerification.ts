import db from "../db/db";
import crypto from "crypto";

export const getUserVerificationByEmail = async (email: string) => {
  try {
    const userVerification = await db("user-verification")
      .where({ email })
      .returning("*");
    if (!userVerification) return { error: "Token not found!" };
    return userVerification[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getUserVerificationByToken = async (token: number) => {
  try {
    const userVerification = await db("user-verification")
      .where({ token })
      .returning("*");
    if (!userVerification) return null;
    return userVerification[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const createUserVerification = async (email: string) => {
  try {
    const existinguserVerification = await db("user-verification")
      .where({
        email,
      })
      .returning("*");
    if (existinguserVerification.length > 0) {
      await deleteUserVerificationByEmail(email);
    }
    const token = crypto.randomInt(100000, 999999);
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const newuserVerification = await db("user-verification")
      .insert({
        email,
        token,
        expires,
      })
      .returning("*");
    return newuserVerification[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const deleteUserVerificationByEmail = async (email: string) => {
  try {
    const userVerification = await db("user-verification").where({ email });
    if (!userVerification) return { error: "User verifcation not found!" };
    await db("user-verification").where({ email }).delete();
    return { success: "User verfication successfully deleted!" };
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const deleteUserVerificationTokenByToken = async (token: string) => {
  try {
    const userVerification = await db("user-verification").where({ token });
    if (!userVerification) return { error: "User verification not found!" };
    await db("user-verification").where({ token }).delete();
    return { success: "User verfication successfully deleted!" };
  } catch (error) {
    console.log(error);
    return null;
  }
};
