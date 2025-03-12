"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { MdWhatsapp } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#070D13] text-white py-12"
    clip-polygon
    >
      <div className="container mx-auto px-4">
        {/* Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-center">
          {/* Column 1: About Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-white">
              QKash is a leading digital financial service provider, empowering
              millions of users with fast, secure, and accessible transactions.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-white">
              <li className="flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>+8801928210545</span>
              </li>
              <li className="flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>abulalajobayar@gmail.com</span>
              </li>
              <li className="flex items-center justify-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Gazi Tower, Khulna</span>
              </li>
              <li className="flex items-center justify-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>10:00 AM - 4:30 PM</span>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              <Link
                href="https://www.facebook.com/abul.ala.jobayar.2024/"
                className="text-white hover:text-white"
              >
                <Facebook className="w-6 h-6" />
              </Link>
              <Link
                href="https://wa.me/+8801928210545" target="blank"
                className="text-white hover:text-white"
              >
                <MdWhatsapp className="w-6 h-6" />
              </Link>
              <Link
                href="https://instagram.com"
                className="text-white hover:text-white"
              >
                <Instagram className="w-6 h-6" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/abulalajobayar/"
                className="text-white hover:text-white"
              >
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div
          className="border-t border-white pt-4 text-center flex justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-white">
            © {new Date().getFullYear()} QKash. All rights reserved.
          </p>
          <p className="text-white mt-2">
            Made with ❤️ by {' '}
            <Link
              href="https://portfolio-rose-theta-63.vercel.app/"
              className="text-white hover:underline"
            >
            Abul Ala Jobayar
            </Link>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;