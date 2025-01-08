"use client";

import { getPostBySlug } from '@/lib/blog'
import BlogPost from '@/components/BlogPost'
import { serialize } from 'next-mdx-remote/serialize'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import { use } from 'react'
import { Card } from '@nextui-org/react'
import ReadingProgress from '@/components/ReadingProgress'

type Post = {
  title: string
  date: string
  description: string
  tags: string[]
  image?: string
  content: string
  mdxSource: MDXRemoteSerializeResult
  slug: string
}

export default function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const [postData, setPostData] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPost = async () => {
      try {
        const { slug } = await params;
        const post = await getPostBySlug(slug)
        
        if (!post) {
          notFound()
          return
        }
        
        const mdxSource = await serialize(post.content)
        setPostData({ 
          ...post,
          mdxSource
        })
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
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Card className="p-8 glassmorphism">
          <div className="space-y-4 animate-pulse">
            <div className="w-3/4 h-8 bg-default-200/20 rounded" />
            <div className="w-1/2 h-6 bg-default-200/20 rounded" />
            <div className="aspect-video bg-default-200/20 rounded" />
          </div>
        </Card>
      </div>
    );
  }

  if (!postData) {
    return null
  }

  return (
    <>
      <ReadingProgress />
      <BlogPost
        title={postData.title}
        date={postData.date}
        content={postData.mdxSource}
        tags={postData.tags}
        description={postData.description}
        image={postData.image ?? ''} 
      />
    </>
  )
}