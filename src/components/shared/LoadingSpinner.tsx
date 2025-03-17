"use client";
import Lottie from "lottie-react";
import animateLoading from "@/assets/loading/animation.json";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <Lottie animationData={animateLoading} loop={true} style={{ width: 200, height: 200 }} ></Lottie>  
    </div>
  );
};

export default LoadingSpinner;