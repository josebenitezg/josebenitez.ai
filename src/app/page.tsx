"use client";

import { Avatar } from "@nextui-org/react";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import BookCarousel from "@/components/BookCarousel";
import RepoCarousel from "@/components/RepoCarousel";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <NeuralNetworkBackground />
      <div className="relative sm:fixed inset-0">
        <div className="h-[calc(100vh-120px)] flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-8">
              {/* Left Side - Profile - Más compacto en móvil */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sm:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left mb-4 sm:mb-0"
              >
                {/* Avatar solo en desktop */}
                <div className="hidden sm:block relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full border-2 border-success/30" />
                  <Avatar
                    src="/your-avatar.jpg"
                    className="w-full h-full border-2 border-success"
                  />
                  <div className="absolute -right-1 -bottom-1 w-3 h-3 rounded-full bg-success/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-4">
                  <h1 className="text-2xl sm:text-4xl font-bold">
                    Hi, I&apos;m José Benítez
                    <span className="animate-[pulse_0.5s_ease-in-out_infinite] ml-2">_</span>
                  </h1>
                  <p className="text-default-500 text-sm sm:text-lg leading-tight sm:leading-relaxed">
                    Building the future with AI and open source. 
                    Passionate about neural networks and pushing technological boundaries.
                  </p>
                </div>
              </motion.div>

              {/* Right Side - Carousels - Más compactos en móvil */}
              <div className="sm:col-span-8 space-y-3 sm:space-y-8">
                {/* Latest Books */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-1 sm:space-y-4"
                >
                  <h2 className="text-lg sm:text-2xl font-bold text-success/80 text-center sm:text-left">
                    Latest Books
                  </h2>
                  <div className="p-0.5 sm:p-1">
                    <BookCarousel />
                  </div>
                </motion.div>

                {/* Latest Repos */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-1 sm:space-y-4"
                >
                  <h2 className="text-lg sm:text-2xl font-bold text-success/80 text-center sm:text-left">
                    Latest Repos
                  </h2>
                  <div className="p-0.5 sm:p-1">
                    <RepoCarousel />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
