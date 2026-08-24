import type { Metadata } from "next";
import Container from "@/components/Container";
import PageIntro from "@/components/PageIntro";
import WritingIndex from "@/components/WritingIndex";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Field notes",
  description:
    "Field notes by José Benítez on Physical AI, computer vision, inference infrastructure, autonomy, and real-world system performance.",
  alternates: {
    canonical: "/writing",
  },
};

export default async function WritingPage() {
  const posts = await getAllPosts();

  return (
    <>
      <PageIntro
        eyebrow="Field notes"
        title="Notes from the physical world."
        description="Technical notes on building Physical AI systems across perception, inference infrastructure, autonomy, and operations."
      />
      <Container className="py-16 sm:py-24">
        <WritingIndex posts={posts} />
      </Container>
    </>
  );
}
