/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import parsePhoneNumberFromString from "libphonenumber-js";
import { Key } from "lucide-react";
import QKSFrom from "@/components/shared/Form/QKSForm";
import QKSInput from "@/components/shared/Form/QKSInput";
import { toast } from "sonner";

// Validation schema
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
  mobileNumber: mobileNumber,
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("OTP Sent", {
        description: "We've sent a 6-digit OTP to your Email",
      });

      // router.push(`/verify-otp?mobile=${data.mobileNumber}`);
    } catch (error:any) {
      toast.success("Error", {
        description: "Failed to send OTP. Please try again.",
      });
      console.log(error)
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-0 rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-pink-800 to-pink-500 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold">
                  Reset Password
                </CardTitle>
                <p className="text-blue-100 mt-1">
                  Enter your mobile number to receive OTP
                </p>
              </div>
              <Key className="h-8 w-8 opacity-90" />
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <QKSFrom
              onSubmit={onSubmit}
              defaultValues={{ mobileNumber: "" }}
              resolver={zodResolver(formSchema)}
            >
              <QKSInput
                type="text"
                name="mobileNumber"
                label="Mobile Number"
                placeholder="+8801XXXXXXXXX"
                required
              />
              <Button
                type="submit"
                className="w-full py-5 text-base font-medium mt-4  bg-gradient-to-r from-pink-800 to-pink-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <p className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </QKSFrom>
          </CardContent>

          <CardFooter className="bg-gray-50 dark:bg-gray-800 p-6 border-t">
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Remember your password?{" "}
              <Button
                variant="link"
                className="text-blue-600 dark:text-blue-400 p-0 h-auto"
                onClick={() => router.push("/login")}
              >
                Log in
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </motion.div>
    </div>
  );
}
