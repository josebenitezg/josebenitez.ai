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
      <PageIntro title="Writing." study={1} />
      <Container className="room-content">
        <WritingIndex posts={posts} />
      </Container>
      <NextRoom href="/about" title="About me" />
    </>
  );
}
