import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";
import Observatory from "@/components/Observatory";
import ArtifactVisual from "@/components/ArtifactVisual";
import { selectedWork, siteConfig } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default async function Home() {
  const latestPosts = (await getAllPosts()).slice(0, 3);
  return (
    <div className="observatory-home">
      <section className="observatory-arrival" aria-labelledby="arrival-title">
        <Container className="arrival-grid">
          <div className="arrival-copy">
            <h1 id="arrival-title">
              Between the
              <br />
              physical &amp;
              <br />
              <em>the possible.</em>
            </h1>
            <p className="arrival-description">
              I’m José. I build AI for the physical world.
            </p>
            <Link href="#explore" className="observatory-link arrival-link">
              Explore <ArrowDown size={15} aria-hidden="true" />
            </Link>
          </div>
          <Observatory />
        </Container>
      </section>
      <section
        id="explore"
        className="observatory-section"
        aria-labelledby="explore-title"
      >
        <Container>
          <div className="section-heading">
            <h2 id="explore-title">Selected work.</h2>
          </div>
          <div className="artifact-grid">
            {selectedWork.map((work, index) => (
              <Link href={work.href} key={work.title} className="artifact-card">
                <ArtifactVisual index={index} link />
                <div className="artifact-caption">
                  <h3>{work.title}</h3>
                  <p>
                    {
                      [
                        "Autonomous retail",
                        "AI infrastructure",
                        "Connected hardware",
                      ][index]
                    }
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <section
        className="observatory-section field-notes"
        aria-labelledby="notes-title"
      >
        <Container className="notes-grid">
          <div className="section-heading">
            <h2 id="notes-title">Writing.</h2>
            <Link href="/writing" className="observatory-link">
              All writing <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="note-list">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="note-row"
              >
                <h3 lang={post.language}>{post.title}</h3>
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
