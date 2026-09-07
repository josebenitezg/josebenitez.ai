import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import LikeButton from "@/components/LikeButton";
import Container from "@/components/Container";
import SignalStudy from "@/components/SignalStudy";
import NextRoom from "@/components/NextRoom";
import { getAllPosts, getAllSlugs, getPostBySlug } from "@/lib/blog";
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

  const posts = await getAllPosts();
  const nextPost = posts.find(
    (candidate) => candidate.slug !== slug && candidate.series === post.series,
  );
  const minutes = Math.max(
    1,
    Math.ceil(post.content.split(/\s+/).length / 220),
  );
  return (
    <>
      <article lang={post.language}>
        <header className="reading-header">
          <Container>
            <nav
              className="reading-breadcrumb"
              aria-label="Breadcrumb"
              lang="en"
            >
              <Link href="/writing">
                <ArrowLeft aria-hidden="true" size={13} />
                All writing
              </Link>
              <span aria-hidden="true">/</span>
              <span>
                {post.series === "physical-ai" ? "Physical AI" : "Correlations"}
              </span>
            </nav>
            <div className="reading-heading-grid">
              <div>
                <h1>{post.title}</h1>
                {post.description && (
                  <p className="reading-deck">{post.description}</p>
                )}
              </div>
              <SignalStudy variant={1} className="reading-stamp" />
            </div>
          </Container>
        </header>
        <Container className="reading-layout">
          <aside className="reading-margin">
            <time dateTime={post.date}>{formattedDate}</time>
            <span className="reading-author">{siteConfig.name}</span>
            <span className="reading-time">
              {minutes} min {post.language === "es" ? "de lectura" : "read"}
            </span>
            <Link href="/writing" className="reading-back" lang="en">
              <ArrowLeft size={12} aria-hidden="true" />
              Back to field notes
            </Link>
          </aside>
          <div className="reading-body">
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <p className="reading-end" aria-hidden="true">
              ✳
            </p>
            <LikeButton slug={slug} />
          </div>
        </Container>
      </article>
      {nextPost ? (
        <NextRoom href={`/blog/${nextPost.slug}`} title={nextPost.title} />
      ) : (
        <NextRoom href="/writing" title="More things to think about." />
      )}
    </>
  );
}
