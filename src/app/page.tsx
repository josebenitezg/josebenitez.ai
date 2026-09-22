import type { Metadata } from "next";
import Link from "next/link";
import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default async function Home() {
  const posts = (await getAllPosts()).slice(0, 4);
  return (
    <>
      <h1 className="title">I build AI for the physical world.</h1>
      <p className="lede">
        Founder &amp; Chief Product Officer at Intuitivo. Electrical engineer,
        based in San Francisco.
      </p>

      <section className="section" aria-labelledby="writing-title">
        <h2 id="writing-title" className="section-title">
          Writing
        </h2>
        <PostList posts={posts} />
        <Link href="/writing" className="quiet-link mt-3 inline-block text-[13px]">
          All writing →
        </Link>
      </section>
    </>
  );
}
