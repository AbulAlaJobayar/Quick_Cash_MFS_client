import { User_Role } from "@/constant/role";
import { DrawerItem } from "./../types/index";
import { userRole } from "@/types";
import { LayoutDashboardIcon, BadgePlus, CreditCard, Send, Repeat, User, ClipboardList, BadgeCheck, Users, User2 } from "lucide-react";

export const drawerItem = (role: userRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];
  const commonRoutes=[
    {
      title: "Dashboard",
      path: `/dashboard`,
      icon: LayoutDashboardIcon,
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
      roleMenus.push(
        {
          title: "Cash In",
          path: "/dashboard/cashIn",
          icon: CreditCard,
        },
        {
          title: "Balance Requests",
          path: "/dashboard/approvedRequests",
          icon: BadgeCheck
        },
        {
          title: "All Agent",
          path: "/dashboard/agents",
          icon:  Users
        },
        {
          title: "All User",
          path: "/dashboard/users",
          icon:  User2
        }
     );
      break;
    case User_Role.agent:
      roleMenus.push(
        {
          title: "Cash In",
          path: "/dashboard/cashIn",
          icon: CreditCard,
        },

        {
          title: "Request Balance",
          path: "/dashboard/requestBalance",
          icon: BadgePlus,
        },
        {
          title: "Total Request",
          path: "/dashboard/totalRequestBalance",
          icon: ClipboardList,
        }
        
      );
      break;
    case User_Role.user:
      roleMenus.push(
        {
          title: "Cash Out",
          path: "/dashboard/cashOut",
          icon: CreditCard,
        },
      );
      break;
    default:
      break;
  }
  console.log(roleMenus);
  return [...commonRoutes,...roleMenus];
};
