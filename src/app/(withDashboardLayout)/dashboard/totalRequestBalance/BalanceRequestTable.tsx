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
// import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useEffect, useState } from "react";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import { useMyBalanceRequestQuery } from "@/redux/api/balanceRequest";
import LoadingCard from "@/components/shared/LoadingCard";

interface BalanceRequest {
  _id: string;
  agentId: { 
    name: string;
    mobileNumber: string;
  };
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  transactionId: string;
  createdAt: string;
  updatedAt?: string;
  adminId?: {
    name: string;
  };
}

const BalanceRequestTable = () => {
  const [isClient, setIsClient] = useState(false);
  const { data, isLoading } = useMyBalanceRequestQuery("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const columns: ColumnDef<BalanceRequest>[] = [
    {
      accessorKey: "agentId.name",
      header: "Agent Name",
      cell: ({ row }) => row.original.agentId.name
    },
    {
      accessorKey: "agentId.mobileNumber",
      header: "Agent Number",
      cell: ({ row }) => row.original.agentId.mobileNumber
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => `${row.original.amount.toFixed(2)}`
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const icon = {
          pending: <Clock className="h-4 w-4 mr-1" />,
          approved: <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />,
          rejected: <XCircle className="h-4 w-4 mr-1 text-red-500" />
        }[status];

        return (
          <Badge
            variant={
              status === "approved" 
                ? "default" 
                : status === "rejected" 
                ? "destructive" 
                : "secondary"
            }
            className="flex items-center"
          >
            {icon}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "transactionId",
      header: "Transaction ID",
      cell: ({ row }) => row.original.transactionId || "N/A"
    },
    {
      accessorKey: "adminId.name",
      header: "Processed By",
      cell: ({ row }) => row.original.adminId?.name || "Pending"
    },
    {
      accessorKey: "createdAt",
      header: "Request Date",
      cell: ({ row }) => {
        if (!isClient) return "Loading...";
        return new Date(row.original.createdAt).toLocaleDateString();
      }
    },
    {
      accessorKey: "processedAt",
      header: "Processed Date",
      cell: ({ row }) => {
        if (!isClient) return "Loading...";
        return row.original.updatedAt
 
          ? new Date(row.original.updatedAt).toLocaleDateString() 
          : "N/A";
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
        <h1 className="text-2xl font-bold">Balance Requests</h1>
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
                  No balance requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of{" "}
          {data?.data?.length || 0} requests
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

export default BalanceRequestTable;