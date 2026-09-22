import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LikeButton from "@/components/LikeButton";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { renderMarkdownToHtml } from "@/lib/markdown";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  const canonical = `/blog/${slug}`;

  return {
    title: post.title,
    description: post.description || `An essay by ${siteConfig.name}.`,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.title,
      description: post.description || `An essay by ${siteConfig.name}.`,
      publishedTime: post.date,
      authors: [siteConfig.name],
      tags: post.tags.filter(Boolean),
      images: [post.image || "/og.png"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const html = await renderMarkdownToHtml(post.content);
  const formattedDate = new Date(
    post.date.length === 10 ? `${post.date}T00:00:00Z` : post.date,
  ).toLocaleDateString(post.language === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const minutes = Math.max(
    1,
    Math.ceil(post.content.split(/\s+/).length / 220),
  );
  return (
    <article lang={post.language}>
      <Link href="/writing" className="quiet-link text-[13px]" lang="en">
        ← Writing
      </Link>
      <h1 className="title">{post.title}</h1>
      <p className="article-meta">
        <time dateTime={post.date}>{formattedDate}</time> · {minutes} min{" "}
        {post.language === "es" ? "de lectura" : "read"}
      </p>
      <div
        className="article-body prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="mt-12">
        <LikeButton slug={slug} />
      </div>
    </article>
  );
}
