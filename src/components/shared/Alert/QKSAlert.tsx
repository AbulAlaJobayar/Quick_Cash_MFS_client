import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

import React from "react";
type QKSAlert = {
  title: string;
  description: string;
  varient?: "default" | "destructive" | null;
};
const QKSAlert = ({ varient, title, description }: QKSAlert) => {
  return (
    <Alert variant={varient}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default QKSAlert;
