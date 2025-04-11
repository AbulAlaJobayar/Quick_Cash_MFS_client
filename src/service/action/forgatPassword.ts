
import { FieldValues } from "react-hook-form";

const forgatPassword = async (data: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forget-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );
    if (!res.ok) {
     return await res.json();
    }

    const loginInfo = await res.json();
    
    return loginInfo;
  } catch (error) {
    console.error("Error during user login:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export default forgatPassword;
