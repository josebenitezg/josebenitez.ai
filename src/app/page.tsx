"use client";

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Chip,
  Link,
  Avatar,
} from "@nextui-org/react";
import {
  CircleStackIcon,
  BeakerIcon,
  CodeBracketIcon,
  StarIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import LatestPosts from "@/components/LatestPosts";
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

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

export default function Home() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

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

  const getVisibleRepos = () => {
    if (!repos.length) return [];
    const items = [...repos, ...repos, ...repos];
    const visibleCount = Math.min(5, repos.length);
    return items;
  };

  return (
    <>
      <NeuralNetworkBackground />
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-6 py-12">
          <Avatar
            src="/your-avatar.jpg"
            className="w-32 h-32"
            isBordered
            color="success"
            size="lg"
          />
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">
              Hi, I&apos;m <span className="text-success">Jose</span> 
              <span className="animate-[pulse_0.5s_ease-in-out_infinite] ml-2">_</span>
            </h1>
            <p className="text-xl text-default-500 max-w-2xl">
              Obsessed with neural networks and biohacking. I tinker with awesome tech at{" "}
              <Link href="https://intuitivo.com" className="text-success">
                intuitivo.com
              </Link>
              . Tech geek at heart, open-source lover, and always eager to plug into new machine learning adventures!
            </p>
          </div>
        </section>

        {/* Areas of Interest */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">What I&apos;m Into</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glassmorphism shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="flex gap-3">
                <CircleStackIcon className="w-8 h-8 text-success" />
                <p className="text-xl font-semibold">Neural Networks</p>
              </CardHeader>
              <CardBody>
                <p className="text-default-500">
                  Deep diving into artificial neural networks, machine learning architectures, and cognitive computing.
                </p>
              </CardBody>
            </Card>

            <Card className="glassmorphism shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="flex gap-3">
                <BeakerIcon className="w-8 h-8 text-success" />
                <p className="text-xl font-semibold">Biohacking</p>
              </CardHeader>
              <CardBody>
                <p className="text-default-500">
                  Exploring the intersection of biology and technology to optimize human performance.
                </p>
              </CardBody>
            </Card>

            <Card className="glassmorphism shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="flex gap-3">
                <CodeBracketIcon className="w-8 h-8 text-success" />
                <p className="text-xl font-semibold">Open Source</p>
              </CardHeader>
              <CardBody>
                <p className="text-default-500">
                  Contributing to and creating open-source projects that push the boundaries of tech.
                </p>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Featured Highlights */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Featured Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glassmorphism shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-xl font-semibold">AWS & MIT Recognition</p>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <Link 
                    href="https://aws.amazon.com/blogs/machine-learning/intuitivo-achieves-higher-throughput-while-saving-on-ai-ml-costs-using-aws-inferentia-and-pytorch/"
                    isExternal
                    className="block text-default-500 hover:text-success"
                  >
                    📝 AWS Blog Collaboration - Optimizing AI/ML with Inferentia Chips
                  </Link>
                  <Link 
                    href="https://www.innovatorsunder35.com/the-list/jos%C3%A9-ben%C3%ADtez/"
                    isExternal
                    className="block text-default-500 hover:text-success"
                  >
                    🏆 MIT Innovator Under 35 - Class of 2022
                  </Link>
                </div>
                <div className="flex gap-2 mt-4">
                  <Chip color="success" variant="flat">AWS</Chip>
                  <Chip color="warning" variant="flat">MIT</Chip>
                  <Chip color="primary" variant="flat">Innovation</Chip>
                </div>
              </CardBody>
            </Card>

            <Card className="glassmorphism shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-xl font-semibold">Speaking Engagements</p>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <Link 
                    href="https://www.youtube.com/live/xWZ9mW7Z4Tc?si=e9eTO6KDl4xBdAHA&t=21551"
                    isExternal
                    className="block text-default-500 hover:text-success"
                  >
                    📹 YoloVision Conf - Foundation Models in Data Collection
                  </Link>
                  <Link 
                    href="https://www.youtube.com/watch?v=IXhUOPBqyz4"
                    isExternal
                    className="block text-default-500 hover:text-success"
                  >
                    📹 Chat with OpenCV CEO Satya Mallick
                  </Link>
                </div>
                <div className="flex gap-2 mt-4">
                  <Chip color="success" variant="flat">Talks</Chip>
                  <Chip color="warning" variant="flat">Computer Vision</Chip>
                  <Chip color="primary" variant="flat">AI</Chip>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Latest Repositories */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Latest Repositories</h2>
          <div className="relative h-[400px] w-full overflow-hidden">
            <div className="flex gap-4 absolute left-0 animate-slideRepos">
              {!loading && (
                <>
                  {getVisibleRepos().map((repo, idx) => (
                    <motion.div
                      key={`${repo.id}-${idx}`}
                      className="w-[280px] shrink-0"
                      initial={false}
                    >
                      <Card className="h-[350px] glassmorphism">
                        <CardBody className="flex flex-col gap-3 h-full">
                          <div className="flex items-center gap-3">
                            <CodeBracketIcon className="w-6 h-6 text-success shrink-0" />
                            <h2 className="text-lg font-bold truncate">{repo.name}</h2>
                          </div>

                          <div className="h-[60px]">
                            {repo.description ? (
                              <p className="text-default-500 text-sm line-clamp-2">
                                {repo.description}
                              </p>
                            ) : (
                              <p className="text-default-400 text-sm italic">
                                No description available
                              </p>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2 min-h-[32px]">
                            {repo.language && (
                              <Chip
                                color={getLanguageColor(repo.language)}
                                variant="flat"
                                size="sm"
                              >
                                {repo.language}
                              </Chip>
                            )}
                            {repo.topics.slice(0, 2).map((topic) => (
                              <Chip key={topic} variant="flat" size="sm">
                                {topic}
                              </Chip>
                            ))}
                          </div>

                          <div className="flex gap-4 mt-auto">
                            <div className="flex items-center gap-1 text-sm">
                              <StarIcon className="w-4 h-4" />
                              <span>{repo.stargazers_count}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <ArrowPathRoundedSquareIcon className="w-4 h-4" />
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
                </>
              )}
            </div>
          </div>
        </section>

        {/* Latest Blog Posts */}
        <LatestPosts />
      </div>
    </>
  );
}
