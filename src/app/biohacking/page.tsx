'use client';

const BiohackingCard = ({ title, items }: { title: string; items: { name: string; description: string; icon?: string }[] }) => (
  <div className="space-y-3">
    <h3 className="text-xl font-semibold">{title}</h3>
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          {item.icon && <span className="text-xl">{item.icon}</span>}
          <div>
            <h4 className="font-medium">{item.name}</h4>
            <p className="text-sm text-neutral-400">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Biohacking() {
  return (
    <>
      <main className="min-h-screen py-24 px-6 md:px-12 lg:px-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Biohacking Journey 🧬</h1>
            <p className="text-xl text-neutral-400 mb-6">
              Exploring the convergence of technology and human optimization
            </p>
            <div className="inline-block">
              <div className="px-4 py-2 rounded-full bg-yellow-500/5 border border-yellow-500/10 backdrop-blur-sm">
                <p className="text-sm text-yellow-500 flex items-center gap-2">
                  <span className="animate-pulse">⚠️</span>
                  <span>
                    Personal experimentation only. Not medical advice. Consult professionals before trying anything.
                  </span>
                  <span className="animate-pulse">⚠️</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <BiohackingCard
              title="Daily Supplements Stack"
              items={[
                { icon: "🌿", name: "Ashwagandha", description: "Adaptogen for stress management and cortisol regulation" },
                { icon: "🧠", name: "L-Theanine", description: "For mental calmness and cognitive performance enhancement" },
                { icon: "⚡", name: "Alpha GPC", description: "Choline compound for cognitive function and memory support" },
                { icon: "☀️", name: "Vitamin D3", description: "Essential for immune function and cognitive health" },
                { icon: "💪", name: "Acetyl L-Carnitine", description: "For energy metabolism and mental clarity" },
                { icon: "🐟", name: "Omega-3", description: "Essential fatty acids for brain health and inflammation reduction" },
              ]}
            />

            <BiohackingCard
              title="Tech Stack"
              items={[
                { icon: "⌚", name: "Apple Watch Ultra", description: "24/7 health metrics tracking and training optimization" },
                { icon: "🧠", name: "Muse 2", description: "EEG device for meditation and neurofeedback training" },
                { icon: "📊", name: "Whoop 4.0", description: "Recovery optimization and strain monitoring" },
                { icon: "💪", name: "Levels CGM", description: "Continuous glucose monitoring for metabolic health" },
                { icon: "🌬️", name: "Aranet4", description: "CO2 PPM monitoring for optimal cognitive performance and air quality" },
              ]}
            />
          </div>

          <div className="mb-12 p-6 rounded-xl bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border border-green-500/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h3 className="text-xl font-semibold">Current Experiments</h3>
            </div>
            <p className="text-neutral-400">
              Exploring the intersection of technology and biology through data-driven self-experimentation. 
              Currently focusing on sleep optimization, cognitive enhancement, and metabolic health through 
              a combination of supplements, devices, and lifestyle interventions.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Sleep Optimization","Cognitive Enhancement","Stress Management","Metabolic Health","Recovery"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-neutral-400 italic text-sm">
              All information shared here is for educational purposes only and represents my personal biohacking journey.
            </p>
          </div>
        </div>
      </main>
    </>
  );
} 