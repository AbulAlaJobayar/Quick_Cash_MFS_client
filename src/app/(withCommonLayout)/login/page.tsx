import LoginPage from "@/app/(withCommonLayout)/login/logInPage";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Quick Cash",
  description: "Sign in to your Quick Cash account to access secure mobile financial services.",
  keywords: ["login", "Quick Cash", "mobile financial services", "secure login"],
  openGraph: {
    title: "Login - Quick Cash",
    description: "Sign in to your Quick Cash account to access secure mobile financial services.",
    url: "https://quickcash.com/login", // Replace with your actual login page URL
    siteName: "Quick Cash",
    images: [
      {
        url: "https://quickcash.com/og-login-image.jpg", // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "Quick Cash Login",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login - Quick Cash",
    description: "Sign in to your Quick Cash account to access secure mobile financial services.",
    images: ["https://quickcash.com/twitter-login-image.jpg"], // Replace with your actual Twitter image URL
  },
};
const Login = () => {
  return (
    <>
      <LoginPage />
    </>
  );
};

export default Login;
