import DashboardDrawer from "@/components/Dashboard/DashboardDrawer";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <DashboardDrawer>{children}</DashboardDrawer>;
};

export default DashboardLayout;
