/* eslint-disable @next/next/no-img-element */
"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useSingleTransactionQuery } from "@/redux/api/transactionApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoadingCard from "@/components/shared/LoadingCard";
import { format } from "date-fns";
import {
  AlertTriangle,
  ChevronLeft,
  Download,
  Flag,
  Loader2,
  Send,
  Share2,
  Upload,
} from "lucide-react";
import TransactionPDF from "../TransactionPdf";
import { useState } from "react";
import { toast } from "sonner";

export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const TransactionDetailsPage = ({ id }: { id: string }) => {
  const { data, isLoading } = useSingleTransactionQuery({ id });
  const [isReporting, setIsReporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  if (isLoading) {
    return <LoadingCard />;
  }

  if (!data?.data) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold">Transaction Not Found</h2>
        <p className="text-muted-foreground mt-2">
          The requested transaction could not be found.
        </p>
      </div>
    );
  }

  // Format amounts
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 2,
  }).format(data?.data?.amount || 0);

  const formattedFee = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 2,
  }).format(data?.data?.fee || 0);

  // PDF generation
  const pdfFileName = `QKS_${data?.data?.type}_${
    data?.data?.senderId?.name.replace(/\s+/g, "_") || "Unknown"
  }_${data?.data?.transactionId || "Unknown"}.pdf`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    `https://qks.com/verify/${data?.data?.transactionId}`
  )}&margin=10&format=png&color=ec4899`;

  // Get transaction icon based on type
  const getTransactionIcon = () => {
    switch (data?.data?.type) {
      case "cashIn":
        return <Download className="h-6 w-6 text-green-500" />;
      case "cashOut":
        return <Upload className="h-6 w-6 text-blue-500" />;
      case "transfer":
        return <Send className="h-6 w-6 text-purple-500" />;
      default:
        return <ChevronLeft className="h-6 w-6 text-gray-500" />;
    }
  };

  // Share transaction function
  const handleShareTransaction = async () => {
    setIsSharing(true);
    try {
      const shareData = {
        title: `Transaction ${data?.data?.transactionId}`,
        text: `Check out this transaction: ${data?.data?.senderId?.name} sent ${formattedAmount} to ${data?.data?.recipientId?.name}`,
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        toast("Link copied to clipboard",{
        
          description: "You can now share the transaction link",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast("Error",{

        description: "Failed to share transaction",
      
      });
    } finally {
      setIsSharing(false);
    }
  };

  // Report issue function
  const handleReportIssue = async () => {
    setIsReporting(true);
    try {
      // In a real app, you would call an API endpoint here
      // For now, we'll simulate a successful report
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast("Issue reported successfully",{
      
        description: "Our team will review your report shortly",
      });
    } catch (error) {
      console.error("Error reporting issue:", error);
      toast("Error",{
       
        description: "Failed to report issue",
        
      });
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-6">
        {/* Header with back button and title */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.history.back()}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            Transaction Details
          </h1>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Transaction summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transaction card */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Transaction Summary</CardTitle>
                  <Badge
                    variant={
                      data?.data?.type === "cashIn"
                        ? "default"
                        : data?.data?.type === "cashOut"
                        ? "secondary"
                        : "outline"
                    }
                    className={`text-sm ${
                      data?.data?.type === "cashIn"
                        ? "bg-green-500 hover:bg-green-600"
                        : ""
                    }`}
                  >
                    {capitalize(data?.data?.type)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-muted">
                      {getTransactionIcon()}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Transaction ID
                      </p>
                      <p className="font-medium">
                        {data?.data?.transactionId || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {data?.data?.createdAt
                        ? format(new Date(data?.data?.createdAt), "PPPp")
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Sender</p>
                    <p className="font-medium">
                      {data?.data?.senderId?.name || "N/A"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {data?.data?.senderId?.mobileNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Recipient</p>
                    <p className="font-medium">
                      {data?.data?.recipientId?.name || "N/A"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {data?.data?.recipientId?.mobileNumber || "N/A"}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="text-xl font-bold">{formattedAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fee</p>
                    <p className="text-lg font-semibold">{formattedFee}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={"secondary"} className="text-sm">
                      {capitalize("Approved")}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification details card */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Notification Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">User Name</p>
                    <p className="font-medium">
                      {data?.data?.senderId?.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">User Email</p>
                    <p className="font-medium">
                      {data?.data?.senderId?.email || "N/A"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Message</p>
                  <p className="font-medium">
                    Your transaction of {formattedAmount} was successful
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Actions and QR code */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <PDFDownloadLink
                  document={
                    <TransactionPDF
                      data={data.data}
                      company={{
                        name: "QKash Mobile Banking",
                        address: "121/2 Gazi Tower",
                        city: "Khulna",
                        country: "Bangladesh",
                        phone: "+8801928210545 (WhatsApp)",
                        email: "abulalajobayar@gmail.com",
                        website: "portfolio-rose-theta-63.vercel.app",
                      }}
                      qrCodeUrl={qrCodeUrl}
                    />
                  }
                  fileName={pdfFileName}
                >
                  {({ loading }) => (
                    <Button
                      disabled={loading}
                      className="w-full"
                      variant="outline"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download Receipt
                        </>
                      )}
                    </Button>
                  )}
                </PDFDownloadLink>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleShareTransaction}
                  disabled={isSharing}
                >
                  {isSharing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Share2 className="mr-2 h-4 w-4" />
                  )}
                  Share Transaction
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleReportIssue}
                  disabled={isReporting}
                >
                  {isReporting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Flag className="mr-2 h-4 w-4" />
                  )}
                  Report Issue
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Verification QR Code</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="p-4 bg-white rounded-lg border">
                  <img
                    src={qrCodeUrl}
                    alt="Transaction verification QR code"
                    className="w-48 h-48"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Scan this QR code to verify the transaction
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsPage;