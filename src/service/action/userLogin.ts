
import { setAccessToken } from "./setAccessToke";
import { FieldValues } from "react-hook-form";

const userLogin = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
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
    console.log('login function',userInfo)
    if (userInfo.data) {
      setAccessToken(userInfo.data, { redirect: "/dashboard" });
    }
    return userInfo;
  } catch (error) {
    console.error("Error during user login:", error);
    throw error;
  }
};
export default userLogin
