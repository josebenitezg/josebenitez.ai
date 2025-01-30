'use client';

import { motion } from 'framer-motion';
import BioHackBackground from "@/components/BioHackBackground";

const BiohackingCard = ({ title, items }: { title: string; items: { name: string; description: string; icon?: string }[] }) => (
  <div className="space-y-3">
    <h3 className="text-xl font-semibold">{title}</h3>
    <div className="space-y-2">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-3 p-3 rounded-lg bg-default-100/10 hover:bg-default-100/20 transition-colors"
        >
          {item.icon && <span className="text-xl">{item.icon}</span>}
          <div>
            <h4 className="font-medium">{item.name}</h4>
            <p className="text-sm text-default-500">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default function Biohacking() {
  return (
    <>
      <BioHackBackground />
      <main className="min-h-screen py-24 px-6 md:px-12 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Biohacking Journey 🧬</h1>
            <p className="text-xl text-default-500 mb-6">
              Exploring the convergence of technology and human optimization
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block"
            >
              <div className="px-4 py-2 rounded-full bg-warning-500/5 border border-warning-500/10 backdrop-blur-sm">
                <p className="text-sm text-warning-500 flex items-center gap-2">
                  <span className="animate-pulse">⚠️</span>
                  <span>
                    Personal experimentation only. Not medical advice. Consult professionals before trying anything.
                  </span>
                  <span className="animate-pulse">⚠️</span>
                </p>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <BiohackingCard
              title="Daily Supplements Stack"
              items={[
                {
                  icon: "🌿",
                  name: "Ashwagandha",
                  description: "Adaptogen for stress management and cortisol regulation"
                },
                {
                  icon: "🧠",
                  name: "L-Theanine",
                  description: "For mental calmness and cognitive performance enhancement"
                },
                {
                  icon: "⚡",
                  name: "Alpha GPC",
                  description: "Choline compound for cognitive function and memory support"
                },
                {
                  icon: "☀️",
                  name: "Vitamin D3",
                  description: "Essential for immune function and cognitive health"
                },
                {
                  icon: "💪",
                  name: "Acetyl L-Carnitine",
                  description: "For energy metabolism and mental clarity"
                },
                {
                  icon: "🐟",
                  name: "Omega-3",
                  description: "Essential fatty acids for brain health and inflammation reduction"
                }
              ]}
            />

            <BiohackingCard
              title="Tech Stack"
              items={[
                {
                  icon: "⌚",
                  name: "Apple Watch Ultra",
                  description: "24/7 health metrics tracking and training optimization"
                },
                {
                  icon: "🧠",
                  name: "Muse 2",
                  description: "EEG device for meditation and neurofeedback training"
                },
                {
                  icon: "📊",
                  name: "Whoop 4.0",
                  description: "Recovery optimization and strain monitoring"
                },
                {
                  icon: "💪",
                  name: "Levels CGM",
                  description: "Continuous glucose monitoring for metabolic health"
                },
                {
                  icon: "🌬️",
                  name: "Aranet4",
                  description: "CO2 PPM monitoring for optimal cognitive performance and air quality"
                }
              ]}
            />
          </div>

          <motion.div 
            className="mb-12 p-6 rounded-xl bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border border-success/10"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <h3 className="text-xl font-semibold">Current Experiments</h3>
            </div>
            <p className="text-default-500">
              Exploring the intersection of technology and biology through data-driven self-experimentation. 
              Currently focusing on sleep optimization, cognitive enhancement, and metabolic health through 
              a combination of supplements, devices, and lifestyle interventions.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Sleep Optimization",
                "Cognitive Enhancement",
                "Stress Management",
                "Metabolic Health",
                "Recovery",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm bg-success/10 text-success"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <p className="text-default-500 italic text-sm">
              All information shared here is for educational purposes only and represents my personal biohacking journey.
            </p>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
} 