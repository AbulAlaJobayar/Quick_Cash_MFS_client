/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { redirect, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import resetPassword from "@/service/action/resetPassword";
import QKSFrom from "@/components/shared/Form/QKSForm";
import QKSInput from "@/components/shared/Form/QKSInput";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

// Define validation schema
const resetPasswordSchema = z
  .object({
    newPin: z.string().min(4, "PIN must be at least 4 characters"),
    confirmPin: z.string(),
  })
  .refine((data) => data.newPin === data.confirmPin, {
    message: "PINs don't match",
    path: ["confirmPin"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const onSubmit = async (data: ResetPasswordFormValues) => {
    // 1. Validate required fields early
    if (!token || !id) {
      toast.error("Invalid reset link. Please request a new one.");
      redirect("/forgot-password");
      return; // Exit to avoid further execution
    }

    try {
      const payload = {
        token,
        id,
        newPin: data.newPin,
      };

      // 2. API call
      const res = await resetPassword(payload);
      console.log("API Response:", res);

      // 3. Handle response
      if (res.success) {
        toast.success(res.message || "Password reset successfully");
        setTimeout(() => redirect("/login"), 1000); // Let toast display before redirect
      } else {
        const errorMessage =
          res.message === "jwt expired"
            ? "Reset link expired. Please request a new one."
            : res.message || "Failed to reset password";

        toast.error(errorMessage);

        // Optionally redirect if JWT expired
        if (res.message === "jwt Expired") {
          setTimeout(() => redirect("/forgatPassword"), 1500);
        }
      }
    } catch (error) {
      // 4. Handle unexpected errors (network, server crashes, etc.)
      console.error("Reset password error:", error);

      const errorMessage =
        (error as any)?.response?.data?.message || // Axios-style error
        (error instanceof Error
          ? error.message // Standard Error
          : "Failed to reset password. Please try again.");

      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Reset Your Password
        </h1>

        <QKSFrom
          onSubmit={onSubmit}
          resolver={zodResolver(resetPasswordSchema)}
        >
          <QKSInput
            name="newPin"
            type="password"
            label="New PIN"
            placeholder="Enter new PIN"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />

          <QKSInput
            name="confirmPin"
            type="password"
            label="Confirm PIN"
            placeholder="Confirm new PIN"
          />
          <Button
            type="submit"
            className="mt-4 w-full bg-gradient-to-r from-pink-800 to-pink-500 cursor-pointer"
          >
            Change Password
          </Button>
        </QKSFrom>
      </div>
    </div>
  );
};

const ResetPasswordContent = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading reset form...
        </div>
      }
    >
      <ResetPassword />
    </Suspense>
  );
};
export default ResetPasswordContent;
