import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
    post.date.length === 10 ? `${post.date}T00:00:00` : post.date,
  ).toLocaleDateString(post.language === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <article
        className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-24"
        lang={post.language}
      >
        <Link href="/writing" className="text-link">
          <ArrowLeft aria-hidden="true" size={14} />
          All writing
        </Link>
        <header className="mt-12 border-b border-white/10 pb-10">
          <h1 className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-stone-100 sm:text-6xl">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-5 text-lg leading-8 text-stone-400">
              {post.description}
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.12em] text-stone-600">
            <time dateTime={post.date}>{formattedDate}</time>
            <span aria-hidden="true">·</span>
            <span>
              {post.series === "physical-ai" ? "Physical AI" : "Correlations"}
            </span>
            <span aria-hidden="true">·</span>
            <span>{siteConfig.name}</span>
          </div>
        </header>
        <div
          className="prose prose-invert mt-12 max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
      <LikeButton slug={slug} />
    </>
  );
}
