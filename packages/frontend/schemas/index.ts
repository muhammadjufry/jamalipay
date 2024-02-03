import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  twoFactorCode: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email(),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email(),
});
export const ResetPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const ProfileSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  username: z.string().min(1, {
    message: "Username is required",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email(),
  bio: z.string().optional(),
});
