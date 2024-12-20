'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
    <main className="min-h-screen py-24 px-6 md:px-12 lg:px-24 prose dark:prose-invert max-w-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <TypewriterText text="Hi, I'm Jose Benitez Genes" />
        </h1>
        
        <div className="mb-12">
          <p className="text-xl leading-relaxed mb-6">
            I'm an <HighlightText>electrical engineer and entrepreneur</HighlightText> passionate about creating new tech. 
            Originally from Ybycui, Paraguay, I'm currently the <HighlightText>Founder and Director of AI at Intuitivo</HighlightText>, 
            a startup that creates the AI Infrastructure for unattended retail.
          </p>
        </div>

        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">Current Role</h2>
          <p className="mb-6">
            I lead the AI team and oversee the development of the infrastructure for millions of autonomous points of purchase, 
            using <HighlightText>deep learning</HighlightText>, <HighlightText>IoT</HighlightText>, and <HighlightText>data science</HighlightText> as 
            core competencies. My previous roles have included founding and serving as CTO of Aratiri, 
            a startup focused on digital manufacturing, 3D design, 3D printing and IoT development.
          </p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">My Journey</h2>
          <p className="mb-6">
            My journey began with a deep passion for technology and a drive to solve complex problems. 
            As an advocate for innovation, I have consistently aimed to create solutions that make a significant impact.
          </p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">Professional Highlights</h2>
          <ul className="space-y-4 list-none pl-0">
            <motion.li 
              whileHover={{ x: 10 }}
              className="flex items-center space-x-2"
            >
              <span className="text-emerald-500">▹</span>
              <span>Founded Intuitivo, pioneering the development of autonomous points of purchase with cutting-edge AI and IoT technologies.</span>
            </motion.li>
            <motion.li 
              whileHover={{ x: 10 }}
              className="flex items-center space-x-2"
            >
              <span className="text-emerald-500">▹</span>
              <span>Contributed to the development of digital manufacturing and IoT solutions at Aratiri (the first one in its class in Paraguay).</span>
            </motion.li>
            <motion.li 
              whileHover={{ x: 10 }}
              className="flex items-center space-x-2"
            >
              <span className="text-emerald-500">▹</span>
              <span>Developed research and production strategies at Po Paraguay, enhancing the quality of 3D printed prostheses.</span>
            </motion.li>
            <motion.li 
              whileHover={{ x: 10 }}
              className="flex items-center space-x-2"
            >
              <span className="text-emerald-500">▹</span>
              <span>Worked on smart building technologies at Función Digital.</span>
            </motion.li>
          </ul>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">Honors and Awards</h2>
          <div className="flex flex-wrap gap-4">
            <div className="bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-900 dark:to-purple-800 px-4 py-2 rounded-lg">
              MIT Innovator Under 35
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 px-4 py-2 rounded-lg">
              O1 US Visa Holder
            </div>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
} 