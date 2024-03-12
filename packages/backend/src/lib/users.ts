import db from "../db/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db("users").where({ email });
    if (!user)
      return { error: "User not found!", status: "error", statusCode: 404 };
    return {
      data: {
        success: "User found!",
        user: user[0],
      },
      status: "success",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!", status: "error", statusCode: 500 };
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db("users").where({ id });
    if (!user)
      return { error: "User not found!", status: "error", statusCode: 400 };
    return user[0];
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!", status: "error", statusCode: 500 };
  }
};
export const createUser = async (data: Record<string, any>) => {
  try {
    const { email } = data;
    const existingUser = await db("users").where({ email }).returning("*");
    if (existingUser.length !== 0)
      return {
        error: "Email provided already exist!",
        status: "error",
        statusCode: 400,
      };
    const user = await db("users").insert(data).returning("*");
    return user[0];
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!", status: "error", statusCode: 500 };
  }
};
export const deleteUserByEmail = async (email: string) => {
  try {
    const existingUser = await db("users").where({ email }).returning("*");
    if (!existingUser || existingUser.length === 0)
      return { error: "User not found!", status: "error", statusCode: 400 };
    await db("users").where({ email }).delete();
    return {
      success: "User successfully deleted!",
      status: "success",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!", status: "error", statusCode: 500 };
  }
};
export const deleteUserById = async (id: string) => {
  try {
    const checkIfUserExist = await db("users").where({ id });
    if (!checkIfUserExist)
      return { error: "User not found!", status: "error", statusCode: 400 };
    await db("users").where({ id }).delete();
    return {
      success: "User successfully deleted!",
      status: "success",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!", status: "error", statusCode: 500 };
  }
};
export const updateUserByEmail = async (
  email: string,
  data: Record<string, any>
) => {
  try {
    const checkIfUserExist = await db("users").where({ email });
    if (!checkIfUserExist)
      return { error: "User not found!", status: "error", statusCode: 400 };
    const updatedUser = await db("users")
      .where({ email })
      .update(data)
      .returning("*");
    return {
      data: {
        success: "User successfully updated",
        user: updatedUser[0],
      },
      status: "success",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!", status: "error", statusCode: 500 };
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
    return {
      data: {
        success: "User successfully updated",
        user: updatedUser[0],
      },
      status: "success",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!", status: "error", statusCode: 500 };
  }
};
