import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";
import PageIntro from "@/components/PageIntro";
import { featuredLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "José Benítez is an electrical engineer, entrepreneur, and Founder & Chief AI Officer at Intuitivo.",
  alternates: {
    canonical: "/about",
  },
};

const highlights = [
  "Founded Intuitivo and leads its AI work for unattended retail.",
  "Previously founded and served as CTO of Aratiri, focused on digital manufacturing and IoT.",
  "Contributed to low-cost 3D-printed prostheses with Po Paraguay's equiPO team.",
  "Worked on smart-building technology at Función Digital.",
];

const publicLinks = [
  { label: "AWS Machine Learning collaboration", href: featuredLinks.aws },
  { label: "YoloVision conference", href: featuredLinks.yoloVision },
  { label: "Conversation with OpenCV CEO Satya Mallick", href: featuredLinks.openCv },
  { label: "MIT Innovator Under 35 · 2022", href: featuredLinks.mit },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        title="Engineer by training. Builder by habit."
        description="I am Jose Benitez Genes, an electrical engineer and entrepreneur from Ybycui, Paraguay, now based in San Francisco."
      />

      <Container className="py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
          <div>
            <p className="eyebrow">Current work</p>
            <p className="mt-5 leading-7 text-stone-300">
              Founder & Chief AI Officer
              <br />
              Intuitivo
            </p>
          </div>
          <div className="space-y-7 text-lg leading-8 text-stone-400">
            <p>
              My work sits where software meets the physical world: computer
              vision, IoT, cloud infrastructure, and the operational constraints
              that decide whether an AI system is useful outside a demo.
            </p>
            <p>
              At Intuitivo, I lead AI infrastructure for unattended retail. The
              work requires turning camera data into reliable systems that can
              operate across real environments, not controlled benchmarks.
            </p>
            <p>
              I began repairing elevators to help pay for college and kept
              following the same instinct: understand how a system works, then
              make it more useful. A machine-learning course in 2014 connected
              that instinct to AI, and the path has since crossed robotics,
              manufacturing, cloud computing, and entrepreneurship.
            </p>
          </div>
        </div>

        <div className="mt-24 grid gap-14 border-t border-white/10 pt-16 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
          <div>
            <p className="eyebrow">Selected highlights</p>
          </div>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {highlights.map((highlight) => (
              <li key={highlight} className="py-5 leading-7 text-stone-300">
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-24 grid gap-14 border-t border-white/10 pt-16 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
          <div>
            <p className="eyebrow">Public record</p>
          </div>
          <div className="flex flex-col items-start gap-4">
            {publicLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link text-base"
              >
                {link.label}
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
