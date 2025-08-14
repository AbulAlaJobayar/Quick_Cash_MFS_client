import Image from "next/image";
import React from "react";
import frauds from "@/assets/secqure.jpg";
import { Button } from "../ui/button";
import Link from "next/link";

const Frauds = () => {
  return (
    <div className="bg-pink-100 dark:bg-black my-20 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image Section */}
          <div className="flex justify-center md:justify-end">
            <Image
              alt="frauds"
              src={frauds}
              className="rounded-lg shadow-xl w-full max-w-md hover:scale-105 transition-transform duration-300"
              width={500}
              height={500}
            />
          </div>

          {/* Text Section */}
          <div className="space-y-6 max-w-md mx-auto md:mx-0">
            <h1 className="text-3xl  font-bold text-gray-800 dark:text-white">
              Beware of Frauds
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed dark:text-white">
              Do not share the PIN, OTP, or account balance of your QKash
              account with anyone. Fraudsters can take advantage of your
              vulnerability to steal your hard-earned money from your account.
              Even by using your account, they can scam others by pretending to
              be you.
            </p>
            <Link href={"#"}>
              <Button className="bg-gradient-to-tr from-pink-600 to-pink-800 hover:from-pink-700 hover:to-pink-900 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/fraud"> Learn More</Link>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frauds;
