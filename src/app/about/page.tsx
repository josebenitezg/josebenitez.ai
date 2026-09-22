import type { Metadata } from "next";
import { experience } from "@/lib/experience";
import { featuredLinks, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "José Benítez is an electrical engineer and Founder & Chief Product Officer at Intuitivo. His work spans industrial systems, digital manufacturing, and Physical AI.",
  alternates: {
    canonical: "/about",
  },
};

const talks = [
  { label: "AWS Machine Learning collaboration", href: featuredLinks.aws },
  { label: "YoloVision conference", href: featuredLinks.yoloVision },
  { label: "Conversation with OpenCV CEO Satya Mallick", href: featuredLinks.openCv },
  { label: "MIT Innovator Under 35", href: featuredLinks.mit, meta: "2022" },
];

function period(start: string, end: string | null) {
  const from = start.slice(0, 4);
  if (end === null) return `${from} — now`;
  const to = end.slice(0, 4);
  return from === to ? from : `${from} — ${to}`;
}

export default function AboutPage() {
  return (
    <>
      <h1 className="title">About</h1>
      <p className="lede">
        Electrical engineer and founder, building physical AI in San Francisco.
        I started in industrial maintenance, moved through 3D printing and
        connected hardware, and now lead product at Intuitivo.
      </p>
      <p className="lede">
        I help founders and teams working on perception, edge and cloud
        inference, and system evaluation.{" "}
        <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
          Say hello on LinkedIn
        </a>
        .
      </p>

      <section className="section" aria-labelledby="experience-title">
        <h2 id="experience-title" className="section-title">
          Experience
        </h2>
        <ol className="list">
          {experience.map((entry) => (
            <li key={`${entry.company}-${entry.start}`} className="row">
              <span className="row-title">
                {entry.company}
                <span className="text-[var(--muted)]"> · {entry.role}</span>
              </span>
              <span className="row-meta">{period(entry.start, entry.end)}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" aria-labelledby="talks-title">
        <h2 id="talks-title" className="section-title">
          Talks &amp; recognition
        </h2>
        <ul className="list">
          {talks.map((talk) => (
            <li key={talk.label}>
              <a
                href={talk.href}
                target="_blank"
                rel="noopener noreferrer"
                className="row"
              >
                <span className="row-title">{talk.label}</span>
                <span className="row-meta">{talk.meta ?? "↗"}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
