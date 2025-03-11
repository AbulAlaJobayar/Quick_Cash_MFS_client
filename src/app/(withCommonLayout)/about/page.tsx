import AboutUs from "@/components/AboutPage/AboutUs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "About Us - Quick Cash",
    description: "Learn about Quick Cash, our mission, vision, and how we empower financial freedom through secure transactions.",
    keywords: [
      "About Quick Cash", 
      "financial services", 
      "digital payments", 
      "secure transactions", 
      "fintech"
    ],
    openGraph: {
      title: "About Us - Quick Cash",
      description: "Learn about Quick Cash, our mission, vision, and how we empower financial freedom through secure transactions.",
      url: "https://quickcash.com/about", // Replace with your actual About page URL
      siteName: "Quick Cash",
      images: [
        {
          url: "https://quickcash.com/og-about-image.jpg", // Replace with your actual OG image URL
          width: 1200,
          height: 630,
          alt: "About Quick Cash",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "About Us - Quick Cash",
      description: "Discover how Quick Cash is revolutionizing financial services and empowering users worldwide.",
      images: ["https://quickcash.com/twitter-about-image.jpg"], // Replace with your actual Twitter image URL
    },
  };
  
const AboutPage = () => {
  return (
    <>
      <AboutUs/>
    </>
  );
};

export default AboutPage;
