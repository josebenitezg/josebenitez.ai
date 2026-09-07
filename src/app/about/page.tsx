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

const highlights = [
  "Founded Intuitivo and leads its Physical AI work for unattended retail.",
  "Documented computer-vision inference work with the AWS Machine Learning team.",
  "Previously founded and served as CTO of Aratiri, focused on digital manufacturing and connected systems.",
];

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
        number="03"
        eyebrow="About"
        title={
          <>
            An engineer’s mind.
            <br />
            <em>A founder’s curiosity.</em>
          </>
        }
        description="I’m José Benítez Genes. An electrical engineer, entrepreneur, and Founder & Chief AI Officer at Intuitivo. I’m drawn to the place where ideas become physical systems."
        study={2}
        annotation="A few paths. An ongoing curiosity."
      />
      <Container className="room-content">
        <section className="marginal-section" aria-labelledby="about-work">
          <aside className="margin-note">
            <p className="observatory-label" id="about-work">
              Here, now
            </p>
            <p>
              Founder & Chief AI Officer
              <br />
              Intuitivo
            </p>
            <p>San Francisco, California</p>
          </aside>
          <div className="body-notes">
            <p>
              My work is Physical AI: systems that perceive, decide, and operate
              in the real world. I focus on computer vision, connected hardware,
              and the infrastructure that makes those systems useful.
            </p>
            <p>
              At Intuitivo, I lead AI infrastructure for unattended retail. The
              work is turning camera data into reliable systems that can operate
              across real environments, with all their variation and
              uncertainty.
            </p>
            <p>
              I also follow the forces around these systems: compute, energy,
              infrastructure, and the model shifts that expand what we can
              build. Writing is one way I work through those connections.
            </p>
            <p>
              Before Intuitivo, I worked across connected hardware, digital
              manufacturing, and cloud systems. That foundation still shapes how
              I think: the model is one part of a much larger system.
            </p>
          </div>
        </section>
        <section className="marginal-section" aria-labelledby="about-path">
          <div className="margin-note">
            <p className="observatory-label" id="about-path">
              Along the way
            </p>
          </div>
          <ul className="career-record">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>
        <section className="marginal-section" aria-labelledby="about-record">
          <div className="margin-note">
            <p className="observatory-label" id="about-record">
              Elsewhere on the internet
            </p>
            <p>Conversations, collaborations, and a little public history.</p>
          </div>
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
        </section>
      </Container>
      <NextRoom
        href="/capabilities"
        number="04"
        label="Capabilities"
        title="Put that curiosity to work."
      />
    </>
  );
}
