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

// Define validation schema
const requestBalanceSchema = z.object({
  amount: z.union([
    z.number()
      .min(1, "Amount must be at least $1")
      .max(10000, "Amount cannot exceed $10,000"),
    z.string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), "Must be a valid number")
  ]).transform(val => typeof val === 'string' ? Number(val) : val)
});

type RequestBalanceFormData = z.infer<typeof requestBalanceSchema>;

const RequestBalancePage = () => {
  const [createRequest, { isLoading }] = useCreateBalanceMutation();

  const onSubmit = async (data: RequestBalanceFormData) => {
    try {
      const res = await createRequest(data).unwrap();
      if (res) {
        toast.success("Balance request submitted successfully");
      }
    } catch (error: any) {
      toast.error(
        "An error occurred while submitting the balance request: " +
          error.message
      );
    }
  };

  return (
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
  );
};
export default RequestBalancePage;
