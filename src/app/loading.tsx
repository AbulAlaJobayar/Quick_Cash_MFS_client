// app/loading.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, Text3D, useTexture } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {  Smartphone, ShieldCheck, Rocket, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const FinancialParticle = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const texture = useTexture({
    map: '/particle.png', // Your financial-themed particle texture
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} {...texture} />
      </mesh>
    </Float>
  );
};

const LoadingScene = () => {
  const particles = [
    { position: [1, 0, -2] as [number, number, number], color: '#22c55e' }, // Green - money
    { position: [-1, 1, -3] as [number, number, number], color: '#3b82f6' }, // Blue - trust
    { position: [0, -1, -1] as [number, number, number], color: '#f59e0b' }, // Orange - energy
    { position: [2, 1, -4] as [number, number, number], color: '#6366f1' }, // Purple - innovation
  ];

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      
      <Suspense fallback={null}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.8}
          height={0.2}
          curveSegments={12}
          position={[0, 0, 0]}
        >
          {`$$$`}
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.3} />
        </Text3D>

        {particles.map((particle, i) => (
          <FinancialParticle key={i} position={particle.position} color={particle.color} />
        ))}
      </Suspense>
    </Canvas>
  );
};

const SecurityBadge = () => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 0.5, type: 'spring' }}
    className="absolute top-4 right-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border"
  >
    <ShieldCheck className="h-4 w-4 text-green-500" />
    <span className="text-xs font-medium">256-bit Encryption</span>
  </motion.div>
);

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-background/80 backdrop-blur-sm p-4 rounded-xl border shadow-sm"
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-medium">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground">{description}</p>
  </motion.div>
);

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setShowContent(true), 500);
    }
  }, [progress]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      {/* 3D Financial Scene */}
      <div className="absolute inset-0 z-0 opacity-90">
        <LoadingScene />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-6">
        <AnimatePresence>
          {!showContent ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md flex flex-col items-center text-center gap-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Smartphone className="h-12 w-12 text-primary" strokeWidth={1.5} />
              </motion.div>

              <div className="space-y-2">
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-white"
                >
                  Securing Your Financial Hub
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground"
                >
                  Loading your ultra-secure mobile banking experience
                </motion.p>
              </div>

              <div className="w-full space-y-2">
                <Progress value={progress} className="h-2 bg-background/50" />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-muted-foreground"
                >
                  {progress < 100 ? (
                    <>Initializing secure connection ({Math.round(progress)}%)</>
                  ) : (
                    <>Ready to launch!</>
                  )}
                </motion.p>
              </div>

              <SecurityBadge />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md space-y-6"
            >
              <div className="text-center space-y-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                  className="inline-block p-3 rounded-full bg-primary/10"
                >
                  <Rocket className="h-8 w-8 text-primary" />
                </motion.div>
                <h1 className="text-2xl font-bold text-white">Welcome to Quantum Finance</h1>
                <p className="text-muted-foreground">Your next-gen mobile banking experience</p>
              </div>

              <div className="grid gap-3">
                <FeatureCard
                  icon={<Smartphone className="h-5 w-5" />}
                  title="Mobile-First"
                  description="Bank anytime, anywhere with our optimized mobile experience"
                  delay={0.1}
                />
                <FeatureCard
                  icon={<ShieldCheck className="h-5 w-5" />}
                  title="Military-Grade Security"
                  description="Your funds are protected with bank-level encryption"
                  delay={0.2}
                />
                <FeatureCard
                  icon={<ArrowRight className="h-5 w-5" />}
                  title="Instant Transfers"
                  description="Send money to anyone in seconds, not days"
                  delay={0.3}
                />
              </div>

              <Button size="lg" className="w-full gap-2">
                Enter Your Financial Hub
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: 0,
          }}
          animate={{
            x: [null, Math.random() * 100],
            y: [null, Math.random() * 100],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className={cn(
            "absolute rounded-full",
            i % 3 === 0 ? "bg-green-500/30 w-3 h-3" :
            i % 2 === 0 ? "bg-blue-500/30 w-2 h-2" :
            "bg-purple-500/30 w-1 h-1"
          )}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}