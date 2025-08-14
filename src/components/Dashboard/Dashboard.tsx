"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  // BarChart,
  // Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { motion } from "framer-motion";
import { useGetMeQuery } from "@/redux/api/authApi";
import {
  useMonthlyTransactionQuery,
  useMyTransactionQuery,
  useTodayTransactionQuery,
} from "@/redux/api/transactionApi";
import { getUserInfo } from "@/service/action/authServices";
// import LoadingCard from "../shared/LoadingCard";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, RefreshCw, Download } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

// Types
interface User {
  accountType: "admin" | "agent" | "user";
  mobileNumber: string;
  name: string;
  email?: string;
  _id: string;
  balance?: number;
  img?: string;
}

interface Transaction {
  admin?: User;
  amount: number;
  createdAt: string;
  fee: number;
  recipient: User;
  sender: User;
  transactionId: string;
  type: "cashIn" | "cashOut" | "transfer";
  status?: "completed" | "pending" | "failed";
  _id: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

const chartVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.2 } },
};

const Dashboard = () => {
  const router = useRouter();
  const user = getUserInfo();
  const { data: me, isLoading: userLoading, refetch: refetchUser } = useGetMeQuery(undefined);
  const { data: todayTransaction, isLoading: transactionLoading, refetch: refetchToday } = 
    useTodayTransactionQuery(undefined);
  const { data: recentCashouts, isLoading: myTransactionLoading, refetch: refetchTransactions } = 
    useMyTransactionQuery(undefined);
  const { data: monthly, isLoading: monthlyLoading, refetch: refetchMonthly } = 
    useMonthlyTransactionQuery(undefined);

  const handleRefresh = () => {
    refetchUser();
    refetchToday();
    refetchTransactions();
    refetchMonthly();
  };

  if (userLoading && transactionLoading && monthlyLoading && myTransactionLoading) {
    return <LoadingSkeleton />;
  }

  // Format currency
  const formatCurrency = (value: number | undefined) => {
    return value ? `৳ ${value.toFixed(2)}` : "৳ 0.00";
  };

  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, hh:mm a");
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed": return "bg-emerald-100 text-emerald-800";
      case "pending": return "bg-amber-100 text-amber-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const cards = [
    {
      title: "Current Balance",
      value: formatCurrency(me?.data?.balance),
      icon: "💳",
      trend: me?.data?.balance && me.data.balance > 0 ? "up" : "down",
      // action: () => router.push("/wallet"),
    },
    {
      title: user.accountType === "user" ? "Cash Out" : "Bonus",
      value: formatCurrency(
        user.accountType === "user" 
          ? todayTransaction?.data?.cashout 
          : me?.data?.bonus
      ),
      icon: user.accountType === "user" ? "📤" : "🎁",
      trend: "up",
    },
    {
      title: "Cash In",
      value: formatCurrency(todayTransaction?.data?.cashin),
      icon: "📥",
      trend: todayTransaction?.data?.cashin && todayTransaction.data.cashin > 0 ? "up" : "down",
    },
    {
      title: "Send Money",
      value: formatCurrency(todayTransaction?.data?.sendMoney),
      icon: "💸",
      trend: todayTransaction?.data?.sendMoney && todayTransaction.data.sendMoney > 0 ? "up" : "down",
      // action: () => router.push("/send-money"),
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <Button variant="outline" onClick={handleRefresh} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible"
        className="space-y-6"
      >
        {/* Top 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card 
                className="h-full hover:shadow-md transition-shadow cursor-pointer border border-gray-100 dark:border-gray-800"
               
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {card.title}
                  </CardTitle>
                  <span className="text-2xl">{card.icon}</span>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">{card.value}</p>
                    {card.trend === "up" ? (
                      <span className="text-emerald-500 text-sm flex items-center">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="text-red-500 text-sm flex items-center">
                        <ArrowUpRight className="h-4 w-4 rotate-180" />
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <p className="text-xs text-muted-foreground">
                    {card.trend === "up" ? "+12% from yesterday" : "-2% from yesterday"}
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom 2 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Chart */}
          <motion.div variants={chartVariants} className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Monthly Transactions</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthly?.data || []}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorFees" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#6b7280' }}
                      axisLine={false}
                    />
                    <YAxis 
                      tick={{ fill: '#6b7280' }}
                      axisLine={false}
                    />
                    <Tooltip 
                      formatter={(value) => [`৳ ${value}`, ""]}
                      contentStyle={{
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: 'none'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="totalAmount" 
                      stroke="#8884d8" 
                      fillOpacity={1} 
                      fill="url(#colorAmount)" 
                      name="Total Amount" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="totalFees" 
                      stroke="#82ca9d" 
                      fillOpacity={1} 
                      fill="url(#colorFees)" 
                      name="Total Fees" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div variants={cardVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Transactions</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => router.push("/dashboard/transaction")}
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[160px]">Transaction</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentCashouts?.data?.slice(0, 5).map((transaction: Transaction) => (
                      <TableRow 
                        key={transaction._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                        onClick={() => router.push(`/dashboard/transaction/${transaction._id}`)}
                      >
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {transaction.sender.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(transaction.createdAt)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          ৳ {transaction.amount.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status || "completed"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="space-y-6 p-4 md:p-6">
    <div className="flex justify-between items-center">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-9 w-24" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-32" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-3 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-36" />
          </CardHeader>
          <CardContent className="h-[300px]">
            <Skeleton className="h-full w-full" />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-36" />
        </CardHeader>
        <CardContent>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 mb-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-3 w-[80px]" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Dashboard;