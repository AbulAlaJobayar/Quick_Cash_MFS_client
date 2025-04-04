import Dashboard from "@/components/Dashboard/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Quick Cash",
  description:
    "Your Quick Cash dashboard with financial overview, transactions, and account management.",
  keywords: [
    "dashboard",
    "Quick Cash",
    "financial overview",
    "transactions",
    "account management",
  ],
  openGraph: {
    title: "Dashboard - Quick Cash",
    description:
      "Your Quick Cash dashboard with financial overview, transactions, and account management.",
    url: "https://quickcash.com/dashboard",
    siteName: "Quick Cash",
    images: [
      {
        url: "https://quickcash.com/og-dashboard-image.jpg",
        width: 1200,
        height: 630,
        alt: "Quick Cash Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard - Quick Cash",
    description:
      "Your Quick Cash dashboard with financial overview, transactions, and account management.",
    images: ["https://quickcash.com/twitter-dashboard-image.jpg"],
  },
};

const MainDashboardPage = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};

export default MainDashboardPage;
