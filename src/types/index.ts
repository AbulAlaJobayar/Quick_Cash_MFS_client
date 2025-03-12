import { User_Role } from "@/constant/role";
import { LucideIcon } from "lucide-react";

export type IMeta = {
  page: number;
  limit: number;
  total: number;
};
export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorMessage: any;
};
export type userRole = keyof typeof User_Role;
export interface DrawerItem {
  title: string;
  path: string;
  parentPath?: string;
  icon?: LucideIcon;
  child?: DrawerItem[];
}
