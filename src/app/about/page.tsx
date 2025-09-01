'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <span className="font-mono">{displayText}</span>;
};

const HighlightText = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-r from-yellow-200 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 px-2 py-1 rounded">
    {children}
  </span>
);

export default function About() {
  return (
    <main className="min-h-screen py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight [font-family:var(--font-serif)] mb-6">
          <TypewriterText text="Hola, soy Jose Benitez Genes" />
        </h1>
        
        <div className="mb-12">
          <p className="text-xl leading-relaxed mb-6">
            I'm an <HighlightText>electrical engineer and entrepreneur</HighlightText> passionate about creating new tech. 
            Originally from Ybycui, Paraguay, I'm currently the <HighlightText>Founder and Chief AI Officer at Intuitivo</HighlightText>, 
            a company that creates the AI Infrastructure for unattended retail.
          </p>
        </div>

        <section className="mb-12 prose dark:prose-invert">
          <h2 className="text-2xl font-bold mb-4">My Journey</h2>
          <p className="mb-6">
            Since I was a kid, I've been passionate about solving hard problems and building useful things for people. 
            The biggest challenge I've faced wasn't technical - it was my life circumstances. I grew up facing extreme economic 
            and personal adversity, which made it incredibly hard to follow a traditional path through university and career building. 
            I had to find my own way!

            I started by repairing elevators to pay for college, but my curiosity for technology never stopped. Even during the toughest times 
            when I was struggling to pay bills, I would grab every opportunity to learn about different technologies. 
            This adversity actually fueled my passion for knowledge even more - it showed me that with technology, you can overcome almost any obstacle.

            Back in 2014, while still juggling work and studies, I took my first Machine Learning course with Andrew Ng on Coursera. 
            That was my gateway into AI and ML, which I started combining with other technologies like IoT, Robotics, and Cloud Computing. 
            The learning never stops, and honestly, I wouldn't want it any other way!

            Looking back at this challenging journey, I learned something really important: 
            <HighlightText>Education is like compound interest - the more you genuinely invest in it (even during tough times), 
            the more it gives back!</HighlightText>
          </p>
        </section>

        <section className="mb-12 prose dark:prose-invert">
          <h2 className="text-2xl font-bold mb-4">Current Role</h2>
          <p className="mb-6">
            I lead the Intuitivo AI team and oversee the development of the infrastructure for millions of autonomous points of purchase, 
            using <HighlightText>deep learning</HighlightText>, <HighlightText>IoT</HighlightText>, and <HighlightText>data science</HighlightText> as 
            core competencies. My previous roles have included founding and serving as CTO of Aratiri, 
            a startup focused on digital manufacturing, 3D design, 3D printing and IoT development.
          </p>
        </section>

        <section className="mb-12 prose dark:prose-invert">
          <h2 className="text-2xl font-bold mb-4">Professional Highlights</h2>
          <ul className="space-y-4 list-none pl-0">
            <li className="flex items-center space-x-2">
              <span className="text-emerald-500">▹</span>
              <span>Founded Intuitivo, pioneering the development of autonomous points of purchase with cutting-edge AI and IoT technologies.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-emerald-500">▹</span>
              <span>Contributed to the development of digital manufacturing and IoT solutions at Aratiri (the first one in its class in Paraguay).</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-emerald-500">▹</span>
              <span>Helped the incredible team of Po Paraguay (equiPO) to create top-notch quality 3D-printed low-cost prostheses</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-emerald-500">▹</span>
              <span>Worked on smart building technologies at Función Digital.</span>
            </li>
          </ul>
        </section>

        <section className="mb-12 prose dark:prose-invert">
          <h2 className="text-2xl font-bold mb-4">Featured In</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-emerald-500">📝</span>
              <Link
                href="https://aws.amazon.com/blogs/machine-learning/intuitivo-achieves-higher-throughput-while-saving-on-ai-ml-costs-using-aws-inferentia-and-pytorch/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
              >
                AWS Blog Collaboration - Optimizing AI/ML with Inferentia Chips
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-emerald-500">📹</span>
              <Link
                href="https://www.youtube.com/live/xWZ9mW7Z4Tc?si=e9eTO6KDl4xBdAHA&t=21551"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
              >
                YoloVision Conference - Foundation Models in Data Collection
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-emerald-500">📹</span>
              <Link
                href="https://www.youtube.com/watch?v=IXhUOPBqyz4"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
              >
                Interview with Satya Mallick, CEO of OpenCV
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-emerald-500">🏆</span>
              <Link
                href="https://www.innovatorsunder35.com/the-list/josé-benítez/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
              >
                MIT Innovator Under 35 - 2022
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Honors and Awards</h2>
          <div className="flex flex-wrap gap-4">
            <div className="bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-900 dark:to-purple-800 px-4 py-2 rounded-lg">
              MIT Innovator Under 35
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 px-4 py-2 rounded-lg">
              O1 US Visa Holder
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 