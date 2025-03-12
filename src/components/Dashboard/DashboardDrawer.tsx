import { ReactNode } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import SideBar from "./SideBar";
import { Separator } from "../ui/separator";
import Breadcrumbs from "./Breadcrumbs";

const DashboardDrawer = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <SideBar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b sticky top-0 bg-gray-50 z-40">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumbs />
            </div>
          </header>
          <div className="m-8">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardDrawer;
