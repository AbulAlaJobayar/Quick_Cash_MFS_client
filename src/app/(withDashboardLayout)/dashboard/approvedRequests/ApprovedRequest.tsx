/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Clock,
  CheckCircle2,
  XCircle,
  User,
  Shield,
  Wallet,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Download,
} from "lucide-react";
import {
  useApprovedRequestMutation,
  useTotalRequestQuery,
} from "@/redux/api/balanceRequest";
import LoadingCard from "@/components/shared/LoadingCard";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ApprovedRequest/DateRangePicker";
import { ExportToCSV } from "@/components/ApprovedRequest/ExportToCSV";
import { toast } from "sonner";

interface Agent {
  _id: string;
  name: string;
  mobileNumber: string;
  accountType: "user" | "agent" | "admin";
  status: "blocked" | "approved";
}

interface Admin {
  _id: string;
  name: string;
}

interface BalanceRequest {
  _id: string;
  agentId: Agent;
  amount: number;
  status: "pending" | "approved" | "rejected";
  transactionId: string;
  createdAt: string;
  processedAt?: string;
  adminId?: Admin;
  userId?: {
    _id: string;
    name: string;
    storeName: string;
    storeLocation: string;
  };
}

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

const BalanceRequestTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data, isLoading, isError, refetch } = useTotalRequestQuery("");
  const [updateRequestStatus] = useApprovedRequestMutation();

  const handleStatusUpdate = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    try {
      const res = await updateRequestStatus({ id, status }).unwrap();
      if (res?.success) {
        toast.success(
          res?.data?.message || "balance requested updated successfully"
        );
      }
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  const filteredData = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((request: any) => {
      // Date filter
      const requestDate = new Date(request.createdAt);
      const dateFilterPassed =
        !dateRange ||
        ((!dateRange.from || requestDate >= dateRange.from) &&
          (!dateRange.to || requestDate <= dateRange.to));

      // Status filter
      const statusFilterPassed =
        statusFilter === "all" || request.status === statusFilter;

      return dateFilterPassed && statusFilterPassed;
    });
  }, [data?.data, dateRange, statusFilter]);

  const columns: ColumnDef<BalanceRequest>[] = [
    {
      accessorKey: "requestFrom",
      header: "Request From",
      cell: ({ row }) => {
        const request = row.original;
        const isAgent = request.agentId?.accountType === "agent";
        const requesterName = isAgent
          ? request.agentId?.name
          : request.userId?.name;
        const contactInfo = isAgent
          ? request.agentId?.mobileNumber
          : `${request.userId?.storeName} (${request.userId?.storeLocation})`;

        return (
          <div className="flex items-center min-w-[200px]">
            {isAgent ? (
              <Shield className="h-4 w-4 mr-2 text-blue-500" />
            ) : (
              <User className="h-4 w-4 mr-2 text-green-500" />
            )}
            <div className="overflow-hidden">
              <p className="font-medium truncate">{requesterName}</p>
              <p className="text-sm text-muted-foreground truncate">
                {isAgent ? "Agent" : "User"} • {contactInfo}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Amount
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="ml-2 h-4 w-4" />
          ) : (
            <span className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <Wallet className="h-4 w-4 mr-2 text-purple-500" />
          <span className="font-medium">
            {row.original.amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const iconMap = {
          pending: <Clock className="h-4 w-4 mr-1" />,
          approved: <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />,
          rejected: <XCircle className="h-4 w-4 mr-1 text-red-500" />,
        };

        const variantMap: Record<
          "pending" | "approved" | "rejected",
          "secondary" | "default" | "destructive"
        > = {
          pending: "secondary",
          approved: "default",
          rejected: "destructive",
        };

        return (
          <Badge variant={variantMap[status]} className="flex items-center">
            {iconMap[status]}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "transactionId",
      header: "Transaction ID",
      cell: ({ row }) => (
        <div className="font-mono text-sm text-ellipsis overflow-hidden">
          {row.original.transactionId || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "adminId.name",
      header: "Processed By",
      cell: ({ row }) => (
        <div className="text-ellipsis overflow-hidden">
          {row.original.adminId?.name || "Pending"}
        </div>
      ),
    },
    {
      accessorKey: "dates",
      header: "Timeline",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div className="text-sm space-y-1 min-w-[180px]">
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2">Request:</span>
              <span>
                {format(new Date(request.createdAt), "MMM dd, yyyy HH:mm")}
              </span>
            </div>
            {request.processedAt && (
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">Processed:</span>
                <span>
                  {format(new Date(request.processedAt), "MMM dd, yyyy HH:mm")}
                </span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const request = row.original;

        if (request.status !== "pending") {
          return null;
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                className="text-green-600 focus:text-green-600 focus:bg-green-50"
                onClick={() => handleStatusUpdate(request._id, "approved")}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                onClick={() => handleStatusUpdate(request._id, "rejected")}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (isLoading) {
    return <LoadingCard />;
  }

  if (isError) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Error loading data</h2>
            <p className="text-muted-foreground">
              Failed to fetch balance requests. Please try again later.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => refetch()}
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Balance Requests</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              className="pl-9 w-full sm:w-[200px] lg:w-[300px]"
              value={
                (table.getColumn("requestFrom")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("requestFrom")
                  ?.setFilterValue(event.target.value)
              }
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="pl-3">
                <Filter className="h-4 w-4 mr-2" />
                Status:{" "}
                {statusFilter === "all"
                  ? "All"
                  : statusOptions.find((s) => s.value === statusFilter)?.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                All
              </DropdownMenuItem>
              {statusOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setStatusFilter(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            className="w-full sm:w-auto"
          />

          <ExportToCSV data={filteredData} filename="balance-requests">
            <Download className="h-4 w-4 mr-2" />
            Export
          </ExportToCSV>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
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
                  No balance requests found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {filteredData.length}{" "}
          request(s)
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
            {table.getPageCount() || 1}
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
