"use client";

import { Card } from "@nextui-org/react";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";

export default function Projects() {
  return (
    <>
      <NeuralNetworkBackground />
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-2xl p-8 glassmorphism neural-glow text-center">
          <div className="space-y-6">
            <WrenchScrewdriverIcon className="w-16 h-16 mx-auto text-success animate-pulse" />
            <h1 className="text-4xl font-bold">
              Projects Page Under Construction
              <span className="animate-[pulse_0.5s_ease-in-out_infinite] ml-2">_</span>
            </h1>
            <p className="text-xl text-default-500">
              I'm currently building something awesome here. Check back soon to see my latest projects and experiments in AI, neural networks, and biohacking.
            </p>
            <div className="flex justify-center gap-2 pt-4">
              <div className="w-2 h-2 rounded-full bg-success/60 animate-[pulse_1.5s_ease-in-out_infinite]" />
              <div className="w-2 h-2 rounded-full bg-success/60 animate-[pulse_1.5s_ease-in-out_infinite_0.5s]" />
              <div className="w-2 h-2 rounded-full bg-success/60 animate-[pulse_1.5s_ease-in-out_infinite_1s]" />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
} 