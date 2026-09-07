import type { Metadata } from "next";
import Link from "next/link";
import ArtifactVisual from "@/components/ArtifactVisual";
import NextRoom from "@/components/NextRoom";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";
import PageIntro from "@/components/PageIntro";
import { featuredLinks, selectedWork } from "@/lib/site";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Publicly documented work across computer vision, AI infrastructure, unattended retail, and connected physical systems.",
  alternates: {
    canonical: "/work",
  },
};

const evidenceLinks = {
  Intuitivo: [
    {
      label: "AWS customer story",
      href: featuredLinks.aws,
    },
    {
      label: "Autonomy in unattended retail",
      href: "/blog/autonomous-retail",
    },
  ],
  "AWS Inferentia": [
    {
      label: "Read the AWS collaboration",
      href: featuredLinks.aws,
    },
    {
      label: "Read José's technical note",
      href: "/blog/inferentia-chips",
    },
  ],
  Aratiri: [],
} as const;

export default function WorkPage() {
  return (
    <>
      <PageIntro title="Selected work." study={0} />
      <Container className="room-content">
        {selectedWork.map((work, index) => {
          const links = evidenceLinks[work.title];
          const id =
            work.title === "AWS Inferentia"
              ? "aws-inferentia"
              : work.title.toLowerCase();
          return (
            <article key={work.title} id={id} className="work-entry">
              <div className="work-object">
                <ArtifactVisual index={index} />
              </div>
              <div>
                <p className="observatory-label">{work.eyebrow}</p>
                <h2>{work.title}</h2>
                <p className="work-description">{work.description}</p>
                <ul className="work-scope">
                  {work.areas.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
                {links.length > 0 && (
                  <div className="work-links">
                    {links.map((link) =>
                      link.href.startsWith("http") ? (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="observatory-link"
                        >
                          {link.label}
                          <ArrowUpRight aria-hidden="true" size={14} />
                        </a>
                      ) : (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="observatory-link"
                        >
                          {link.label}
                          <ArrowUpRight aria-hidden="true" size={14} />
                        </Link>
                      ),
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </Container>
      <NextRoom href="/writing" title="All writing" />
    </>
  );
}
