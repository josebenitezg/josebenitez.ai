import type { Metadata } from "next";
import PostList from "@/components/PostList";
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
      <h1 className="title">Writing</h1>
      <div className="section !mt-12">
        <PostList posts={posts} />
      </div>
    </>
  );
}
