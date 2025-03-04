import { FieldValues } from "react-hook-form";

const userRegister = async (data: FieldValues) => {
  console.log("user login", process.env.BACKEND_URL);
  try {
    const res = await fetch(`http://localhost:5000/api/v1/users/create_user`, {
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
