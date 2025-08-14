import Image from "next/image";
import React from "react";
import frauds from "@/assets/secqure.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FraudsPage = () => {
  return (
    <div className="min-h-screen bg-pink-100 dark:bg-black py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Protecting Yourself Against Frauds
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Stay informed and protect your financial information
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="flex justify-center">
            <Image
              alt="frauds"
              src={frauds}
              className="rounded-lg shadow-xl w-full max-w-md hover:scale-105 transition-transform duration-300"
              width={600}
              height={600}
              priority
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Common Fraud Tactics
            </h2>
            <ul className="space-y-4 text-lg text-gray-600 leading-relaxed dark:text-gray-300 list-disc pl-5">
              <li>Phishing calls pretending to be from QKash support</li>
              <li>Fake SMS messages with malicious links</li>
              <li>Social engineering to extract your OTP or PIN</li>
              <li>Fake job offers requiring payment</li>
              <li>Investment scams promising high returns</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            How to Protect Yourself
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-pink-600 dark:text-pink-400">
                Do&apos;s
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Verify caller identity before sharing information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Use strong, unique passwords</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Enable two-factor authentication</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Check app permissions regularly</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-pink-600 dark:text-pink-400">
                Don&apos;ts
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Never share OTP, PIN or passwords</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Don&apos;t click on suspicious links</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Avoid public WiFi for transactions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Don&apos;t trust offers that sound too good to be true</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            What to Do If You&apos;re a Victim
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-600 dark:text-gray-300 mb-10">
            <p>
              If you suspect you&apos;ve been scammed, act immediately. Contact QKash
              support through the official app or website to freeze your account.
              File a police report and notify your bank if financial information
              was compromised.
            </p>
            <p>
              Remember, QKash will never call you to ask for your PIN, OTP, or
              password. Stay vigilant and protect your financial information.
            </p>
          </div>
          <Link href="/contact">
            <Button className="bg-gradient-to-tr from-pink-600 to-pink-800 hover:from-pink-700 hover:to-pink-900 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg">
              Report Fraud
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FraudsPage;