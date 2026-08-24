import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import PageIntro from "@/components/PageIntro";
import { capabilities } from "@/lib/site";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Ways José Benítez can support teams working through Physical AI strategy, computer vision, edge and cloud infrastructure, and system evaluation.",
  alternates: {
    canonical: "/capabilities",
  },
};

const prompts = [
  "What does the system need to perceive before it can act reliably?",
  "What architecture fits the latency, cost, and reliability constraints?",
  "What should run at the edge, in the cloud, or outside the AI path?",
  "How do we move from a promising model to a reliable operating system?",
];

export default function CapabilitiesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Capabilities"
        title="Physical systems before abstract benchmarks."
        description="Support for founders and technical leaders making consequential decisions about perception, inference, and autonomy. Engagement shape and scope are defined around the operating constraint, not a fixed package."
      />

      <Container className="py-20 sm:py-28">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
          {capabilities.map((capability) => (
            <article key={capability.number} className="bg-[#0b0b0b] p-8 sm:p-10">
              <p className="text-xs text-stone-600">{capability.number}</p>
              <h2 className="mt-10 text-3xl font-semibold tracking-[-0.025em] text-stone-100">
                {capability.title}
              </h2>
              <p className="mt-5 max-w-xl leading-7 text-stone-400">
                {capability.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-24 grid gap-12 border-t border-white/10 pt-16 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Useful starting questions</p>
            <h2 className="mt-5 text-3xl font-semibold text-stone-100">
              Bring the hard decision.
            </h2>
          </div>
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {prompts.map((prompt, index) => (
              <li
                key={prompt}
                className="grid grid-cols-[2rem_1fr] gap-4 py-6 text-lg leading-8 text-stone-300"
              >
                <span className="text-sm text-stone-600">0{index + 1}</span>
                {prompt}
              </li>
            ))}
          </ol>
        </div>

        <div className="surface mt-24 flex flex-col gap-8 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-stone-100">
              Have a specific system in mind?
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-stone-400">
              Share the operating context and the decision you are facing.
              Relevance comes before format.
            </p>
          </div>
          <Link href="/contact" className="button shrink-0">
            Start a conversation
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </Container>
    </>
  );
}
