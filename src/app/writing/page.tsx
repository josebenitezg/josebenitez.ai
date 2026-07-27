import type { Metadata } from "next";
import Container from "@/components/Container";
import PageIntro from "@/components/PageIntro";
import WritingIndex from "@/components/WritingIndex";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes by José Benítez on applied AI, computer vision, infrastructure, autonomy, technology, and the ideas behind the work.",
  alternates: {
    canonical: "/writing",
  },
};

export default async function WritingPage() {
  const posts = await getAllPosts();

  return (
    <>
      <PageIntro
        eyebrow="Writing"
        title="Thinking in public."
        description="Technical notes and personal essays on building AI systems, understanding autonomy, and learning through the work."
      />
      <Container className="py-16 sm:py-24">
        <WritingIndex posts={posts} />
      </Container>
    </>
  );
}
