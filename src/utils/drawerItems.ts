import { User_Role } from "@/constant/role";
import { DrawerItem } from "./../types/index";
import { userRole } from "@/types";
import { LayoutDashboardIcon, BadgePlus, CreditCard, Send, Repeat, User } from "lucide-react";

export const drawerItem = (role: userRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];
  const commonRoutes=[
    {
      title: "Dashboard",
      path: `/dashboard`,
      icon: LayoutDashboardIcon,
    },
    {
      title: "Cash out",
      path: "/dashboard/cashOut",
      icon: CreditCard,
    },
    {
      title: "Send Money",
      path: "/dashboard/sendMoney",
      icon: Send,
    },
    {
      title: "Transaction",
      path: "/dashboard/transaction",
      icon: Repeat,
    },
    {
      title: "Profile",
      path: "/dashboard/profile",
      icon: User,
    }
  ]
  switch (role) {
    case User_Role.admin:
      roleMenus.push({
        title: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboardIcon,
        child: [
          {
            title: "Agent Management",
            path: `${role}/agent`,
          },
        ],
      });
      break;
    case User_Role.agent:
      roleMenus.push(
        {
          title: "Request Balance",
          path: "/dashboard/requestBalance",
          icon: BadgePlus,
        },
        
      );
      break;
    case User_Role.user:
      roleMenus.push(
       
      );
      break;
    default:
      break;
  }
  console.log(roleMenus);
  return [...commonRoutes,...roleMenus];
};
