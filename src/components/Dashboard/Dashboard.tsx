"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useGetMeQuery } from "@/redux/api/authApi";
import {
  useMonthlyTransactionQuery,
  useMyTransactionQuery,
  useTodayTransactionQuery,
} from "@/redux/api/transactionApi";
import { getUserInfo } from "@/service/action/authServices";
import LoadingCard from "../shared/LoadingCard";
import { format } from "date-fns";

// Types
interface User {
  accountType: "admin" | "agent" | "user";
  mobileNumber: string;
  name: string;
  email?: string;
  _id: string;
  balance?: number;
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
  _id: string;
}


// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  const user = getUserInfo();
  const { data: me, isLoading: userLoading } = useGetMeQuery(undefined);
  const { data: todayTransaction, isLoading: transactionLoading } = 
    useTodayTransactionQuery(undefined);
  const { data: recentCashouts, isLoading: myTransactionLoading } = 
    useMyTransactionQuery(undefined);
  const { data: monthly, isLoading: monthlyLoading } = 
    useMonthlyTransactionQuery(undefined);

  if (userLoading || transactionLoading || monthlyLoading || myTransactionLoading) {
    return <LoadingCard />;
  }

  // Format currency
  const formatCurrency = (value: number | undefined) => {
    return value ? `৳ ${value.toFixed(2)}` : "৳ 0.00";
  };

  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy hh:mm a");
  };

  const cards = [
    {
      title: "Current Balance",
      value: formatCurrency(me?.data?.balance),
    },
    {
      title: user.role === "user" ? "Cash Out" : "Fee",
      value: formatCurrency(
        user.role === "user" 
          ? todayTransaction?.data?.cashout 
          : todayTransaction?.data?.fee
      ),
    },
    {
      title: "Cash In",
      value: formatCurrency(todayTransaction?.data?.cashin),
    },
    {
      title: "Send Money",
      value: formatCurrency(todayTransaction?.data?.sendMoney),
    },
  ];

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
      className="space-y-6"
    >
      {/* Top 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{card.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bottom 2 cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Transactions</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthly?.data || []}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`৳ ${value}`, ""]}
                  />
                  <Legend />
                  <Bar 
                    dataKey="totalAmount" 
                    fill="#8884d8" 
                    name="Total Amount" 
                  />
                  <Bar 
                    dataKey="totalFees" 
                    fill="#82ca9d" 
                    name="Total Fees" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Last 5 transactions</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sender</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCashouts?.data?.slice(0, 5).map((transaction:Transaction) => (
                    <TableRow key={transaction._id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {transaction.sender.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {transaction.sender.mobileNumber}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {transaction.recipient.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {transaction.recipient.mobileNumber}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        ৳ {transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="font-medium">
                        ৳ {transaction.fee.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {formatDate(transaction.createdAt)}
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
  );
};

export default Dashboard;