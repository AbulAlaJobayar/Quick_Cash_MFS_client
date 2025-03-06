/* eslint-disable @typescript-eslint/no-explicit-any */
import { authKey } from "@/constant/authKey";
import { getUserInfo, logOut, removedUser } from "./authServices";
import { deleteCookies } from "./deleteCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

 const logoutUser = async (router: AppRouterInstance) => {
  const { id } = getUserInfo();
  try {
    await logOut({ id });
    await deleteCookies([authKey, "refreshToken"]);
    removedUser();
    router.push("/");
    router.refresh();
  } catch (error: any) {
    console.log(error);
  }
};
export default logoutUser;