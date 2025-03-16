"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import animateLoading from "@/assets/loading/animation.json";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <DotLottieReact src={JSON.stringify(animateLoading)} loop autoplay />
    </div>
  );
};

export default LoadingSpinner;