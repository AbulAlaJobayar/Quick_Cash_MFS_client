/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import QKSFrom from "@/components/shared/Form/QKSForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import QKSInput from "@/components/shared/Form/QKSInput";
import { useCreateAgentMutation } from "@/redux/api/agentApi";
import { toast } from "sonner";

export const AgentSchema = z.object({
  storeName: z
    .string()
    .min(2, "Store name must be at least 2 characters")
    .max(50, "Store name cannot exceed 50 characters"),
  storeLocation: z
    .string()
    .min(2, "Store location must be at least 2 characters")
    .max(100, "Store location cannot exceed 100 characters"),
});

type formData = z.infer<typeof AgentSchema>;

type TProps = {
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function AgentModal({ setOpen }: TProps) {
  const [createAgent, { isLoading }] = useCreateAgentMutation();
  const handleSubmit = async (data: formData) => {
    try {
      const res = await createAgent(data).unwrap();
      if (res?.success) {
        toast.success("Agent created successfully", {
          description: res?.message,
        });
        setOpen(false);
      } else {
        toast.error("Failed to create agent");
      }
    } catch (error: any) {
      toast.error("Failed to create agent", {
        description: error?.data?.message || "Something went wrong",
      });
    }
  };
  return (
    <QKSFrom onSubmit={handleSubmit} resolver={zodResolver(AgentSchema)}>
      <QKSInput
        name="storeName"
        type="text"
        label="Store Name"
        placeholder="Enter store name"
        required={true}
      />
      <QKSInput
        name="storeLocation"
        type="text"
        label="Store Location"
        placeholder="Enter store location"
        required={true}
      />
      <Button type="submit" className=" mt-5 cursor-pointer" disabled={isLoading}>
        {isLoading ? "creating..." : "Create Agent"}
      </Button>
    </QKSFrom>
  );
}
