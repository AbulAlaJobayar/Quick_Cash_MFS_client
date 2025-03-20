" use client"
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


 interface NotificationDropdownProps {
  trigger: React.ReactNode;
  notifications: INotification[];
  onNotificationClick: (id:string) => void;
  isOpen:boolean;
  setIsOpen:React.Dispatch<React.SetStateAction<boolean>>
}
export interface INotification {
    _id: string;
    userId: string;
    transactionId: string;
    isRead: boolean;
    message: string;
    createdAt: string;
}

export const NotificationDropdown = ({
  trigger,
  notifications,
  onNotificationClick,
  isOpen,
      setIsOpen
}: NotificationDropdownProps) => {
  // console.log("notification cccc",notifications[0]._id);

  return (
    <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer">{trigger}</div>
      </DropdownMenuTrigger>
      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent
            align="end"
            className="mt-5 w-64 bg-white shadow-lg rounded-lg"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {notifications.length > 0 ? (
                notifications.map((notification,index) => (
                  <DropdownMenuItem
                    key={index}
                    className={` p-2 m-2 hover:bg-gray-100 ${
                      notification?.isRead ? "bg-white" : "bg-pink-100"
                    }`}
                    onClick={() => onNotificationClick(notification?._id)}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm">{notification?.message}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(notification?.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem className=" p-2 text-gray-500">
                  No new notifications
                </DropdownMenuItem>
              )}
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
};
