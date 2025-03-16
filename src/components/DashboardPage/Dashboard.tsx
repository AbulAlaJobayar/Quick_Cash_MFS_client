import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

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

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$10,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Cash Out</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$500</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Cash In</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$1,200</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Send Money</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$300</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-4">
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
      </div>
    </div>
  );
}