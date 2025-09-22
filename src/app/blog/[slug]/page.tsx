import { getAllSlugs, getPostBySlug } from '@/lib/blog'
import { renderMarkdownToHtml } from '@/lib/markdown'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    return { title: 'Post Not Found' }
  }
  return {
    title: post.title,
    description: post.description,
    openGraph: { images: post.image ? [post.image] : [] },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return null

  const html = await renderMarkdownToHtml(post.content)

  return (
    <article className="max-w-3xl mx-auto py-10 px-4">
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight [font-family:var(--font-serif)]">{post.title}</h1>
        <p className="text-neutral-400 mt-3 text-lg">{post.description}</p>
        <time className="text-sm text-neutral-500 mt-4 block">
          {new Date(post.date.length === 10 ? `${post.date}T00:00:00` : post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
      </header>
      <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}