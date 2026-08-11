import type { Metadata } from "next";
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
      <PageIntro
        eyebrow="Selected work"
        title="AI that meets the constraints of the physical world."
        description="A focused record of publicly documented roles and systems. Where public metrics are unavailable, the gap is stated rather than filled with an invented number."
      />

      <Container className="py-10 sm:py-16">
        {selectedWork.map((work, index) => {
          const links = evidenceLinks[work.title];
          const id =
            work.title === "AWS Inferentia"
              ? "aws-inferentia"
              : work.title.toLowerCase();

          return (
            <article
              key={work.title}
              id={id}
              className="grid scroll-mt-24 gap-10 border-b border-white/10 py-16 first:pt-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"
            >
              <div>
                <p className="eyebrow">{work.eyebrow}</p>
                <p className="mt-6 text-sm text-stone-600">0{index + 1}</p>
              </div>
              <div>
                <h2 className="text-4xl font-semibold tracking-[-0.035em] text-stone-100 sm:text-5xl">
                  {work.title}
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-400">
                  {work.description}
                </p>

                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-stone-600">
                      Public scope
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-300">
                      {work.areas.map((area) => (
                        <li key={area} className="border-l border-white/15 pl-4">
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-stone-600">
                      Evidence
                    </h3>
                    {links.length > 0 ? (
                      <div className="mt-4 flex flex-col items-start gap-3">
                        {links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : undefined}
                            rel={
                              link.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="text-link"
                          >
                            {link.label}
                            <ArrowUpRight aria-hidden="true" size={14} />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-4 max-w-sm text-sm leading-6 text-stone-500">
                        Public case-study metrics and links have not yet been
                        documented. Add verified outcomes here when available.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </Container>
    </>
  );
}
