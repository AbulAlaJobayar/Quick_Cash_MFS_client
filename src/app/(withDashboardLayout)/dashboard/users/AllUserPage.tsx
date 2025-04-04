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
  User,
  Shield,
  UserCog,
  Wallet,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Trash2,
  UserCheck,
  UserX,
  Ban,
  CheckCircle2,
} from "lucide-react";

import LoadingCard from "@/components/shared/LoadingCard";
import { toast } from "sonner";
import Image from "next/image";
import { useAllUsersQuery, useDeleteAgentMutation } from "@/redux/api/userApi";

interface User {
  _id: string;
  name: string;
  mobileNumber: string;
  email: string;
  accountType: "user" | "agent" | "admin";
  nid: string;
  balance: number;
  bonus: number;
  img?: string;
  status: "blocked" | "approved";
  sessionId: string;
  createdAt: string;
}

const accountTypeOptions = [
  { value: "user", label: "User" },
  { value: "agent", label: "Agent" },
  { value: "admin", label: "Admin" },
];

const statusOptions = [
  { value: "approved", label: "Approved" },
  { value: "blocked", label: "Blocked" },
];

const UsersTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [accountTypeFilter, setAccountTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data, isLoading, isError, refetch } = useAllUsersQuery("");
  const [updateUserStatus] = useDeleteAgentMutation();

  const handleStatusUpdate = async (
    id: string,
    status: "blocked" | "approved"
  ) => {
    try {
      const res = await updateUserStatus({ id, status }).unwrap();
      if (res?.success) {
        toast.success(res?.message || "User status updated successfully");
      }
      else {
        toast.error(res?.message || "Failed to update user status");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update user status");
    }
  };

  const filteredData = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((user: User) => {
      // Account type filter
      const accountTypeFilterPassed =
        accountTypeFilter === "all" || user.accountType === accountTypeFilter;

      // Status filter
      const statusFilterPassed =
        statusFilter === "all" || user.status === statusFilter;

      return accountTypeFilterPassed && statusFilterPassed;
    });
  }, [data?.data, accountTypeFilter, statusFilter]);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "userInfo",
      header: "User Info",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center min-w-[200px]">
            {user.img ? (
              <Image
                src={user.img}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-gray-500" />
              </div>
            )}
            <div className="overflow-hidden">
              <p className="font-medium truncate">{user.name}</p>
              <p className="text-sm text-muted-foreground truncate">
                {user.mobileNumber} • {user.email}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "accountType",
      header: "Account Type",
      cell: ({ row }) => {
        const accountType = row.original.accountType;
        const iconMap = {
          user: <User className="h-4 w-4 mr-2 text-blue-500" />,
          agent: <Shield className="h-4 w-4 mr-2 text-green-500" />,
          admin: <UserCog className="h-4 w-4 mr-2 text-purple-500" />,
        };

        const variantMap: Record<
          "user" | "agent" | "admin",
          "secondary" | "default" | "outline"
        > = {
          user: "secondary",
          agent: "default",
          admin: "outline",
        };

        return (
          <Badge
            variant={variantMap[accountType]}
            className="flex items-center"
          >
            {iconMap[accountType]}
            {accountType.charAt(0).toUpperCase() + accountType.slice(1)}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "balance",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
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
        <div className="flex items-center">
          <Wallet className="h-4 w-4 mr-2 text-purple-500" />
          <span className="font-medium">
            {row.original.balance.toLocaleString("en-US", {
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
      accessorKey: "bonus",
      header: "Bonus",
      cell: ({ row }) => (
        <div className="font-medium">
          {row.original.bonus.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const iconMap = {
          approved: <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />,
          blocked: <Ban className="h-4 w-4 mr-1 text-red-500" />,
        };

        const variantMap: Record<
          "approved" | "blocked",
          "default" | "destructive"
        > = {
          approved: "default",
          blocked: "destructive",
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
      accessorKey: "createdAt",
      header: "Joined",
      cell: ({ row }) => (
        <div className="text-sm">
          {new Date(row.original.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {user.status === "approved" ? (
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                  onClick={() => handleStatusUpdate(user._id, "blocked")}
                >
                  <UserX className="mr-2 h-4 w-4" />
                  Block
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="text-green-600 focus:text-green-600 focus:bg-green-50"
                  onClick={() => handleStatusUpdate(user._id, "approved")}
                >
                  <UserCheck className="mr-2 h-4 w-4" />
                  Unblock
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
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
              Failed to fetch users. Please try again later.
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
        <h1 className="text-2xl font-bold">User Management</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-9 w-full sm:w-[200px] lg:w-[300px]"
              value={
                (table.getColumn("userInfo")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("userInfo")?.setFilterValue(event.target.value)
              }
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="pl-3">
                <Filter className="h-4 w-4 mr-2" />
                Account Type:{" "}
                {accountTypeFilter === "all"
                  ? "All"
                  : accountTypeOptions.find(
                      (s) => s.value === accountTypeFilter
                    )?.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setAccountTypeFilter("all")}>
                All
              </DropdownMenuItem>
              {accountTypeOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setAccountTypeFilter(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
                  No users found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {filteredData.length}{" "}
          user(s)
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

export default UsersTable;
