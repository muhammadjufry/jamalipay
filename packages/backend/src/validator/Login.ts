import * as z from "zod";

export const LoginValidator = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required!",
    })
    .email(),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
});
