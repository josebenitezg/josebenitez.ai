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
} from "@heroicons/react/24/outline";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import LatestPosts from "@/components/LatestPosts";

export default function Home() {
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

        {/* Latest Blog Posts */}
        <LatestPosts />
      </div>
    </>
  );
}
