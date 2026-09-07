import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";
import NextRoom from "@/components/NextRoom";
import PageIntro from "@/components/PageIntro";
import { featuredLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "José Benítez is an electrical engineer, Physical AI operator, and Founder & Chief AI Officer at Intuitivo.",
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
        description="I’m José Benítez, Founder & Chief AI Officer at Intuitivo."
        study={2}
      />
      <Container className="room-content about-quiet">
        <div className="body-notes">
          <p>
            I build systems that see and act in the physical world. At
            Intuitivo, that means computer vision and AI infrastructure for
            autonomous retail.
          </p>
          <p>
            Before that, I founded Aratiri, working with digital manufacturing
            and connected hardware. I’m based in San Francisco.
          </p>
        </div>
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
