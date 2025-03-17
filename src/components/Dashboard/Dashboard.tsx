"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
} from "recharts";
import { motion } from "framer-motion";
import { useGetMeQuery } from "@/redux/api/authApi";

import {
  useMonthlyTransactionQuery,
  useMyTransactionQuery,
  useTodayTransactionQuery,
} from "@/redux/api/transactionApi";
import LoadingSpinner from "../shared/LoadingSpinner";
// Animation variants for Framer Motion
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
  const { data: me, isLoading: userLoading } = useGetMeQuery("");
  const { data: todayTransaction, isLoading: transactionLoading } =
    useTodayTransactionQuery("");
  const { data: recentCashouts, isLoading: myTransactionLoading } =
    useMyTransactionQuery("");

  const { data: monthly, isLoading: monthlyLoading } =
    useMonthlyTransactionQuery("");
  if (
    userLoading ||
    transactionLoading ||
    myTransactionLoading ||
    monthlyLoading
  ) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* Grid for the top 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            title: "Current Balance",
            value: me?.data.balance ? me?.data.balance : 0,
          },
          {
            title: "Today's Cash Out",
            value: todayTransaction?.data?.cashout
              ? todayTransaction?.data?.cashout
              : 0,
          },
          {
            title: "Today's Cash In",
            value: todayTransaction?.data?.cashin
              ? todayTransaction?.data?.cashin
              : 0,
          },
          {
            title: "Send Money",
            value: todayTransaction?.data?.sendMoney
              ? todayTransaction?.data?.sendMoney
              : 0,
          },
        ].map((card, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold"> &#x9F3; {card.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Grid for the bottom 2 cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Total Year Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart width={450} height={300} data={monthly?.data || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalAmount" fill="#8884d8" name="Total Amount" />
                <Bar dataKey="totalFees" fill="#82ca9d" name="Total Fees" />
              </BarChart>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Recent Cashouts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of recent cashouts.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Recipient</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCashouts &&
                    recentCashouts?.data.slice(0, 5).map((cashout: any) => (
                      <TableRow key={cashout.id}>
                        <TableCell>${cashout.amount}</TableCell>
                        <TableCell>{cashout.date}</TableCell>
                        <TableCell>{cashout.recipient}</TableCell>
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
