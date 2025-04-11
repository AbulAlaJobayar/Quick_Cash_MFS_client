// app/not-found.tsx
'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { Button } from '@/components/ui/button';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRightIcon, RocketIcon } from 'lucide-react';

const Astronaut = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
  </mesh>
);

const ShootingStars = () => {
  const [dimensions, setDimensions] = useState({ 
    width: 0, 
    height: 0 
  });

  useEffect(() => {
    // Only run on client side
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (dimensions.width === 0 || dimensions.height === 0) return null;

  return (
    <>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: -100,
            y: Math.random() * dimensions.height,
            opacity: 0,
          }}
          animate={{
            x: dimensions.width + 100,
            y: Math.random() * dimensions.height,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute w-2 h-2 bg-white rounded-full shadow-lg"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </>
  );
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#020817] to-[#0f172a] overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
          <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Astronaut />
          </Float>
        </Canvas>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="mb-8"
        >
          <h1 className="text-9xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            404
          </h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl font-bold text-white mb-4"
        >
          Houston, we have a problem!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl text-gray-300 mb-12 max-w-2xl"
        >
          The page you&apos;re looking for has left orbit. Don&apos;t worry, our mission control can guide you back to safety.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button asChild variant="default" size="lg" className="gap-2">
            <Link href="/">
              <RocketIcon className="h-5 w-5" />
              Launch to Home
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="gap-2">
            <Link href="/contact">
              <ArrowRightIcon className="h-5 w-5" />
              Contact Mission Control
            </Link>
          </Button>
        </motion.div>

        {/* Floating planets decoration */}
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="absolute left-10 top-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 5,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.5,
          }}
          className="absolute right-20 top-1/3 w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 shadow-lg"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 7,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 1,
          }}
          className="absolute right-1/4 bottom-1/4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg"
        />
      </motion.div>

      {/* Shooting stars - now safely rendered client-side */}
      <ShootingStars />
    </div>
  );
}