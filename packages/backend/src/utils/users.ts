import db from "../db/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db("users").where({ email });
    if (!user) return null;
    return user[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db("users").where({ id });
    if (!user) return { error: "User not found!" };
    return user[0];
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
export const createUser = async (data: Record<string, any>) => {
  try {
    const { email } = data;
    const checkIfUserExist = await db("users").where({ email });
    if (checkIfUserExist.length !== 0)
      return { error: "Email provided already exist!" };
    const user = await db("users").insert(data).returning("*");
    return user;
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
export const deleteUserById = async (id: string) => {
  try {
    const checkIfUserExist = await db("users").where({ id });
    if (!checkIfUserExist) return { error: "User not found!" };
    await db("users").where({ id }).delete();
    return { success: "User successfully deleted" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
export const updateUserById = async (id: string, data: Record<string, any>) => {
  try {
    const checkIfUserExist = await db("users").where({ id });
    if (!checkIfUserExist) return { error: "User not found!" };
    const updatedUser = await db("users")
      .where({ id })
      .update(data)
      .returning("*");
    return { success: "User successfully updated", user: updatedUser[0] };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
