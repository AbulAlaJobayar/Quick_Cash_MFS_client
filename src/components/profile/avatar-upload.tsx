
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CloudUpload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import imageUploader from "@/helper/axios/imageUploader";

interface AvatarUploadProps {
  initialImage?: string;
  onUploadSuccess?: (url: string) => void;
  updateUser: any;
}

export function AvatarUpload({
  initialImage,
  onUploadSuccess,
  updateUser,
}: AvatarUploadProps) {
  const [image, setImage] = useState(initialImage);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);

      // Prepare form data for Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "quickCash"); // Replace with your upload preset

      // Upload to Cloudinary
      const result = await imageUploader(formData);
      console.log(result);
      if ("secure_url" in result) {
        const payload = {
          img: result.secure_url,
        };

       await updateUser(payload);
        setImage(result.secure_url);

        if (onUploadSuccess) {
          onUploadSuccess(result.secure_url);
        }
        toast.success("Avatar uploaded successfully");
      } else {
        throw new Error(result.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload avatar");
      setImage(initialImage); // Revert to initial image
    } finally {
      setIsUploading(false);
      // Reset input to allow selecting the same file again
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-24 w-24 border-2 border-gray-200 dark:border-gray-700">
        <AvatarImage src={image} alt="Profile picture" />
        <AvatarFallback className="bg-gray-100 dark:bg-gray-800">
          {isUploading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <span className="text-lg">👤</span>
          )}
        </AvatarFallback>
      </Avatar>

      <div className="relative">
        <Button
          asChild
          variant="outline"
          disabled={isUploading}
          className="gap-2"
        >
          <label htmlFor="avatar-upload">
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CloudUpload className="h-4 w-4" />
            )}
            {isUploading ? "Uploading..." : "Change Avatar"}
          </label>
        </Button>
        <Input
          id="avatar-upload"
          ref={inputRef}
          type="file"
          accept="image/*"
          className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
          onChange={handleImageChange}
          disabled={isUploading}
        />
      </div>
    </div>
  );
}
