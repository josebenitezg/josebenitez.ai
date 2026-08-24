import type { Metadata } from "next";
import Container from "@/components/Container";
import PageIntro from "@/components/PageIntro";
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
        eyebrow="Physical AI · Correlations"
        title="Systems, and the forces around them."
        description="Writing on Physical AI in practice, plus correlations across compute, energy, infrastructure, and model shifts."
      />
      <Container className="py-16 sm:py-24">
        <WritingIndex posts={posts} />
      </Container>
    </>
  );
}
