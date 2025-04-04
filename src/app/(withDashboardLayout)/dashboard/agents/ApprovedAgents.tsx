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
  Wallet,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Download,
  Users,
  Store,
  MapPin,
  Calendar,
  FileText,
  XCircle,
} from "lucide-react";
import LoadingCard from "@/components/shared/LoadingCard";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ApprovedRequest/DateRangePicker";
import { ExportToCSV } from "@/components/ApprovedRequest/ExportToCSV";
import { toast } from "sonner";
import { useAllAgentQuery, useApprovedAgentMutation } from "@/redux/api/agentApi";

interface Agent {
  _id: string;
  userId: {
    _id: string;
    name: string;
    mobileNumber: string;
    accountType: "user" | "agent" | "admin";
    email: string;
    nid: string;
    balance: number;
  };
  storeName: string;
  storeLocation: string;
  status: "in-progress" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

const statusOptions = [
  { value: "in-progress", label: "In Progress" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

const ApprovedAgentsPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data, isLoading, isError, refetch } = useAllAgentQuery("");
  const [updateRequestStatus] = useApprovedAgentMutation();
 console.log({data})
  const handleStatusUpdate = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    try {
      const res = await updateRequestStatus({ id, status }).unwrap();
      if (res?.success) {
        toast.success(res?.data?.message || `Agent ${status} successfully`);
        refetch();
      }else{
        toast.error(res?.message || "Failed to update agent status");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const filteredData = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((agent: Agent) => {
      // Date filter
      const agentDate = new Date(agent.createdAt);
      const dateFilterPassed =
        !dateRange ||
        ((!dateRange.from || agentDate >= dateRange.from) &&
          (!dateRange.to || agentDate <= dateRange.to));

      // Status filter
      const statusFilterPassed =
        statusFilter === "all" || agent.status === statusFilter;

      return dateFilterPassed && statusFilterPassed;
    });
  }, [data?.data, dateRange, statusFilter]);

  const columns: ColumnDef<Agent>[] = [
    {
      accessorKey: "userId.name",
      header: "Agent Information",
      cell: ({ row }) => {
        const agent = row.original;
        return (
          <div className="flex items-center min-w-[200px]">
            <Users className="h-4 w-4 mr-2 text-blue-500" />
            <div className="overflow-hidden">
              <p className="font-medium truncate">{agent.userId.name}</p>
              <p className="text-sm text-muted-foreground truncate">
                {agent.userId.mobileNumber}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "storeInfo",
      header: "Store Details",
      cell: ({ row }) => {
        const agent = row.original;
        return (
          <div className="flex items-center min-w-[200px]">
            <Store className="h-4 w-4 mr-2 text-green-500" />
            <div className="overflow-hidden">
              <p className="font-medium truncate">{agent.storeName}</p>
              <p className="text-sm text-muted-foreground truncate">
                <MapPin className="inline h-3 w-3 mr-1" />
                {agent.storeLocation}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "userId.balance",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          <Wallet className="h-4 w-4 mr-2 text-purple-500" />
          Balance
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
        <span className="font-medium">
          {row.original.userId.balance.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const iconMap = {
          "in-progress": <Clock className="h-4 w-4 mr-1 text-yellow-500" />,
          approved: <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />,
          rejected: <XCircle className="h-4 w-4 mr-1 text-red-500" />,
        };

        const variantMap = {
          "in-progress": "secondary",
          approved: "default",
          rejected: "destructive",
        } as const;

        return (
          <Badge variant={variantMap[status]} className="flex items-center">
            {iconMap[status]}
            {status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "createdAt",
      header: "Registration Date",
      cell: ({ row }) => (
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
        </div>
      ),
    },
    {
      accessorKey: "userId.nid",
      header: "NID",
      cell: ({ row }) => (
        <div className="flex items-center text-sm">
          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
          {row.original.userId.nid}
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const agent = row.original;

        if (agent.status !== "in-progress") {
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
                onClick={() => handleStatusUpdate(agent._id, "approved")}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                onClick={() => handleStatusUpdate(agent._id, "rejected")}
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
            <h2 className="text-xl font-semibold mb-2">Error loading agents</h2>
            <p className="text-muted-foreground">
              Failed to fetch agent data. Please try again later.
            </p>
            <Button variant="outline" className="mt-4" onClick={() => refetch()}>
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
        <h1 className="text-2xl font-bold">Agent Management</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              className="pl-9 w-full sm:w-[200px] lg:w-[300px]"
              value={
                (table.getColumn("userId.name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn("userId.name")
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

          <ExportToCSV
            data={filteredData}
            filename="agents"
          >
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
                  No agents found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {filteredData.length}{" "}
          agent(s)
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

export default ApprovedAgentsPage;