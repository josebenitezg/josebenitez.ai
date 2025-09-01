"use client";

import { useEffect, useState } from 'react';

const GREETINGS = ["Hola 👋", "Hello 👋", "こんにちは 👋", "你好 👋"];

export default function Home() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % GREETINGS.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="w-full max-w-3xl mx-auto text-center space-y-6 py-20">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight [font-family:var(--font-serif)]">{GREETINGS[idx]}</h1>
        <p className="text-neutral-400 text-lg">
        Crafting neural networks in San Francisco.
        </p>
        {/* Removed extra menu to avoid duplication with Navbar */}
      </div>
    </div>
  );
}
