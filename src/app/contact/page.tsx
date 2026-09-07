import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import { siteConfig } from "@/lib/site";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with José Benítez about Physical AI, computer vision, inference infrastructure, or a consequential system decision.",
  alternates: { canonical: "/contact" },
};
export default function ContactPage() {
  return (
    <PageIntro
      title={
        <>
          Say <em>hello.</em>
        </>
      }
      description="Have something in mind? I’d like to hear it."
      study={4}
    >
      <a
        href={siteConfig.links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="observatory-link contact-direct"
        aria-label="Connect on LinkedIn (opens in a new tab)"
      >
        Connect on LinkedIn
        <ArrowUpRight aria-hidden="true" size={16} />
      </a>
    </PageIntro>
  );
}
