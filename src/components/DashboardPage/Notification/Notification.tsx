"use client";
import { Bell } from "lucide-react";
import { NotificationDropdown } from "./NotificationDropdown";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useMarkAsReadMutation,
  useUnreadNotificationQuery,
} from "@/redux/api/notification";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data, isLoading, isError } = useUnreadNotificationQuery("");
  const [markAsRead] = useMarkAsReadMutation();

  if (isLoading) {
    return <Skeleton className="w-6 h-6 rounded-full" />;
  }
  console.log("from notification", data?.data);
  if (isError) {
    return <div>Error loading notifications</div>;
  }

  const handleNotificationClick = async (id: string) => {
    try {
      // Mark the notification as read
      await markAsRead({ id }).unwrap();
      // Navigate to the notification details page
      router.push(`/dashboard/notifications/${id}`);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  return (
    <NotificationDropdown
      trigger={
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-700" />
          {data?.data?.length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {data?.data?.length}
            </Badge>
          )}
        </div>
      }
      notifications={data?.data}
      onNotificationClick={handleNotificationClick}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
};

export default Notification;
