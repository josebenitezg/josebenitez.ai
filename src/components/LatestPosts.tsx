"use client";

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Link } from "@nextui-org/react"
import { BlogPost } from '@/lib/blog'
import Image from 'next/image';

export default function LatestPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts')
        if (!response.ok) throw new Error('Failed to fetch posts')
        const data = await response.json()
        setPosts(data.slice(0, 2)) // Get only the latest 2 posts
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()
  }, [])

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">Latest Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Card
            key={post.slug}
            isPressable
            as={Link}
            href={`/blog/${post.slug}`}
            className="glassmorphism shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] w-full md:max-w-sm"
          >
            {post.image && (
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={post.image || '/default-image.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            <CardHeader className="pb-2">
              <h3 className="text-lg font-semibold">{post.title}</h3>
            </CardHeader>
            <CardBody className="py-2">
              <p className="text-default-500 text-sm line-clamp-2">{post.description}</p>
            </CardBody>
            <CardFooter className="flex justify-between pt-2">
              <span className="text-xs text-default-400">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="text-success text-sm">Read more →</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
} 