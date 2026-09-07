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
            <p className="observatory-label">
              <span className="small-star" aria-hidden="true">
                ✳
              </span>{" "}
              A personal observatory
            </p>
            <h1 id="arrival-title">
              Between the
              <br />
              physical &amp;
              <br />
              <em>the possible.</em>
            </h1>
            <p className="arrival-description">
              I’m José. An engineer and founder exploring how machines see, how
              systems think, and what happens when ideas meet the real world.
            </p>
            <Link href="#explore" className="observatory-link arrival-link">
              Take a look around <ArrowDown size={15} aria-hidden="true" />
            </Link>
          </div>
          <Observatory />
          <div className="arrival-footer">
            <span>San Francisco, California</span>
            <span>
              <span className="status-dot" aria-hidden="true" /> Building at
              Intuitivo
            </span>
            <span className="arrival-coordinate">
              37°46′ N &nbsp; 122°25′ W
            </span>
          </div>
        </Container>
      </section>
      <section
        id="explore"
        className="observatory-section"
        aria-labelledby="explore-title"
      >
        <Container>
          <div className="section-heading">
            <p className="observatory-label">01 / Things I’m building</p>
            <h2 id="explore-title">
              Ideas, out in <em>the world.</em>
            </h2>
            <p>
              Perception, infrastructure, and the interesting space between
              hardware and intelligence.
            </p>
          </div>
          <div className="artifact-grid">
            {selectedWork.map((work, index) => (
              <Link href={work.href} key={work.title} className="artifact-card">
                <ArtifactVisual index={index} link />
                <div className="artifact-caption">
                  <h3>{work.title}</h3>
                  <p>{work.eyebrow}</p>
                </div>
                <p className="artifact-description">{work.description}</p>
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
            <p className="observatory-label">02 / Field notes</p>
            <h2 id="notes-title">
              Following
              <br />
              <em>the threads.</em>
            </h2>
            <p>
              Notes on physical AI, and the forces around it. Compute, energy,
              infrastructure. Things that connect.
            </p>
            <Link href="/writing" className="observatory-link">
              All writing <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="note-list">
            {latestPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="note-row"
              >
                <span className="note-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <div lang={post.language}>
                  <p className="observatory-label">
                    {post.series === "physical-ai"
                      ? "Physical AI"
                      : "Correlations"}
                  </p>
                  <h3>{post.title}</h3>
                  {post.description && (
                    <p className="note-description">{post.description}</p>
                  )}
                </div>
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <section
        className="observatory-section observatory-about"
        aria-labelledby="about-title"
      >
        <Container className="about-grid">
          <p className="observatory-label">03 / The person behind it</p>
          <div>
            <h2 id="about-title">
              An engineer’s mind.
              <br />
              <em>A founder’s curiosity.</em>
            </h2>
            <p>
              I work where software meets the physical world. Today, that means
              building AI systems at Intuitivo—and following the questions those
              systems open up.
            </p>
            <div className="about-links">
              <Link href="/about" className="observatory-link">
                A little more about me{" "}
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              <Link href="/capabilities" className="observatory-link">
                How I can help <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <section
        className="observatory-invitation"
        aria-labelledby="invitation-title"
      >
        <Container>
          <span className="invitation-star" aria-hidden="true">
            ✳
          </span>
          <p className="observatory-label">
            Good things begin with a conversation.
          </p>
          <h2 id="invitation-title">
            What are you
            <br />
            <em>thinking about?</em>
          </h2>
          <Link href="/contact" className="observatory-link">
            Say hello <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </div>
  );
}
