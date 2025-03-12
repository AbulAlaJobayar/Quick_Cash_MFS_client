import { User_Role } from "@/constant/role";
import { DrawerItem } from "./../types/index";
import { userRole } from "@/types";
import { LayoutDashboardIcon } from "lucide-react";

export const drawerItem = (role: userRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];
  switch (role) {
    case User_Role.admin:
      roleMenus.push({
        title: "Dashboard",
        path: `${role}`,
        icon: LayoutDashboardIcon,
      });
      break;
    case User_Role.agent:
      roleMenus.push({
        title: "Dashboard",
        path: `${role}`,
        icon: LayoutDashboardIcon,
      });
      break;
    case User_Role.user:
      roleMenus.push({
        title: "Dashboard",
        path: `${role}`,
        icon: LayoutDashboardIcon,
      });
      break;
    default:
      break;
  }
  return [...roleMenus];
};
