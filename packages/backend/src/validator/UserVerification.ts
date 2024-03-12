import * as z from "zod";

export const UserVerificationValidator = z.object({
  verficationCode: z.number().min(1, {
    message: "Verfication Code is required!",
  }),
});
