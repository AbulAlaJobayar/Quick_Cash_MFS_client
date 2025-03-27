/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CiMobile2 } from "react-icons/ci";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { z } from "zod";
import QKSFrom from "@/components/shared/Form/QKSForm";
import QKSInput from "@/components/shared/Form/QKSInput";
import { Button } from "@/components/ui/button";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useState } from "react";
import { toast } from "sonner";
import QKSModel from "@/components/shared/Model/QKSModel";
import { useCashOutMutation } from "@/redux/api/transactionApi";


// Validation Schemas
const mobileNumber = z.string({
  required_error: "Must provide recipient Mobile number",
  invalid_type_error: "Mobile number must be a string"
}).refine(
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
  amount: z.coerce.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number"
  }).positive("Amount must be positive"),
});

const pinSchema = z.object({
  pin: z.string({
    required_error: "PIN is required",
    invalid_type_error: "PIN must be a string"
  }).min(4, "PIN must be 4 digits"),
});

type FormValues = z.infer<typeof formSchema>;
type PinValues = z.infer<typeof pinSchema>;

const CashOutPage = () => {
  const [cashOut] = useCashOutMutation();
  const [confirmationData, setConfirmationData] = useState<FormValues | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  const handleFormSubmit = (data: FormValues) => {
    setConfirmationData(data);
    setShowModal(true);
  };

  const handleCashOut = async (pinData: PinValues) => {
    if (!confirmationData) return;
  
    try {
      const payload = {
        mobileNumber: confirmationData.mobileNumber,
        amount: confirmationData.amount,
        pin: pinData.pin,
      };
  
      console.log("Sending payload:", payload); // Debug log
  
      const result = await cashOut(payload).unwrap();
      
      if (result.success) {
        toast.success("Cash out Successful", {
          description: `৳${confirmationData.amount} sent to ${confirmationData.mobileNumber}`,
        });
        setShowModal(false);
      } else {
        toast.warning("Cash out completed with warnings", {
          description: result.message || "Transaction completed with warnings",
        });
      }
    } catch (error: any) {
      console.error("Cash out error:", error); // Debug log
      
      // Handle Zod validation errors specifically
      if (error?.data?.err?.name === 'ZodError') {
        const errorMessages = error.data.errorSources.map((err: any) => 
          `${err.path}: ${err.message}`
        ).join('\n');
        
        toast.error("Validation Error", {
          description: errorMessages,
        });
      } else {
        toast.error("Cash out failed", {
          description: error.data?.message || "An error occurred during transaction",
        });
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="pb-10">
      <motion.section
        className=" text-center bg-pink-700 text-white py-5 rounded-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero content remains the same */}
        <motion.h1 className="text-2xl font-bold mb-2 pt-2">Cash Out</motion.h1>
        <motion.p className="text-lg mb-4">
          Empowering Financial Freedom, One Transaction at a Time
        </motion.p>
      </motion.section>

      <div className="container max-w-md mx-auto px-8 py-10 border rounded border-pink-500 mt-8 inset-shadow-sm shadow-pink-500">
        <QKSFrom onSubmit={handleFormSubmit} resolver={zodResolver(formSchema)}>
          <QKSInput
            type="text"
            name="mobileNumber"
            label="Agent Number"
            required
            placeholder="+8801234567891"
            className="w-full my-4 border-pink-900 drop-shadow-xs shadow-pink-700"
            icon={<CiMobile2 />}
          />

          <QKSInput
            type="number"
            name="amount"
            label="Amount"
            placeholder="৳ 12345"
            required
            className="w-full my-4 border-pink-900 drop-shadow-xs shadow-pink-700"
            icon={<FaBangladeshiTakaSign />}
          />

          <Button
            type="submit"
            className="w-full bg-pink-700 hover:bg-pink-800 mt-5"
          >
            Continue
          </Button>
        </QKSFrom>
      </div>

      <QKSModel
        open={showModal}
        setOpen={setShowModal}
        title="Confirm Cash Out"
        // onCancel={() => setShowModal(false)}
        onConfirmText="Confirm Cash Out"
        onConfirmClassName="bg-pink-700 hover:bg-pink-800"
        // onConfirmDisabled={isLoading}
      >
        {confirmationData && (
          <div className="space-y-4">
            <div>
              <p className="font-medium text-gray-700">Agent Number:</p>
              <p className="text-gray-900">{confirmationData.mobileNumber}</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">Amount:</p>
              <p className="text-gray-900">
                ৳{confirmationData.amount.toLocaleString()}
              </p>
            </div>

            <QKSFrom onSubmit={handleCashOut} resolver={zodResolver(pinSchema)}>
              <QKSInput
                type="password"
                name="pin"
                label="Enter Your PIN"
                required
                className="w-full border-pink-900"
                // disabled={isLoading}
                // autoComplete="off"
              />
              <Button
                type="submit"
                className="w-full bg-pink-700 hover:bg-pink-800 mt-5"
                // disabled={isLoading}
              >
                Cash Out
              </Button>
            </QKSFrom>
          </div>
        )}
      </QKSModel>
    </div>
  );
};

export default CashOutPage;
