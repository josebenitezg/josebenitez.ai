import type { Metadata } from "next";
import Container from "@/components/Container";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Personal lab",
  description:
    "Personal notes on technology, self-experimentation, and tools. Educational context only; not medical advice.",
  alternates: {
    canonical: "/lab",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themes = [
  {
    title: "Sleep & recovery",
    description:
      "Observing how sleep, training load, and recovery signals relate over time.",
  },
  {
    title: "Attention & stress",
    description:
      "Exploring meditation, neurofeedback, and routines for more deliberate focus.",
  },
  {
    title: "Environment",
    description:
      "Tracking variables such as air quality and CO₂ that can shape comfort and cognition.",
  },
  {
    title: "Metabolic signals",
    description:
      "Learning from personal data while keeping medical interpretation with qualified professionals.",
  },
];

const tools = [
  "Apple Watch Ultra",
  "Muse 2",
  "Whoop 4.0",
  "Continuous glucose monitor",
  "Aranet4",
  "EmotiBit",
];

export default function LabPage() {
  return (
    <>
      <PageIntro
        eyebrow="Personal lab"
        title="Curiosity, measured carefully."
        description="A small corner for personal experiments at the intersection of technology, data, and human performance. This sits outside my professional offering."
      />
      <Container className="py-20 sm:py-28">
        <div className="rounded-2xl border border-amber-200/15 bg-amber-100/[0.03] p-6 text-sm leading-6 text-stone-400">
          Personal experimentation only. Nothing on this page is medical advice,
          a recommendation, or a substitute for professional care.
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
          {themes.map((theme) => (
            <section key={theme.title} className="bg-[#0b0b0b] p-7 sm:p-9">
              <h2 className="text-2xl font-semibold text-stone-100">
                {theme.title}
              </h2>
              <p className="mt-4 leading-7 text-stone-500">
                {theme.description}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-20 grid gap-10 border-t border-white/10 pt-14 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Tools in the lab</p>
          </div>
          <ul className="grid gap-3 text-sm text-stone-400 sm:grid-cols-2">
            {tools.map((tool) => (
              <li key={tool} className="surface px-4 py-3">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
