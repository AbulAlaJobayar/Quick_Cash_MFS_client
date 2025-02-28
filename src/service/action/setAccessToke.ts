"use server";
import { redirect } from "next/navigation";
import { authKey } from "@/constant/authKey";
import { cookies } from "next/headers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setAccessToken = async (token: string, option?: any) => {
  (await cookies()).set(authKey, token);
  if (option && option.redirect) {
    redirect(option.redirect);
  }
};
