"use client";

import { useEffect, useRef } from 'react';

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

export default function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const neuronsRef = useRef<Neuron[]>([]);
  const numNeurons = 80;
  const maxConnections = 5;

  const initializeNeurons = (width: number, height: number) => {
    neuronsRef.current = [];
    for (let i = 0; i < numNeurons; i++) {
      neuronsRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        connections: []
      });

      // Create random connections
      for (let j = 0; j < maxConnections; j++) {
        const target = Math.floor(Math.random() * numNeurons);
        if (target !== i) {
          neuronsRef.current[i].connections.push(target);
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeNeurons(canvas.width, canvas.height);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeNeurons(canvas.width, canvas.height);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      neuronsRef.current.forEach((neuron) => {
        // Update position
        neuron.x += neuron.vx;
        neuron.y += neuron.vy;

        // Bounce off walls
        if (neuron.x < 0 || neuron.x > canvas.width) neuron.vx *= -1;
        if (neuron.y < 0 || neuron.y > canvas.height) neuron.vy *= -1;

        // Draw connections first
        neuron.connections.forEach(targetIndex => {
          const target = neuronsRef.current[targetIndex];
          ctx.beginPath();
          ctx.moveTo(neuron.x, neuron.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = 'rgba(136, 255, 136, 0.25)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });

        // Draw neuron with enhanced glow effect
        // Outer glow
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(136, 255, 136, 0.15)';
        ctx.fill();

        // Middle glow
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(136, 255, 136, 0.25)';
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#88ff88';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: 'transparent' }}
    />
  );
} 