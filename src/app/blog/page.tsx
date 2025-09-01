import { getAllPosts, type BlogPost } from '@/lib/blog'
import Image from 'next/image'
import Link from 'next/link'

export default async function BlogIndex() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold tracking-tight [font-family:var(--font-serif)] mb-10">Blog</h1>
      <ul className="divide-y divide-white/10">
        {posts.map((post: BlogPost) => (
          <li key={post.slug} className="py-5">
            <Link href={`/blog/${post.slug}`} className="group block">
              <h2 className="text-xl font-medium group-hover:underline underline-offset-4">
                {post.title}
              </h2>
              {post.description && (
                <p className="text-sm text-neutral-400 mt-1 line-clamp-2">{post.description}</p>
              )}
              <time className="text-xs text-neutral-500 mt-2 block">
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}