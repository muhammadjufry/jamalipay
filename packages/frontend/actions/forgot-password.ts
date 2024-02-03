"use server";
import * as z from "zod";
import { ForgotPasswordSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendForgotPasswordEmail } from "@/lib/mail";
import { generateForgotPasswordToken } from "@/lib/tokens";

export const forgotPassword = async (
  values: z.infer<typeof ForgotPasswordSchema>
) => {
  const validatedFields = ForgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: "User not found!" };

  const forgotPasswordToken = await generateForgotPasswordToken(email);
  await sendForgotPasswordEmail(
    forgotPasswordToken.email,
    forgotPasswordToken.token
  );

  return { success: "Reset password link sent your email!" };
};
