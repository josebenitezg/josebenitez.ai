import type { Metadata } from "next";
import Container from "@/components/Container";
import PageIntro from "@/components/PageIntro";
import NextRoom from "@/components/NextRoom";
import WritingIndex from "@/components/WritingIndex";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Writing by José Benítez on Physical AI and its correlations across compute, energy, infrastructure, and model shifts.",
  alternates: {
    canonical: "/writing",
  },
};

export default async function WritingPage() {
  const posts = await getAllPosts();

  return (
    <>
      <PageIntro
        number="02"
        eyebrow="Field notes"
        title={
          <>
            Following
            <br />
            <em>the threads.</em>
          </>
        }
        description="Notes on physical AI and the forces around it. Perception, compute, energy, and the connections that are easy to miss."
        study={1}
        annotation="Separate observations. Connected ideas."
      />
      <Container className="room-content">
        <WritingIndex posts={posts} />
      </Container>
      <NextRoom
        href="/about"
        number="03"
        label="About"
        title="Meet the person taking notes."
      />
    </>
  );
}
