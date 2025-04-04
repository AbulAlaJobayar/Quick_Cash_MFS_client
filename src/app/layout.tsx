import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/Providers";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quick Cash",
  description: "A secure mobile financial service platform",
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

   
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > 
            {children}
      
          <Toaster richColors/>
        </ThemeProvider>
      </body>
    </html>
  );
}
