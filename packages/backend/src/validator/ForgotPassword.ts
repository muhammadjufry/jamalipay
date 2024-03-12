import * as z from "zod";

export const ForgotPasswordValidator = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required!",
    })
    .email(),
});
