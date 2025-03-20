"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
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


const NotificationDetailsPage = ({ id }: { id: string }) => {
  const { data, isLoading } = useNotificationDetailsQuery({ id });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="mb-4">
        <PDFDownloadLink
          document={<NotificationPdf data={data.data} />}
          fileName="notification-details.pdf"
        >
          {({ loading }) => (
            <Button disabled={loading}>
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
            <TableCell>{data?.data?.notification?.userId?.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">User Email</TableCell>
            <TableCell>{data?.data?.notification?.userId?.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Transaction ID</TableCell>
            <TableCell>{data?.data?.notification?.transactionId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Message</TableCell>
            <TableCell>{data?.data?.notification?.message}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Transaction Amount</TableCell>
            <TableCell>{data?.data?.transaction?.amount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Transaction Type</TableCell>
            <TableCell>{data?.data?.transaction?.type}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default NotificationDetailsPage;