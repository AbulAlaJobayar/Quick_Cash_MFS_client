/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Slide {
  image: string;
  title: string;
  description: string;
}

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const slides: Slide[] = [
    {
      image: "https://i.ibb.co.com/QFHZFydY/3rd.webps",
      title: "Send Money Easily",
      description: "Transfer money to anyone, anywhere in Bangladesh.",
    },
    {
      image: "https://i.ibb.co.com/xqXJhqrw/1st.webp",
      title: "Pay Bills Online",
      description: "Pay your utility bills in just a few clicks.",
    },
    {
      image: "https://i.ibb.co.com/HTWH96W0/2nd.webp",
      title: "Recharge Mobile",
      description: "Recharge your mobile balance instantly.",
    },
  ];

  // Start or reset the autoplay timer
  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current); // Clear existing interval
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // Change slide every 8 seconds
  };

  // Pause autoplay on hover
  const pauseAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Initialize autoplay on component mount
  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current); // Cleanup on unmount
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle hover events
  const handleHover = () => {
    setIsHovered(true);
    pauseAutoplay();
  };

  const handleLeave = () => {
    setIsHovered(false);
    startAutoplay();
  };

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    startAutoplay(); // Reset timer on manual navigation
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    startAutoplay(); // Reset timer on manual navigation
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    startAutoplay(); // Reset timer on manual navigation
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {/* Image Section (responsive height) */}
      <div className="relative w-full h-48 md:h-64 lg:h-96 overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              layout="fill"
              objectFit="cover"
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Heading and Paragraph Section (below the image) */}
      <div className="mt-4 text-center">
        <h2 className="text-3xl font-bold text-gray-700 dark:text-white">
          {slides[currentSlide].title}
        </h2>
        <p className="mt-2 text-gray-700 dark:text-white">
          {slides[currentSlide].description}
        </p>
      </div>

      {/* Navigation Arrows and Dots Section (further below) */}
      <div className="mt-8 flex items-center justify-center space-x-4">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="bg-opacity-50 p-2 rounded-full text-gray-700 dark:text-white"
        >
          &#10094;
        </button>

        {/* Dots */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index
                  ? "bg-pink-500"
                  : "bg-white border rounded-full border-gray-700"
              }`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="bg-opacity-50 p-2 rounded-full text-gray-700 dark:text-white"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Carousel;