"use client"; // Required for client-side interactivity

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/"); // Track the active link

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/login", label: "Login" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="flex items-center justify-between p-4 bg-background border-b">
      {/* Logo or Brand */}
      <Link href="/" className="text-lg font-bold ">
        MyApp
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-4 relative">
        {navLinks.map((link) => (
          <motion.div
            key={link.href}
            className="relative"
            onClick={() => setActiveLink(link.href)}
          >
            <Link
              href={link.href}
              className={`hover:text-primary transition-colors ${
                activeLink === link.href ? "text-primary" : ""
              }`}
            >
              {link.label}
            </Link>
            {activeLink === link.href && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      
      
      {/* Theme Toggle and Mobile Menu Button */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden"
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            className="md:hidden absolute top-16 right-4 bg-background border rounded-lg shadow-lg p-4 w-48"
          >
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveLink(link.href);
                  toggleMenu();
                }}
              >
                <Link
                  href={link.href}
                  className={`block py-2 hover:text-primary transition-colors ${
                    activeLink === link.href ? "text-primary" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}