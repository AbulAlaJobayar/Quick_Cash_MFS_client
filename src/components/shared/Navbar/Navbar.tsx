"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthButton from "./AuthButton";
import { isLoggedIn } from "@/service/action/authServices";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathName = usePathname();
  const userLoggedIn = isLoggedIn(); // Check if user is logged in
  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 p-4 dark:bg-black transition-colors duration-300 ${
        isScrolled
          ? "bg-background/95 dark:bg-black bg-gradient-to-r from-pink-800 to-pink-700 backdrop-blur-md border-b border-pink-400 text-white rounded-md" // Add background color and border when scrolled
          : "bg-gradient-to-tr dark:bg-black from-pink-600 to-pink-700 text-white hover:text-white" //"bg-transparent border-transparent" // Transparent background and no border when at the top
      }`}
    >
      <div className="mx-auto container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold">
          QKash
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-4 relative">
          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              className="relative"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                href={link.href}
                className={`hover:text-white ${
                  pathName === link.href ? "text-white" : ""
                }`}
              >
                {link.label}
              </Link>
              {pathName === link.href && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-red-400"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Right Side: Theme Toggle, User Avatar, and Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          {/* User Avatar or Login Link */}
          {userLoggedIn ? (
            <div className="hidden md:block relative">
              <Avatar onClick={toggleDropdown}>
                
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
               
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 mt-2 w-48 dark:bg-black bg-pink-600 border-pink-700 rounded-lg shadow-lg"
                  >
                    <div className="p-2 ">
                      <Link
                        href="/dashboard"
                        className="flex items-center p-2 hover:bg-pink-700 rounded-lg"
                      >
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                      <button
                        onClick={toggleTheme}
                        className="flex items-center w-full p-2 hover:bg-pink-700 rounded-lg"
                      >
                        {theme === "light" ? (
                          <Moon className="h-4 w-4 mr-2" />
                        ) : (
                          <Sun className="h-4 w-4 mr-2" />
                        )}
                        Switch Theme
                      </button>
                      <AuthButton />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden  md:flex items-center space-x-4">
              {" "}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === "light" ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </Button>
              </motion.div>
             <motion.div
             initial={{ scale: 1 }}
             whileHover={{ scale: 1.1 }}
              >
             <Link
                href="/login"
                className="hover:text-white "
              >
                Login
              </Link>
             </motion.div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden"
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-16 right-4 dark:bg-black bg-pink-600 border-pink-700 border rounded-lg shadow-lg p-4 w-48"
            >
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center p-2 hover:bg-pink-700 rounded-lg ${
                      pathName === link.href ? "text-white border border-pink-900" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Authentication Links */}
              {userLoggedIn ? (
                <>
                  {" "}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <Link
                      href="/dashboard"
                      className="flex items-center p-2 hover:bg-pink-700 rounded-lg"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </motion.div>
                  <motion.div
                  initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <button
                      onClick={toggleTheme}
                      className="flex items-center p-2 hover:bg-pink-700 rounded-lg"
                    >
                      {theme === "light" ? (
                        <Moon className="h-4 w-4 mr-2" />
                      ) : (
                        <Sun className="h-4 w-4 mr-2" />
                      )}
                      Switch Theme
                    </button>
                  </motion.div>
                  <AuthButton />
                </>
              ) : (
                <motion.div
                initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/login"
                    className="block py-2 hover:text-primary transition-colors"
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
