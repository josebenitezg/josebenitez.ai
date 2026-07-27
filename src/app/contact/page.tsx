import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with José Benítez about applied AI, computer vision, AI infrastructure, or a consequential technical decision.",
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
          If you&apos;re leading an AI initiative, evaluating a physical-world
          system, or making a difficult architecture decision, send the context
          and the question you need answered.
        </p>
      </div>

      <div className="surface p-7 sm:p-9">
        <p className="text-sm leading-7 text-stone-400">
          LinkedIn is the verified public contact route currently available.
          Include the company, the problem, and why the decision matters.
        </p>
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="button mt-7 w-full"
        >
          Connect on LinkedIn
          <ArrowUpRight aria-hidden="true" size={16} />
        </a>
        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-xs uppercase tracking-[0.15em] text-stone-600">
            Email
          </p>
          <p className="mt-3 text-sm leading-6 text-stone-500">
            Preferred public email address to be confirmed by José.
          </p>
        </div>
      </div>
    </Container>
  );
}
