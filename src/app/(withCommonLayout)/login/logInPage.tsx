/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { z } from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CiMobile2, CiLock } from "react-icons/ci";
import { BiHide, BiShow } from "react-icons/bi";
import { RiLoginCircleFill } from "react-icons/ri";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import QKSForm from "@/components/shared/Form/QKSForm";
import QKSInput from "@/components/shared/Form/QKSInput";


// Services
import userLogin from "@/service/action/userLogin";
import { logOut, removedUser, storeUserInfo } from "@/service/action/authServices";
import { deleteCookies } from "@/service/action/deleteCookies";
import { decodedToken } from "@/utils/jwt";

// Constants & Assets
import { authKey } from "@/constant/authKey";
import loginImage from "@/assets/login.png";
import QKSModel from "@/components/shared/Model/QKSModel";
import CredentialModel from "./CradentialModel";

// Validation Schema
const mobileNumber = z.string().refine(
  (value) => {
    const mobile = parsePhoneNumberFromString(value);
    return mobile?.isValid() || false;
  },
  {
    message: "Invalid phone number. Please enter a valid phone number with country code.",
  }
);

const formSchema = z.object({
  mobileNumber: mobileNumber,
  pin: z.string().min(5, "PIN must be at least 5 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const LoginPage = () => {
  const [showPin, setShowPin] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCredentialModalOpen, setIsCredentialModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();

  const handleSubmit = async (data: FormValues) => {
    try {
      const res = await userLogin(data);

      if (res.data.isLoggedIn) {
        setToken(res.data.accessToken);
        setIsLogoutModalOpen(true);
      } else {
        storeUserInfo(res?.data?.accessToken);
        toast.success("Login successful", {
          description: res.message,
          duration: 5000,
        });
        router.push("/dashboard"); // Redirect to dashboard after successful login
      }
    } catch (error: any) {
      toast.error("Login failed", {
        description: error.message || "An error occurred during login",
        duration: 5000,
      });
    }
  };

  const handleLogoutConfirm = async () => {
    try {
      const { id } = decodedToken(token);
      const res = await logOut({ id });
      
      if (!res) {
        throw new Error("Logout failed");
      }

      await deleteCookies([authKey, "refreshToken"]);
      removedUser();
      setIsLogoutModalOpen(false);
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed", {
        description: "An error occurred during logout",
        duration: 5000,
      });
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
      >
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <div className="bg-gradient-to-r from-pink-700 to-pink-500 rounded-lg shadow-lg p-[2px]">
            <div className="bg-white dark:bg-gray-800 rounded-md p-6 md:p-8">
              <div className="mb-6 text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                  Welcome Back
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Sign in to your account
                </p>
              </div>

              <QKSForm
                resolver={zodResolver(formSchema)}
                onSubmit={handleSubmit}
              >
                <div className="space-y-4">
                  <QKSInput
                    type="text"
                    required
                    label="Mobile Number"
                    name="mobileNumber"
                    placeholder="+8801234567891"
                    className="w-full border-gray-300 dark:border-gray-600 focus:ring-pink-500 focus:border-pink-500"
                    icon={<CiMobile2 className="text-gray-500" />}
                  />

                  <div className="relative">
                    <QKSInput
                      type={showPin ? "text" : "password"}
                      required
                      label="PIN"
                      name="pin"
                      className="w-full border-gray-300 dark:border-gray-600 focus:ring-pink-500 focus:border-pink-500"
                      icon={<CiLock className="text-gray-500" />}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      aria-label={showPin ? "Hide PIN" : "Show PIN"}
                    >
                      {showPin ? <BiHide size={18} /> : <BiShow size={18} />}
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={isChecked}
                        onCheckedChange={() => setIsChecked(!isChecked)}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={!isChecked}
                    className="w-full mt-4 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white py-2 px-4 rounded-md transition-all duration-200"
                  >
                    Sign In
                  </Button>
                </div>
              </QKSForm>

              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() => setIsCredentialModalOpen(true)}
                  variant="outline"
                  className="flex items-center gap-2 border-pink-500 text-pink-600 hover:bg-pink-50 dark:hover:bg-gray-700"
                >
                  <RiLoginCircleFill className="animate-pulse" />
                  Show Login Credentials
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-pink-500 to-pink-700 items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <Image
              alt="Login illustration"
              src={loginImage}
              width={400}
              height={400}
              className="object-contain"
              priority
            />
            <div className="mt-6 text-center text-white">
              <h2 className="text-2xl font-bold">QuickKart System</h2>
              <p className="mt-2 opacity-80">
                Your one-stop solution for all your needs
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modals */}
      <QKSModel
        open={isCredentialModalOpen}
        setOpen={setIsCredentialModalOpen}
        title="Login Credentials"
      >
        <CredentialModel />
      </QKSModel>

      <QKSModel
        open={isLogoutModalOpen}
        setOpen={setIsLogoutModalOpen}
        title="Session Detected"
        titleClassName="text-red-600"
        onConfirm={handleLogoutConfirm}
        onConfirmText="Logout"
        onConfirmClassName="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600"
        onCancel={() => setIsLogoutModalOpen(false)}
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            You&apos;re already logged in on another device. To continue, please logout from the other session.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This will sign you out from all active sessions.
          </p>
        </div>
      </QKSModel>
    </div>
  );
};

export default LoginPage;