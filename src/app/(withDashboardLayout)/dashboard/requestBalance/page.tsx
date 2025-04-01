/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import QKSFrom from "@/components/shared/Form/QKSForm";
import QKSInput from "@/components/shared/Form/QKSInput";
import { useCreateBalanceMutation } from "@/redux/api/balanceRequest";
import { motion } from "framer-motion";
// Define validation schema
const requestBalanceSchema = z.object({
  amount: z
    .union([
      z
        .number()
        .min(1, "Amount must be at least $1")
        .max(10000, "Amount cannot exceed $10,000"),
      z
        .string()
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), "Must be a valid number"),
    ])
    .transform((val) => (typeof val === "string" ? Number(val) : val)),
});

type RequestBalanceFormData = z.infer<typeof requestBalanceSchema>;

const RequestBalancePage = () => {
  const [createRequest, { isLoading }] = useCreateBalanceMutation();

  const onSubmit = async (data: RequestBalanceFormData) => {
    try {
      const res = await createRequest(data).unwrap();
      console.log({res})
      if (res?.success) {
        toast.success(res?.data?.message);
      }
      else {
        toast.error("Failed to submit balance request: " + res?.message);
      }
    } catch (error: any) {
      toast.error(
        "An error occurred while submitting the balance request: " +
          error.message
      );
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
    <>
    <div>
       <motion.section
        className=" text-center bg-pink-700 text-white py-5 rounded-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero content remains the same */}
        <motion.h1 className="text-2xl font-bold mb-2 pt-2">Balance Request</motion.h1>
        <motion.p className="text-lg mb-4">
          Need to Cash your Agent Number? Request quickly to Admin.
        </motion.p>
      </motion.section>
    </div>
    <div className="container py-8">
     
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Request For Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <QKSFrom
              onSubmit={onSubmit}
              resolver={zodResolver(requestBalanceSchema)}
            >
              <QKSInput
                type="number"
                label="Amount"
                name="amount"
                placeholder="Enter amount"
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer mt-4"
              >
                {isLoading ? <>Processing...</> : "Submit Request"}
              </Button>
            </QKSFrom>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
};
export default RequestBalancePage;
