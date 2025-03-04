import React from "react";
import RegisterPage from "./RegisterPage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Quick Cash",
  description:
    "Create a new Quick Cash account to enjoy secure and convenient mobile financial services. Register now to get started!",
  keywords: [
    "sign up",
    "Quick Cash",
    "register",
    "mobile financial services",
    "create account",
    "secure signup",
  ],
  openGraph: {
    title: "Sign Up - Quick Cash",
    description:
      "Create a new Quick Cash account to enjoy secure and convenient mobile financial services. Register now to get started!",
    url: "https://quickcash.com/signup", // Replace with your actual signup page URL
    siteName: "Quick Cash",
    images: [
      {
        url: "https://quickcash.com/og-signup-image.jpg", // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "Quick Cash Sign Up",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up - Quick Cash",
    description:
      "Create a new Quick Cash account to enjoy secure and convenient mobile financial services. Register now to get started!",
    images: ["https://quickcash.com/twitter-signup-image.jpg"], // Replace with your actual Twitter image URL
  },
};
const Register = () => {
  return (
    <>
      <RegisterPage />
    </>
  );
};

export default Register;
