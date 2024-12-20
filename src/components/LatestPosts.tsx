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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card
            key={post.slug}
            isPressable
            as={Link}
            href={`/blog/${post.slug}`}
            className="glassmorphism neural-glow shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            {post.image && (
              <div className="w-full h-48 overflow-hidden">
                <Image
                  src={post.image || '/default-image.jpg'}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="rounded-lg shadow-lg"
                />
              </div>
            )}
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-xl font-semibold">{post.title}</p>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-default-500">{post.description}</p>
            </CardBody>
            <CardFooter className="flex justify-between">
              <span className="text-sm text-default-400">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="text-success">Read more →</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
} 