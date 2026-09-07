import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";
import CareerTimeline from "@/components/CareerTimeline";
import NextRoom from "@/components/NextRoom";
import PageIntro from "@/components/PageIntro";
import { featuredLinks, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "José Benítez is an electrical engineer and Founder & Chief Product Officer at Intuitivo. His work spans industrial systems, digital manufacturing, and Physical AI.",
  alternates: {
    canonical: "/about",
  },
};

const publicLinks = [
  { label: "AWS Machine Learning collaboration", href: featuredLinks.aws },
  { label: "YoloVision conference", href: featuredLinks.yoloVision },
  {
    label: "Conversation with OpenCV CEO Satya Mallick",
    href: featuredLinks.openCv,
  },
  { label: "MIT Innovator Under 35 · 2022", href: featuredLinks.mit },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        title={
          <>
            Engineer.
            <br />
            <em>Founder.</em>
          </>
        }
        description="Building physical AI. Based in San Francisco."
        study={2}
      />
      <Container className="room-content about-quiet">
        <CareerTimeline />
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="observatory-link career-profile"
          aria-label="More on LinkedIn (opens in a new tab)"
        >
          More on LinkedIn
          <ArrowUpRight aria-hidden="true" size={15} />
        </a>
        <details className="public-details">
          <summary>Talks & collaborations</summary>
          <div className="public-record">
            {publicLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="observatory-link"
              >
                {link.label}
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            ))}
          </div>
        </details>
      </Container>
      <NextRoom href="/capabilities" title="How I can help" />
    </>
  );
}
