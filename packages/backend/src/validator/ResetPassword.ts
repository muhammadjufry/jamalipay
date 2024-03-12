import * as z from "zod";

export const ResetPasswordValidator = z.object({
  token: z.string().min(1, {
    message: "Token is required!",
  }),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
});
