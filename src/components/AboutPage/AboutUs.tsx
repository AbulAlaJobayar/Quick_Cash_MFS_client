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
import {
  RocketIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
// import { RocketIcon, ShieldCheckIcon, UsersIcon, SmartphoneIcon } from "@radix-ui/react-icons";

const AboutUs = () => {
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
        className="relative  text-center bg-pink-700 text-white py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Content */}
        <motion.h1 className="text-5xl font-bold mb-4" variants={itemVariants}>
          About QKash
        </motion.h1>
        <motion.p className="text-xl mb-8" variants={itemVariants}>
          Empowering Financial Freedom, One Transaction at a Time
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button className="bg-white text-pink-700 hover:bg-gray-200">
           <Link href={'/register'}>Get Started</Link> 
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
        {/* Our Story Section */}
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
            Our Story
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 text-center max-w-2xl mx-auto"
            variants={itemVariants}
          >
            QKash was born out of a vision to bridge the gap between traditional
            banking and the digital future. Launched in 2025, we have quickly
            grown to become one of the most trusted names in digital financial
            services.
          </motion.p>
        </motion.section>

        {/* Features Section */}
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
            Why Choose QKash?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <RocketIcon className="w-8 h-8 text-[#f9004d]" />,
                title: "Fast & Reliable",
                description: "Instant transactions with 99.9% uptime.",
              },
              {
                icon: <ShieldCheckIcon className="w-8 h-8 text-[#f9004d]" />,
                title: "Secure",
                description: "Your data is protected with advanced encryption.",
              },
              {
                icon: <UsersIcon className="w-8 h-8 text-[#f9004d]" />,
                title: "Accessible",
                description: "Available to everyone, everywhere.",
              },
              {
                icon: <SmartphoneIcon className="w-8 h-8 text-[#f9004d]" />,
                title: "User-Friendly",
                description: "Simple and intuitive interface.",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full text-center p-6 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center">{feature.icon}</div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Achievements Section */}
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
            Our Achievements
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 text-center max-w-2xl mx-auto"
            variants={itemVariants}
          >
            In just a few short years, QKash has achieved remarkable milestones
            that reflect our commitment to excellence and innovation.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              { value: "9.5M+", label: "Happy Customers" },
              { value: "3L+", label: "Agent Network" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center p-6">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-[#f9004d]">
                      {stat.value}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      {stat.label}
                    </CardDescription>
                  </CardHeader>
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
            Join the QKash Movement
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 mb-8"
            variants={itemVariants}
          >
            Together, let’s embrace the future of finance and unlock new
            possibilities for growth and prosperity.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button className="bg-[#f9004d] hover:bg-[#d0003f] text-white">
              Download the App
            </Button>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutUs;
