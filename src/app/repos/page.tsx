"use client";

import { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Link, Button, Chip } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { CodeBracketIcon, StarIcon, ArrowPathRoundedSquareIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

export default function Repos() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [typedRepo, setTypedRepo] = useState('');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/josebenitezg/repos?sort=updated&per_page=10');
        const data = await response.json();
        setRepos(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching repos:', error);
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // Calculate visible repos for infinite scroll effect
  const getVisibleRepos = () => {
    if (!repos.length) return [];
    const items = [...repos, ...repos, ...repos];
    // Show only 1 repo on mobile, 2 on tablets, and 3 on desktop
    const visibleCount = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    return items.slice(currentIndex, currentIndex + visibleCount);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % repos.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [repos.length]);

  useEffect(() => {
    if (!repos[currentIndex]) return;
    
    const repoUrl = repos[currentIndex].html_url;
    const text = `git clone ${repoUrl}`;
    let charIndex = 0;
    
    setTypedRepo('');
    
    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        setTypedRepo(prev => prev + text[charIndex]);
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentIndex, repos]);

  const getLanguageColor = (language: string): "success" | "warning" | "primary" | "danger" | "secondary" | "default" => {
    const colors = {
      Python: "success",
      JavaScript: "warning",
      TypeScript: "primary",
      HTML: "danger",
      CSS: "secondary",
    } as const;
    
    return colors[language as keyof typeof colors] || "default";
  };

  return (
    <>
      <NeuralNetworkBackground />
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-6xl mx-auto space-y-8">
          {/* Terminal-like header */}
          <div className="flex items-center gap-2 font-mono text-success overflow-x-auto w-full text-sm sm:text-base">
            <span>$</span>
            <span className="typing-animation whitespace-nowrap">
              {!loading && repos[currentIndex] && `git clone ${repos[currentIndex].html_url}`}
            </span>
            <span className="animate-pulse">_</span>
          </div>

          {/* Repository Carousel */}
          <div className="relative h-[450px] sm:h-[400px] w-full overflow-hidden">
            <div className="flex gap-4 absolute transition-transform duration-500">
              {!loading && getVisibleRepos().map((repo, idx) => (
                <motion.div
                  key={`${repo.id}-${idx}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1rem)]"
                >
                  <Card className="h-full glassmorphism">
                    <CardBody className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <CodeBracketIcon className="w-6 h-6 text-success" />
                        <h2 className="text-lg sm:text-xl font-bold truncate">{repo.name}</h2>
                      </div>

                      <div className="min-h-[60px]">
                        {repo.description ? (
                          <p className="text-default-500 text-sm sm:text-base line-clamp-2">
                            {repo.description}
                          </p>
                        ) : (
                          <p className="text-default-400 text-sm sm:text-base italic">
                            No description available
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {repo.language && (
                          <Chip
                            color={getLanguageColor(repo.language)}
                            variant="flat"
                            size="sm"
                          >
                            {repo.language}
                          </Chip>
                        )}
                        {repo.topics.slice(0, window.innerWidth < 640 ? 1 : 2).map((topic) => (
                          <Chip key={topic} variant="flat" size="sm">
                            {topic}
                          </Chip>
                        ))}
                      </div>

                      <div className="flex gap-4 mt-auto">
                        <div className="flex items-center gap-1 text-sm">
                          <StarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <ArrowPathRoundedSquareIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>{repo.forks_count}</span>
                        </div>
                      </div>
                    </CardBody>
                    <CardFooter>
                      <Button
                        as={Link}
                        href={repo.html_url}
                        target="_blank"
                        color="success"
                        variant="ghost"
                        size="sm"
                        className="w-full"
                      >
                        View Repository
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2">
            {repos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                  index === currentIndex % repos.length
                    ? "bg-success w-3 sm:w-4"
                    : "bg-default-200 hover:bg-default-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 