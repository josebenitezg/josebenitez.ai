"use client";

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Link, Chip, Progress } from "@nextui-org/react";
import PaperCard from '@/components/PaperCard';
import PaperSkeleton from '@/components/PaperSkeleton';
import { Paper } from '@/lib/types';
import { BeakerIcon } from "@heroicons/react/24/outline";

export default function Papers() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        setIsLoading(true);
        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
          setLoadingProgress(prev => {
            if (prev >= 90) return prev;
            return prev + 10;
          });
        }, 500);

        const response = await fetch('/api/papers');
        if (!response.ok) throw new Error('Failed to fetch papers');
        const data = await response.json();
        setPapers(data);
        setLoadingProgress(100);
        
        // Clear interval after data is loaded
        clearInterval(progressInterval);
        
        // Small delay before hiding loading state for smooth transition
        setTimeout(() => setIsLoading(false), 500);
      } catch (error) {
        console.error('Error fetching papers:', error);
        setIsLoading(false);
      }
    };

    fetchPapers();
    const interval = setInterval(fetchPapers, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-4xl font-bold">
          AI Papers with Pepe 🤖
        </h1>
        <p className="text-xl text-default-500 max-w-2xl">
          Your AI Agent that reads and summarizes the latest papers from PapersWithCode
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center gap-4 justify-center text-success">
              <BeakerIcon className="w-6 h-6 animate-pulse" />
              <div className="text-sm">Processing papers with Pepe...</div>
            </div>
            <Progress
              size="sm"
              value={loadingProgress}
              color="success"
              className="max-w-md mx-auto"
            />
          </div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <PaperSkeleton key={i} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {papers.map((paper) => (
            <PaperCard key={paper.uid} paper={paper} />
          ))}
        </div>
      )}
    </div>
  );
} 