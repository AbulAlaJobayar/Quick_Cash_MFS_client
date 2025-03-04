
import { setAccessToken } from "./setAccessToke";
import { FieldValues } from "react-hook-form";

const userLogin = async (data: FieldValues) => {
  console.log("user login", process.env.BACKEND_URL);
  try {
    const res = await fetch(`http://localhost:5000/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!res.ok) {
      return await res.json();
    }

    const userInfo = await res.json();
    if (userInfo.data.isLoggedIn) {
      return userInfo.data;
    }
    if (userInfo.data) {
      setAccessToken(userInfo.data, { redirect: "/dashboard" });
    }
    return userInfo;
  } catch (error) {
    console.error("Error during user login:", error);
    throw error;
  }
};
export default userLogin;
