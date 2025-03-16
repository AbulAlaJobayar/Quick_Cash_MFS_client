"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
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
import LoadingSpinner from "../shared/LoadingSpinner";
import { useTodayTransactionQuery } from "@/redux/api/transactionApi";
const data = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];

const recentCashouts = [
  { id: 1, amount: 1200, date: "2023-10-01", recipient: "John Doe" },
  { id: 2, amount: 800, date: "2023-10-02", recipient: "Jane Smith" },
  { id: 3, amount: 1500, date: "2023-10-03", recipient: "Alice Johnson" },
];

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
  const { data: me, isLoading:userLoading } = useGetMeQuery("");

const{ data:todayTransaction, isLoading:transactionLoading } = useTodayTransactionQuery('')
console.log(me)
console.log({todayTransaction})
  if (userLoading || transactionLoading) {
    return <LoadingSpinner/>;
  }

  return (
    <motion.div
      
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Grid for the top 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Current Balance", value: me?.data.balance? me?.data.balance:0},
          { title: "Today's Cash Out", value: todayTransaction?.data?.cashout? todayTransaction?.data?.cashout:0},
          { title: "Today's Cash In", value: todayTransaction?.data?.cashin? todayTransaction?.data?.cashin:0},
          { title: "Send Money", value: todayTransaction?.data?.sendMoney? todayTransaction?.data?.sendMoney:0},
        ].map((card, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold"> 	&#x9F3; {card.value}</p>
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
              <BarChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
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
                  {recentCashouts.map((cashout) => (
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
