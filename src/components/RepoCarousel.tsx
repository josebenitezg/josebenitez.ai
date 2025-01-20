"use client";

import { useState, useEffect } from 'react';
import { Card, CardBody, Chip } from "@nextui-org/react";
import { CodeBracketIcon, StarIcon } from "@heroicons/react/24/outline";

interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
}

export default function RepoCarousel() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/josebenitezg/repos?sort=updated&per_page=4');
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

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex gap-6 animate-slideRepos">
        {!loading && (
          <>
            {[...repos, ...repos, ...repos].map((repo, idx) => (
              <Card 
                key={`${repo.id}-${idx}`}
                className="w-[260px] sm:w-[280px] h-[140px] sm:h-[160px] shrink-0 glassmorphism hover:scale-[1.02] transition-transform duration-300 border border-success/10"
              >
                <CardBody className="flex flex-col gap-2 p-4">
                  <div className="flex items-center gap-2">
                    <CodeBracketIcon className="w-5 h-5 text-success" />
                    <h3 className="font-semibold truncate">{repo.name}</h3>
                  </div>
                  
                  <p className="text-sm text-default-500 line-clamp-2">
                    {repo.description || "No description available"}
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    {repo.language && (
                      <Chip 
                        size="sm" 
                        variant="flat" 
                        color="success"
                        className="bg-success/10"
                      >
                        {repo.language}
                      </Chip>
                    )}
                    <div className="flex items-center gap-1 text-sm">
                      <StarIcon className="w-4 h-4" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
} 