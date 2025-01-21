"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProfileAvatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
      className="relative w-56 h-56"
    >
      {/* Animated border gradient */}
      <div className="absolute inset-0 bg-gradient-conic from-success via-success/50 to-success animate-spin-slow" />
      
      {/* Glowing effect */}
      <div className="absolute inset-1 bg-background blur-sm" />
      
      {/* Image container */}
      <div className="absolute inset-1">
        <div className="w-full h-full relative">
          <Image
            src="/JML_2019-min.png"
            alt="Profile"
            fill
            className="object-contain hover:scale-110 transition-transform duration-500"
            priority
          />
        </div>
      </div>
    </motion.div>
  );
} 