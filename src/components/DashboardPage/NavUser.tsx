'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AuthButton from "../shared/Navbar/AuthButton";
import { useGetMeQuery } from "@/redux/api/authApi";
import { Loader2 } from "lucide-react";




const NavUser = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
const {data,isLoading}=useGetMeQuery('')

console.log(data,"navivbar icon image")
  

  return (
    <div className="hidden md:block relative">
      {/* Avatar */}
      <Avatar onClick={toggleDropdown} className="cursor-pointer">
        <AvatarImage src={data?.data?.img} alt="@shadcn" />
        <AvatarFallback className="bg-gray-100 dark:bg-gray-800">
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <span className="text-lg">👤</span>
          )}
        </AvatarFallback>
      </Avatar>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-2 w-fit dark:bg-black bg-accent text-red-900"
          >
            <div className="p-2">
              <AuthButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavUser;