"use server";
import * as z from "zod";
import { ResetPasswordSchema } from "@/schemas";
import { getForgotPasswordTokenByToken } from "@/data/forgot-password-token";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
  token: string | null
) => {
  if (!token) return { error: "Missing token!" };

  const validatedFields = ResetPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { password } = validatedFields.data;

  const existingToken = await getForgotPasswordTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "User does not exist!" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.forgotPasswordToken.delete({
    where: { id: existingToken.id },
  });

  return {
    success: "Password updated!",
  };
};
