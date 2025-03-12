"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";

const ContactUs = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.section
        className="relative text-center bg-pink-700 text-white py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Content */}
        <motion.h1 className="text-5xl font-bold mb-4" variants={itemVariants}>
          Contact Us
        </motion.h1>
        <motion.p className="text-xl mb-8" variants={itemVariants}>
          We’re here to help! Reach out to us anytime for support, questions, or feedback.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button className="bg-white text-pink-700 hover:bg-gray-200">
            <Link href="/register">Get Started</Link>
          </Button>
        </motion.div>

        {/* SVG Shape Divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-24"
            preserveAspectRatio="none"
          >
            <path
              fill="#f8f9fa"
              fillOpacity="1"
              d="M0,224L120,208C240,192,480,160,720,170.7C960,181,1200,235,1320,261.3L1440,288L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </div>
      </motion.section>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
        {/* Contact Methods Section */}
        <motion.section
          className="container mx-auto px-4 mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl font-bold text-gray-900 text-center mb-8"
            variants={itemVariants}
          >
            How Can We Help You?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Phone className="w-8 h-8 text-[#f9004d]" />,
                title: "Call Us",
                description: "Dial +8801928210545 for 24/7 support.",
              },
              {
                icon: <Mail className="w-8 h-8 text-[#f9004d]" />,
                title: "Email Us",
                description: "Send your queries to abulalajobayar@gmail.com.",
              },
              {
                icon: <MessageCircle className="w-8 h-8 text-[#f9004d]" />,
                title: "Live Chat",
                description: "Chat with us instantly for quick assistance.",
              },
              {
                icon: <MapPin className="w-8 h-8 text-[#f9004d]" />,
                title: "Visit Us",
                description: "Find our nearest customer care centers.",
              },
            ].map((method, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full text-center p-6 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center">{method.icon}</div>
                    <CardTitle className="mt-4">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{method.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Office Locations Section */}
        <motion.section
          className="container mx-auto px-4 mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl font-bold text-gray-900 text-center mb-8"
            variants={itemVariants}
          >
            Our Offices
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                location: "Dhaka Mohakhali",
                address: "gazi Tower, Ground Floor, 7 VIP Road, Mohakhali, Dhaka - 1206",
              },
              {
                location: "Chittagong Agrabad",
                address: "Gazi Center, 2470/A, Chowmuhani, Ground Floor, SK Mujib Road, Chittagong-4100",
              },
              {
                location: "Sylhet",
                address: "Gazi Tower, 1st Floor, 23 ABAS, Jail Road, Sylhet-3100",
              },
            ].map((office, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-left p-6 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{office.location}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{office.address}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call-to-Action Section */}
        <motion.section
          className="container mx-auto px-4 mt-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            Have More Questions?
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 mb-8"
            variants={itemVariants}
          >
            We’re always here to help. Reach out to us anytime!
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button className="bg-[#f9004d] hover:bg-[#d0003f] text-white">
              Contact Support
            </Button>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default ContactUs;