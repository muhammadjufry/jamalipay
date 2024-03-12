import * as z from "zod";

export const DeleteUserValidator = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required!",
    })
    .email(),
});
