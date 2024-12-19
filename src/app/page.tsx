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
  Divider,
} from "@nextui-org/react";
import {
  CircleStackIcon,
  BeakerIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import { GiBrain } from 'react-icons/gi';

export default function Home() {
  return (
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
            Hi, I'm <span className="text-success">Jose</span> 
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
        <h2 className="text-3xl font-bold">What I'm Into</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="backdrop-blur-lg bg-background/40 border-1 border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
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

          <Card className="backdrop-blur-lg bg-background/40 border-1 border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
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

          <Card className="backdrop-blur-lg bg-background/40 border-1 border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
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

      {/* Featured Projects */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="backdrop-blur-lg bg-background/40 border-1 border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-xl font-semibold">Intuitivo Platform</p>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-default-500">
                Building innovative tech solutions at intuitivo.com, focusing on machine learning and AI applications.
              </p>
              <div className="flex gap-2 mt-4">
                <Chip color="success" variant="flat">Machine Learning</Chip>
                <Chip color="warning" variant="flat">Neural Networks</Chip>
                <Chip color="primary" variant="flat">AI</Chip>
              </div>
            </CardBody>
            <CardFooter>
              <Button color="success" variant="ghost">
                Learn More
              </Button>
            </CardFooter>
          </Card>

          <Card className="backdrop-blur-lg bg-background/40 border-1 border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-xl font-semibold">Biohacking Dashboard</p>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-default-500">
                Personal project for tracking and analyzing biometric data using machine learning algorithms.
              </p>
              <div className="flex gap-2 mt-4">
                <Chip color="success" variant="flat">Python</Chip>
                <Chip color="warning" variant="flat">TensorFlow</Chip>
                <Chip color="primary" variant="flat">Biometrics</Chip>
              </div>
            </CardBody>
            <CardFooter>
              <Button color="success" variant="ghost">
                View Project
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Latest Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "The Future of Neural Networks",
              preview: "Exploring the latest developments in neural architecture and their implications for AI.",
              date: "March 15, 2024",
            },
            {
              title: "Biohacking: A Developer's Approach",
              preview: "How I use technology to optimize cognitive performance and productivity.",
              date: "March 10, 2024",
            },
          ].map((post, index) => (
            <Card
              key={index}
              isPressable
              as={Link}
              href={`/blog/post-${index + 1}`}
              className="backdrop-blur-lg bg-background/40 border-1 border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-xl font-semibold">{post.title}</p>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-default-500">{post.preview}</p>
              </CardBody>
              <CardFooter className="flex justify-between">
                <span className="text-sm text-default-400">{post.date}</span>
                <span className="text-success">Read more →</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
