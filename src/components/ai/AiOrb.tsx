import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface AiOrbProps {
  className?: string;
}

export function AiOrb({ className }: AiOrbProps) {
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden bg-black rounded-full isolate", className)}>
      
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e1b4b_0%,#000000_100%)]" />

      {/* Layer 1: Brand Orange (Primary Energy) - Magma Flow */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 0.9, 1],
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[150%] h-[150%] -top-[25%] -left-[25%] bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 blur-[20px] mix-blend-screen opacity-80"
      />

      {/* Layer 2: Emerald/Teal (Secondary Flow) - Cool Contrast */}
      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [0.9, 1.1, 0.9],
          borderRadius: [
            "40% 60% 70% 30% / 40% 50% 60% 50%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "40% 60% 70% 30% / 40% 50% 60% 50%"
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[140%] h-[140%] top-[15%] right-[15%] bg-gradient-to-bl from-emerald-400 via-teal-500 to-cyan-600 blur-[25px] mix-blend-screen opacity-70"
      />

      {/* Layer 3: Deep Core (Purple/Violet) - Anchoring Depth */}
      <motion.div
        animate={{
          rotate: [0, -180, 0],
          scale: [1.1, 0.9, 1.1],
          x: [0, 20, -20, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[130%] h-[130%] bottom-[10%] left-[10%] bg-gradient-to-tr from-indigo-600 to-violet-800 blur-[30px] mix-blend-screen opacity-60"
      />

      {/* Layer 4: White Hot Core - The Light Source */}
      <motion.div
        animate={{
          scale: [0.9, 1.2, 0.9],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[40%] h-[40%] bg-white blur-[12px] rounded-full mix-blend-normal shadow-[0_0_40px_10px_rgba(255,255,255,0.6)]"
      />
      
      {/* SPHERICAL VIGNETTE - Creates the 3D Ball Look */}
      {/* This darkens the edges to hide the blob clipping and define the sphere */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_90%,#000000_100%)] pointer-events-none z-10" />

      {/* Specular Highlight - Glass Reflection */}
      <div className="absolute top-[5%] left-[20%] w-[40%] h-[20%] bg-gradient-to-b from-white/40 to-transparent rounded-[100%] blur-[2px] -rotate-12 pointer-events-none z-20 mix-blend-overlay" />
      
      {/* Rim Light - Subtle Edge Definition */}
      <div className="absolute inset-0 rounded-full border border-white/10 shadow-[inset_0_0_15px_rgba(255,255,255,0.1)] pointer-events-none z-20" />
    </div>
  );
}
