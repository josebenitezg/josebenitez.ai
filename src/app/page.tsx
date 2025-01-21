"use client";

import BookCarousel from "@/components/BookCarousel";
import RepoCarousel from "@/components/RepoCarousel";
import { motion } from "framer-motion";
import { FaGithub, FaCalendarCheck } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";
import { BsGpuCard } from "react-icons/bs";
import ProfileAvatar from "@/components/ProfileAvatar";
import Link from "next/link";
export default function Home() {
  return (
    <div className="h-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-8">
          {/* Left Side - Profile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sm:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left mb-4 sm:mb-0"
          >
            <div className="flex flex-col items-center sm:items-start w-full">
              {/* Profile Avatar */}
              <div className="hidden sm:block w-56 h-56 mb-8 self-center">
                <ProfileAvatar />
              </div>

              {/* Content */}
              <div className="space-y-4 w-full">
                <h1 className="text-2xl sm:text-4xl font-bold">
                  Hi, I&apos;m José Benítez
                  <span className="animate-[pulse_0.5s_ease-in-out_infinite] ml-2">_</span>
                </h1>
                <p className="text-default-500 text-sm sm:text-lg leading-tight sm:leading-relaxed">
                  Obsessed with neural networks and biohacking. I tinker with awesome tech at <Link href="https://www.intuitivo.com" target="_blank" rel="noopener noreferrer" className="text-success hover:text-success/80 transition-colors">Intuitivo</Link>. 
                  Tech geek at heart, open-source lover, and always eager to plug into new AI projects!
                </p>
              </div>

              {/* Social Links & Status */}
              <div className="hidden sm:flex flex-col gap-3 mt-6 w-full">
                {/* Training Status */}
                <div className="flex items-center gap-2 text-warning/80">
                  <BsGpuCard className="animate-pulse" />
                  <span className="text-sm">Training AI models</span>
                </div>
                
                {/* Links */}
                <div className="flex flex-col gap-2">
                  <a 
                    href="https://github.com/josebenitezg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-default-500 hover:text-success transition-colors"
                  >
                    <FaGithub /> GitHub
                  </a>
                  <a 
                    href="https://huggingface.co/joselobenitezg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-default-500 hover:text-success transition-colors"
                  >
                    <SiHuggingface /> Hugging Face
                  </a>
                  <a 
                    href="https://calendly.com/josebenitezg/30min" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-default-500 hover:text-success transition-colors"
                  >
                    <FaCalendarCheck /> Schedule a call
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Carousels */}
          <div className="sm:col-span-8 flex flex-col justify-center space-y-2 sm:space-y-6">
            {/* Latest Books */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1 sm:space-y-3"
            >
              <h2 className="text-lg sm:text-2xl font-bold text-success/80 text-center sm:text-left">
                Latest Books
              </h2>
              <div className="p-0.5">
                <BookCarousel />
              </div>
            </motion.div>

            {/* Latest Repos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-1 sm:space-y-3"
            >
              <h2 className="text-lg sm:text-2xl font-bold text-success/80 text-center sm:text-left">
                Latest Repos
              </h2>
              <div className="p-0.5">
                <RepoCarousel />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
