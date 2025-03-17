import { FieldValues } from "react-hook-form";

const userRegister = async (data: FieldValues) => {
  console.log("user login", process.env.BACKEND_URL);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/create_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
      cache: "no-cache",
    });
    if (!res.ok) {
      return await res.json();
    }

    return await res.json();
  } catch (error) {
    console.error("Error during user login:", error);
    throw error;
  }
};
export default userRegister;
