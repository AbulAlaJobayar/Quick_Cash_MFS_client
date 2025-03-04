"use client"; // Required for interactivity (Next.js 15)

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react"; // Import the Copy icon from Lucide React
import { toast } from "sonner";

type CredentialItem = {
  title: string;
  items: { label: string; value: string }[];
};

const credentials: CredentialItem[] = [
  {
    title: "Admin",
    items: [
      { label: "Mobile", value: "+8801928210545" },
      { label: "Pin", value: "12345" },
    ],
  },
  {
    title: "Agent",
    items: [
        { label: "Mobile", value: "+8801928210545" },
        { label: "Pin", value: "12345" },
    ],
  },
  {
    title: "User",
    items: [
        { label: "Mobile", value: "+8801928210545" },
        { label: "Pin", value: "12345" },
    ],
  },
];

const CredentialModel = () => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast(`${text} Copied to clipboard!`);
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      {credentials.map((credential, index) => (
        <Card
          key={index}
          className="border-pink-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <CardHeader>
            <CardTitle className="text-pink-600 text-lg">
              {credential.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {credential.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3">
                <p className=" text-sm text-gray-700 dark:text-white ">
                  <span className="font-medium">{item.label}:</span>{" "}
                  {item.value}
                </p>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-pink-600 hover:bg-pink-50 hover:text-black"
                  onClick={() => handleCopy(item.value)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default CredentialModel;
