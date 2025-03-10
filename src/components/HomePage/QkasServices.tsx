import Image from "next/image";
import React from "react";
// import sendMoney from '@/assets/send money.webp'
import payment from "@/assets/payment.webp";
import addMoney from "@/assets/add-money.webp";
import sendMoney from "@/assets/sendmoneyIcon.webp";
import cashOut from "@/assets/cash-out.webp";

const QkasServices = () => {
  return (
    <section className="my-20">
      <div className="flex items-center justify-center my-10">
        {/* Left Line */}
        <div className="flex-grow h-px bg-gray-300"></div>

        {/* Middle Text */}
        <h2 className="mx-4 text-xl md:text-3xl font-semibold text-gray-700 whitespace-nowrap">
          Learn More about QKash Services
        </h2>

        {/* Right Line */}
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-10  md:grid-cols-4  mx-auto place-items-center">
        <div>
          <Image alt="sendMoney" height={80} width={80} src={sendMoney} />
          <h3 className="text-xl text-center">Send Money</h3>
        </div>
        <div>
          <Image alt="addMoney" height={80} width={80} src={addMoney} />
          <h3 className="text-xl  text-center ">Add Money</h3>
        </div>
        <div>
          <Image alt=" payment" height={80} width={80} src={payment} />
          <h3 className="text-xl text-center"> Payment</h3>
        </div>
        <div>
          <Image alt=" cashOut" height={80} width={80} src={cashOut} />
          <h3 className="text-xl text-center"> cash Out</h3>
        </div>
      </div>
    </section>
  );
};

export default QkasServices;
