import { db } from "@/lib/db";

export const getForgotPasswordTokenByToken = async (token: string) => {
  try {
    const forgotPasswordToken = await db.forgotPasswordToken.findUnique({
      where: {
        token,
      },
    });

    return forgotPasswordToken;
  } catch {
    return null;
  }
};

export const getForgotPasswordTokenByEmail = async (email: string) => {
  try {
    const forgotPasswordToken = await db.forgotPasswordToken.findFirst({
      where: {
        email,
      },
    });

    return forgotPasswordToken;
  } catch {
    return null;
  }
};
