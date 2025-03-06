"use server"
import { cookies } from "next/headers";

export const deleteCookies = async(keys: string[]) => {
  for (const key of keys) {
    const cookieStore = await cookies();
    cookieStore.delete(key);
  }
};
