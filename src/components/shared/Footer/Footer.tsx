"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Clock } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-pink-600 to-pink-800 text-white py-12">
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
            <p className="text-gray-400">
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
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
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
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>+880 2 5566 3001</span>
              </li>
              <li className="flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>support@bkash.com</span>
              </li>
              <li className="flex items-center justify-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>SKS Tower, Dhaka</span>
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
                href="https://facebook.com"
                className="text-gray-400 hover:text-white"
              >
                <Facebook className="w-6 h-6" />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="w-6 h-6" />
              </Link>
              <Link
                href="https://instagram.com"
                className="text-gray-400 hover:text-white"
              >
                <Instagram className="w-6 h-6" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white"
              >
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div
          className="border-t border-gray-800 pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} QKash. All rights reserved.
          </p>
          <p className="text-gray-400 mt-2">
            Made with ❤️ by {' '}
            <Link
              href="https://yourwebsite.com"
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