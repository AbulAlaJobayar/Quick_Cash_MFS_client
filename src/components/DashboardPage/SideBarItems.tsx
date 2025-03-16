import { DrawerItem } from "@/types";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarItems = ({ item }: { item: DrawerItem }) => {
  const linkPath = `/dashboard/${item.path}`;
  const pathName = usePathname();
  const isActive = pathName===linkPath; // Ensures matching for nested routes

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={item.path}
          className={`flex items-center gap-2 font-medium transition-all duration-300 ${
            isActive ? "border-r-4 border-pink-600 rounded-none" : "text-gray-700"
          }`}
        >
          {item.icon && <item.icon className="w-5 h-5" />} {/* Render icon */}
          {item.title}
        </Link>
      </SidebarMenuButton>

      {item.child?.length ? (
        <SidebarMenuSub>
          {item.child.map((subItem) => (
            <SidebarMenuSubItem key={subItem.path}>
              <SidebarMenuSubButton asChild>
                <Link
                  href={subItem.path}
                  className={`flex items-center gap-2 transition-all duration-300 ${
                    pathName.startsWith(subItem.path) ? "text-blue-500 font-semibold" : "text-gray-600"
                  }`}
                >
                  {subItem.icon && <subItem.icon className="w-4 h-4" />}
                  {subItem.title}
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      ) : null}
    </SidebarMenuItem>
  );
};

export default SideBarItems;
