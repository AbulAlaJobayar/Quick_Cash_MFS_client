"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNotificationDetailsQuery } from "@/redux/api/notification";
import { Button } from "@/components/ui/button";
import NotificationPdf from "@/components/NotificationPdf";
import LoadingCard from "@/components/shared/LoadingCard";

const NotificationDetailsPage = ({ id }: { id: string }) => {
  const { data, isLoading } = useNotificationDetailsQuery({ id });

  if (isLoading) {
    return <LoadingCard />;
  }

  if (!data?.data) {
    return <p>No data available.</p>;
  }

  const { notification, transaction } = data.data;

  const userName = notification?.userId?.name?.replace(/\s+/g, "_") || "Unknown";
  const transactionId = notification?.transactionId || "Unknown";
  const transactionType = transaction?.type || "Unknown";

  const pdfFileName = `QKS_${transactionType}_${userName}_${transactionId}.pdf`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    `https://qks.com/verify/${transactionId}`
  )}&margin=10&format=png&color=ec4899`;

  return (
    <div>
      <div className="mb-4">
        <PDFDownloadLink
          document={
            <NotificationPdf
              data={data.data}
              company={{
                name: "QKash Mobile Banking.",
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
            <Button disabled={loading} className="cursor-pointer">
              {loading ? "Generating PDF..." : "Download PDF"}
            </Button>
          )}
        </PDFDownloadLink>
      </div>

      <Table className="border rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Field</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">User Name</TableCell>
            <TableCell>{notification?.userId?.name || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">User Email</TableCell>
            <TableCell>{notification?.userId?.email || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Transaction ID</TableCell>
            <TableCell>{transactionId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Message</TableCell>
            <TableCell>{notification?.message || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Transaction Amount</TableCell>
            <TableCell>{transaction?.amount?.toFixed(2) || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Transaction Type</TableCell>
            <TableCell>{transactionType}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default NotificationDetailsPage;
