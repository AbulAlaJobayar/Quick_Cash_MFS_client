"use client";
import { z } from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import QKSFrom from "./shared/Form/QKSForm";
import QKSInput from "./shared/Form/QKSInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiMobile2, CiLock } from "react-icons/ci";
import { Button } from "./ui/button";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Checkbox } from "@/components/ui/checkbox";
import { BiHide, BiShow } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import loginImage from "@/assets/login.png";
import { RiLoginCircleFill } from "react-icons/ri";

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

const formSchema = z.object({
  mobile: mobileNumber,
  pin: z.string().min(5, "pin must be at least 5 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [showPin, setShowPin] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (data: FormValues) => {
    console.log("Form data submitted:", data);
    // Add your login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl bg-white dark:bg-black   overflow-hidden flex flex-col md:flex-row"
      >
        {/* Form Section */}

        <div className="w-full md:w-1/2 p-8">
          <motion.div className=" bg-gradient-to-r from-pink-900 to-pink-400 rounded-lg shadow-xl p-[2px]">
            <div className="bg-white dark:bg-black rounded-md p-8 shadow-xl">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-[#333333] dark:text-white">
                  Login
                </h1>
              </div>
              <QKSFrom
                resolver={zodResolver(formSchema)}
                onSubmit={handleSubmit}
              >
                <QKSInput
                  type="text"
                  required
                  label="Mobile"
                  name="mobile"
                  placeholder="+8801234567891"
                  className="w-full my-4  border-pink-900 drop-shadow-xs shadow-pink-700"
                  icon={<CiMobile2 />}
                />
                <div className="relative">
                  <QKSInput
                    type={showPin ? "text" : "password"}
                    required
                    label="PIN"
                    name="pin"
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
                  <Link href="#">
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 50,
                      }}
                      className="text-sm text-blue-800 underline hover:text-blue-900"
                    >
                      Forgot Password?
                    </motion.div>
                  </Link>
                </div>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 50 }}
                >
                  <Button
                    type="submit"
                    disabled={!isChecked}
                    className="w-full my-4 cursor-pointer  bg-gradient-to-tr from-pink-900 to-pink-600 text-white "
                  >
                    Submit
                  </Button>
                </motion.div>
              </QKSFrom>
              {/* register */}

              <p className=" text-md text-end  mb-5">
                Don&apos;t have an account yet ?{" "}
                <span className="text-blue-800 underline hover:text-blue-900">
                  <Link href="/register">Register</Link>
                </span>
                .
              </p>

              <motion.div
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 50 }}
                className=" w-[250px] mx-auto "
              >
                <Button
                  // type="text"
                  // onClick={showModal}

                  className="bg-gradient-to-tr from-pink-900 to-pink-600 text-white font-semibold  transition-all duration-200 w-[200px] mx-auto text-center cursor-pointer"
                >
                  {<RiLoginCircleFill className=" animate-pulse " />} Show Login
                  Credentials
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Image Section */}
        <div className="hidden md:block w-full md:w-1/2 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-full w-full flex items-center justify-center"
          >
            <Image
              alt="login image"
              src={loginImage}
              width={300}
              height={300}
              className="object-cover rounded-lg"
            />
          </motion.div>
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute inset-0 bg-gradient-to-r from-pink-900/10 to-pink-800/10"
          /> */}
        </div>
      </motion.div>
    </div>
  );
}
