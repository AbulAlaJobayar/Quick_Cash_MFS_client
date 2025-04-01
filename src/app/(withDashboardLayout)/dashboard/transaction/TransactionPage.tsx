"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMyTransactionQuery } from "@/redux/api/transactionApi";
// import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useEffect, useState } from "react";
import LoadingCard from "@/components/shared/LoadingCard";

interface Transaction {
  admin: Admin;
  amount: number;
  createdAt: string;
  fee: number;
  recipient: Recipient;
  sender: Sender;
  transactionId: string;
  type: string;
  _id: string;
}

interface Admin {
  accountType: string;
  mobileNumber: string;
  name: string;
  _id: string;
}

interface Recipient {
  accountType: string;
  mobileNumber: string;
  name: string;
  _id: string;
}

interface Sender {
  accountType: string;
  mobileNumber: string;
  name: string;
  _id: string;
}

const TransactionPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { data, isLoading } = useMyTransactionQuery("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Define columns
  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "sender.name",
      header: "Sender Name",
      cell: ({ row }) => row.original.sender.name
    },
    {
      accessorKey: "sender.mobileNumber",
      header: "Sender Number",
      cell: ({ row }) => row.original.sender.mobileNumber
    },
    {
      accessorKey: "recipient.name",
      header: "Recipient Name",
      cell: ({ row }) => row.original.recipient.name
    },
    {
      accessorKey: "recipient.mobileNumber",
      header: "Recipient Number",
      cell: ({ row }) => row.original.recipient.mobileNumber
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => `${row.original.amount.toFixed(2)}`
    },
    {
      accessorKey: "fee",
      header: "Charge",
      cell: ({ row }) => `${row.original.fee.toFixed(2)}`
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.original.type;
        return (
          <Badge
            variant={
              type === "sendMoney"
                ? "default"
                : type === "cashOut"
                ? "secondary"
                : type === "cashIn"
                ? "outline"
                : "destructive"
            }
            className={
              type === "sendMoney"
                ? "bg-blue-500 hover:bg-blue-600"
                : type === "cashOut"
                ? "bg-green-500 hover:bg-green-600"
                : type === "cashIn"
                ? "bg-purple-500 hover:bg-purple-600"
                : "bg-gray-500 hover:bg-gray-600"
            }
          >
            {type}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        if (!isClient) return "Loading...";
        return new Date(row.original.createdAt).toLocaleDateString();
      }
    },
  ];

  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (isLoading) {
    return <LoadingCard/>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
      </div>

      <div className="rounded-md border mb-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of{" "}
          {data?.data?.length || 0} transactions
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span className="text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;