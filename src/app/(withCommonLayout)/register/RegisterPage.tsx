"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CiMobile2, CiLock, CiUser } from "react-icons/ci";
import { BiShow, BiHide } from "react-icons/bi";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import Image from "next/image";
import registerImage from "@/assets/register.png"; // Replace with your image
import { useState } from "react";
import QKSFrom from "@/components/shared/Form/QKSForm";
import QKSInput from "@/components/shared/Form/QKSInput";
import parsePhoneNumberFromString from "libphonenumber-js";
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineDocument } from "react-icons/hi2";

// Zod schema for registration form validation
const mobileNumber = z.string().refine(
  (value) => {
    const mobile = parsePhoneNumberFromString(value);
    return mobile?.isValid() || false;
  },
  {
    message:
      "Invalid phone number. Please enter a valid phone number with country code.",
  }
);

const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  pin: z.string().min(4, { message: "PIN must be at least 4 digits long" }),
  mobileNumber: mobileNumber,
  email: z.string().email({ message: "Invalid email format" }),
  nid: z
    .string()
    .min(10, { message: "NID must be at least 10 characters long" }),
});

export default function RegisterPage() {
  const [showPin, setShowPin] = useState(false);
  const [isChecked, setIsChecked] = useState(false);



  const onSubmit = (data) => {
    console.log("Registration Data:", data);
    // Handle registration logic here (e.g., API call)
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl bg-white dark:bg-black overflow-hidden flex flex-col md:flex-row"
      >
        {/* Form Section (1/2 width on desktop, full width on mobile) */}
        <div className="w-full md:w-1/2 p-8">
          <motion.div className="bg-gradient-to-r from-pink-900 to-pink-400 rounded-lg shadow-xl p-[2px]">
            <div className="bg-white dark:bg-black rounded-md p-8 shadow-xl">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-[#333333] dark:text-white">
                 Sign Up
                </h1>
              </div>
              <QKSFrom resolver={zodResolver(registerSchema)} onSubmit={onSubmit}>
                {/* Name Field */}
                <QKSInput
                  type="text"
                  required
                  label="Name"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full my-4 border-pink-900 drop-shadow-xs shadow-pink-700"
                  icon={<CiUser />}
                />

                {/* Mobile Number Field */}
                <QKSInput
                  type="text"
                  required
                  label="Mobile"
                  name="mobileNumber"
                  placeholder="+8801234567891"
                  className="w-full my-4 border-pink-900 drop-shadow-xs shadow-pink-700"
                  icon={<CiMobile2 />}
                />

                {/* Email Field */}
                <QKSInput
                  type="email"
                  required
                  label="Email"
                  name="email"
                  icon={<MdOutlineEmail />}
                  placeholder="example@example.com"
                  className="w-full my-4 border-pink-900 drop-shadow-xs shadow-pink-700"
                />

                {/* NID Field */}
                <QKSInput
                  type="text"
                  required
                  label="NID"
                  name="nid"
                  icon={<HiOutlineDocument />}
                  placeholder="Enter your NID number"
                  className="w-full my-4 border-pink-900 drop-shadow-xs shadow-pink-700"
                />

                {/* PIN Field */}
                <div className="relative">
                  <QKSInput
                    type={showPin ? "text" : "password"}
                    required
                    label="PIN"
                    name="pin"
                    placeholder="Enter your PIN"
                    className="w-full my-4 border-pink-900 drop-shadow-xs shadow-pink-700"
                    icon={<CiLock />}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPin ? <BiHide /> : <BiShow />}
                  </button>
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="md:flex justify-between items-center my-4">
                  <div className="flex items-center space-x-2 my-2 md:my-0">
                    <Checkbox
                      id="terms"
                      checked={isChecked}
                      onCheckedChange={() => setIsChecked(!isChecked)}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept terms and conditions
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 50 }}
                >
                  <Button
                    type="submit"
                    disabled={!isChecked}
                    className="w-full my-4 cursor-pointer bg-gradient-to-tr from-pink-900 to-pink-600 text-white"
                  >
                    Register
                  </Button>
                </motion.div>
              </QKSFrom>

              {/* Login Link */}
              <p className="text-md text-end mb-5">
                Already have an account?{" "}
                <span className="text-blue-800 underline hover:text-blue-900">
                  <Link href="/login">Login</Link>
                </span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Image Section (1/2 width on desktop, hidden on mobile) */}
        <div className="hidden md:block w-full md:w-1/2 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-full w-full flex items-center justify-center"
          >
            <Image
              alt="register image"
              src={registerImage}
              
              height={600}
              className="object-cover rounded-lg"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}