
"use client";
import LoadingCard from "@/components/shared/LoadingCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNotificationDetailsQuery } from "@/redux/api/notification";
import { formatDate } from "@/utils/formateDate";
import { ArrowLeft, Check, Clock, User } from "lucide-react";
import Link from "next/link";

interface INotificationData {
  _id: string;
  createdAt: string;
  isRead: boolean;
  message: string;
  transactionId: string;
  amount?: number;
  fee?: number;
  updatedAt: string;
  userId: {
    accountType: string;
    balance: number;
    bonus: number;
    createdAt: string;
    email: string;
    img: string;
    mobileNumber: string;
    name: string;
    nid: string;
    pin: string;
    sessionId: string;
    status: string;
    updatedAt: string;
    _id: string;
  };
}

export default function NotificationDetailsPage({ id }: { id: string }) {
  const { data, isLoading } = useNotificationDetailsQuery({ id });

  if (isLoading) {
    return <LoadingCard />;
  }
  console.log(data.data, "data in notification details page");
  const notification: INotificationData = data?.data;

  if (!data?.data) {
    return <p>No data available.</p>;
  }

  function extractRecipientNumber(message: string): string {
    const pattern = /to\s*(?:Mobile:)?\s*(\+\d{11,15})/i;
    return message.match(pattern)?.[1] ?? "N/A";
  }
  // Extract transaction details from message
  const amount = notification?.amount?.toFixed(2) || "0.00";
  const recipient =extractRecipientNumber(notification?.message)
    
  const fee = notification?.fee?.toFixed(2) || "0.00";

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Button asChild variant="ghost" size="icon" className="rounded-full">
          <Link href="/notifications">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Notification Details
        </h1>
        {notification?.isRead ? (
          <Badge variant="outline" className="gap-1">
            <Check className="h-3 w-3" /> Read
          </Badge>
        ) : (
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" /> Unread
          </Badge>
        )}
      </div>

      <Card className="shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-pink-700 to-pink-500 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-white">
                <AvatarImage
                  src={notification?.userId?.img}
                  alt={notification?.userId?.name}
                />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {notification?.userId?.name}
                </h2>
                <p className="text-sm text-blue-100">
                  {notification?.userId?.email}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {notification?.userId?.accountType}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">
                Transaction ID
              </h3>
              <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                {notification?.transactionId}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
              <p>{formatDate(notification?.createdAt, "full")}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Transaction Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  Amount Sent
                </p>
                <p className="text-xl font-bold">{amount}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm text-green-600 dark:text-green-300">
                  Admin Fee
                </p>
                <p className="text-xl font-bold">{fee} Taka</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <p className="text-sm text-purple-600 dark:text-purple-300">
                  Recipient
                </p>
                <p className="text-lg font-medium">{recipient}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Full Message</h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="whitespace-pre-line">{notification?.message}</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" asChild>
              <Link href={'/dashboard/transaction'}>
                View Transaction
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/dashboard/profile`}>View User Profile</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
