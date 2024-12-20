"use client";

import { getPostBySlug } from '@/lib/blog'
import BlogPost from '@/components/BlogPost'
import { serialize } from 'next-mdx-remote/serialize'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> | { slug: string }
}) {
  const [postData, setPostData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPost = async () => {
      const resolvedParams = await params
      try {
        const post = await getPostBySlug(resolvedParams.slug)
        if (!post) {
          notFound()
          return
        }
        const mdxSource = await serialize(post.content)
        setPostData({ ...post, mdxSource })
      } catch (error) {
        console.error('Error loading post:', error)
        notFound()
      } finally {
        setIsLoading(false)
      }
    }
    loadPost()
  }, [params])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!postData) {
    return null
  }

  return (
    <BlogPost
      title={postData.title}
      date={postData.date}
      content={postData.mdxSource}
      tags={postData.tags}
      description={postData.description}
      image={postData.image}
    />
  )
}