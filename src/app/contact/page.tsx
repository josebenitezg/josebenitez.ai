import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with José Benítez about Physical AI, computer vision, inference infrastructure, or a consequential system decision.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <Container className="grid min-h-[72vh] items-center gap-14 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:py-28">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-stone-100 sm:text-7xl">
          Start with the constraint.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-400 sm:text-xl">
          If you&apos;re building a system that must perceive or act in the physical
          world, send the operating context, the constraint, and the decision you
          need to make.
        </p>
      </div>

      <a
        href={siteConfig.links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="button w-full lg:max-w-sm lg:justify-self-end"
      >
        Connect on LinkedIn
        <ArrowUpRight aria-hidden="true" size={16} />
      </a>
    </Container>
  );
}
