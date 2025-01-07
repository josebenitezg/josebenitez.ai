"use client";

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Link, Chip } from "@nextui-org/react";
import { useChat } from 'ai/react';
import PaperCard from '@/components/PaperCard';
import { Paper } from '@/lib/types';

export default function Papers() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch('/api/papers');
        if (!response.ok) throw new Error('Failed to fetch papers');
        const data = await response.json();
        setPapers(data);
      } catch (error) {
        console.error('Error fetching papers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPapers();
    // Poll for new papers every 5 minutes
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

      <div className="grid gap-6">
        {papers.map((paper) => (
          <PaperCard key={paper.uid} paper={paper} />
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 w-full max-w-4xl bg-default-100 rounded-lg" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 