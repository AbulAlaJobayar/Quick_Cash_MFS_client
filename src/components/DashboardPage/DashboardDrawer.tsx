"use client";
import { ReactNode, useState } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import SideBar from "./SideBar";
import { Separator } from "../ui/separator";
import Breadcrumbs from "./Breadcrumbs";
import NavUser from "./NavUser";
import Notification from "./Notification/Notification";
import { useGetMeQuery } from "@/redux/api/authApi";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import QKSModel from "../shared/Model/QKSModel";
import AgentModal from "./BecomeAnAgent/agentModal";

const DashboardDrawer = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useGetMeQuery("");
  const [open,setOpen]=useState(false)
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <SideBar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between sticky top-0 border-b bg-gray-50 z-40 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Breadcrumbs />
            </div>

            <div className="flex items-center gap-10">
              {isLoading ? (
                <div className="flex items-center">
                <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : data?.data?.accountType === "user" ? (
                <motion.div
                  animate={{
                    x: [-5, 5],
                  }}
                  transition={{
                    repeat: Infinity, // Loop forever
                    duration: 1,
                    ease: "easeInOut",
                  }}
                >
                  <Button onClick={()=>setOpen(true)} className="cursor-pointer">Become An Agent</Button>
                </motion.div>
              ) : null}

              <div className="flex items-center gap-10">
                <Notification />
                <NavUser data={data} isLoading={isLoading} />
              </div>
            </div>
          </header>
          <div className=" m-2 ">{children}</div>
        </SidebarInset>
      </div>
      <QKSModel open={open} setOpen={setOpen} title="Become an Agent">
      <AgentModal setOpen={setOpen}/>
      </QKSModel>
    </SidebarProvider>
  );
};

export default DashboardDrawer;
