'use client';

export default function Biohacking() {
  return (
    <main className="min-h-screen py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight [font-family:var(--font-serif)]">Biohacking</h1>
        <p className="text-neutral-400 mt-3 text-lg">Exploring the convergence of technology and human optimization.</p>

        <div className="mt-8 pl-4 border-l-2 border-white/15">
          <p className="text-sm italic text-neutral-500">Personal experimentation only. Not medical advice. Consult professionals before trying anything.</p>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-semibold">Daily supplements</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <div className="font-medium">Ashwagandha</div>
              <p className="text-sm text-neutral-400">Adaptogen for stress management and cortisol regulation.</p>
            </li>
            <li>
              <div className="font-medium">L-Theanine</div>
              <p className="text-sm text-neutral-400">For mental calmness and cognitive performance enhancement.</p>
            </li>
            <li>
              <div className="font-medium">Alpha GPC</div>
              <p className="text-sm text-neutral-400">Choline compound for cognitive function and memory support.</p>
            </li>
            <li>
              <div className="font-medium">Vitamin D3</div>
              <p className="text-sm text-neutral-400">Essential for immune function and cognitive health.</p>
            </li>
            <li>
              <div className="font-medium">Acetyl L-Carnitine</div>
              <p className="text-sm text-neutral-400">For energy metabolism and mental clarity.</p>
            </li>
            <li>
              <div className="font-medium">Omega-3</div>
              <p className="text-sm text-neutral-400">Essential fatty acids for brain health and inflammation reduction.</p>
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold">Tech stack</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <div className="font-medium">Apple Watch Ultra</div>
              <p className="text-sm text-neutral-400">24/7 health metrics tracking and training optimization.</p>
            </li>
            <li>
              <div className="font-medium">Muse 2</div>
              <p className="text-sm text-neutral-400">EEG device for meditation and neurofeedback training.</p>
            </li>
            <li>
              <div className="font-medium">Whoop 4.0</div>
              <p className="text-sm text-neutral-400">Recovery optimization and strain monitoring.</p>
            </li>
            <li>
              <div className="font-medium">Levels CGM</div>
              <p className="text-sm text-neutral-400">Continuous glucose monitoring for metabolic health.</p>
            </li>
            <li>
              <div className="font-medium">Aranet4</div>
              <p className="text-sm text-neutral-400">CO2 PPM monitoring for optimal cognitive performance and air quality.</p>
            </li>
            <li>
              <div className="font-medium">EmotiBit</div>
              <p className="text-sm text-neutral-400">Wearable sensor for real-time physiological and emotional state tracking (EDA, PPG, temperature, and more).</p>
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold">Current experiments</h2>
          <p className="text-neutral-400 mt-4">
            Exploring the intersection of technology and biology through data-driven self-experimentation. Currently focusing on sleep optimization,
            cognitive enhancement, and metabolic health through a combination of supplements, devices, and lifestyle interventions.
          </p>
          <p className="text-sm text-neutral-500 mt-3">Sleep · Cognitive · Stress · Metabolic · Recovery</p>
        </section>

        <p className="text-neutral-500 italic text-sm mt-12 text-center">
          All information shared here is for educational purposes only and represents my personal biohacking journey.
        </p>
      </div>
    </main>
  );
}