/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import QKSFrom from "@/components/shared/Form/QKSForm";
import QKSInput from "@/components/shared/Form/QKSInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  mobileNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  nid: z.string().min(10, {
    message: "NID must be at least 10 characters.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  name: string;
  email: string;
  mobileNumber: string;
  nid: string;
  updateUser: any;
  refetch:any
}

const ProfileForm = ({
  name,
  email,
  mobileNumber,
  nid,
  updateUser,
  refetch
}: ProfileFormProps) => {
  const defaultValues = {
    name,
    email,
    mobileNumber,
    nid,
  };

  const handleSubmit = async (data: ProfileFormValues) => {
    try {
      const res = await updateUser(data);
      console.log(res)
      if (res.data.success) {
        toast.success("User Updated successfully", {
          description: res.message,
          duration: 5000,
        })
        refetch()
      }else {
        toast.error("error", {
          description: res.message,
          duration: 5000,
        });
      }
    } catch (error: any) {
      toast.error("error", {
        description: error.message,
        duration: 5000,
      });
    }
  };

  return (
    <>
      <QKSFrom
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        resolver={zodResolver(profileFormSchema)}
        
      >
        <QKSInput
          type="text"
          label="Full Name"
          name="name"
          placeholder="Your name"
    
          // icon={<CiMobile2 />}
        />
        <QKSInput
          type="email"
          label="Email"
          name="email"
          placeholder="Your email"
         
        />
        <QKSInput
          type="tel"
          label="Mobile Number"
          name="mobileNumber"
          placeholder="Your phone number"
          
        />
        <QKSInput
          type="number"
          label="National ID (NID)"
          name="nid"
          placeholder="Your NID number"
        />
        <Button type="submit" className="w-full md:w-auto mt-4 cursor-pointer">
          Update Profile
        </Button>
      </QKSFrom>
    </>
  );
};
export default ProfileForm;
