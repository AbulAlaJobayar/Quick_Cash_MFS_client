"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/sidebar";
import Link from "next/link";
import { drawerItem } from "@/utils/drawerItems";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/service/action/authServices";
import { userRole } from "@/types";
import SideBarItems from "./SideBarItems";

const SideBar = () => {
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const { role } = getUserInfo() as { role: userRole };
    setUserRole(role);
  }, []);

  return (
    <Sidebar>
      <SidebarHeader>
        {/* logo*/}
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              href="/"
              className="flex flex-col gap-0.5 py-3 my-0.5  items-center justify-center  font-semibold  border-b-1"
            >
              <span className=" text-lg hover:scale-110 transition-transform duration-200">
                QKash
              </span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* sidebar Item */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {drawerItem(userRole as userRole).map((item, index) => (
              <SideBarItems key={index} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default SideBar;
