import * as z from "zod";

export const RegisterValidator = z.object({
  name: z.string().min(1, {
    message: "Name is required!",
  }),
  username: z.string().min(1, {
    message: "username is required!",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required!",
    })
    .email(),
  password: z.string().min(6, {
    message: "Password at least 6 characters!",
  }),
});
