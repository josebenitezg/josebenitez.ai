"use client";

import { getAllPosts, type BlogPost } from '@/lib/blog'
import { Card, Chip, Link } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Image from 'next/image';

export default function BlogIndex() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await getAllPosts()
      setPosts(allPosts)
    }
    loadPosts()
  }, [])

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-6">
        {posts.map((post: BlogPost) => (
          <Card 
            key={post.slug}
            as={Link}
            href={`/blog/${post.slug}`}
            className="p-6 glassmorphism neural-glow hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex gap-6">
              {post.image && (
                <div className="w-48 h-32 rounded-lg overflow-hidden shrink-0">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-default-500 mb-4">{post.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {post.tags.map((tag: string) => (
                      <Chip 
                        key={tag} 
                        color="success" 
                        variant="flat" 
                        size="sm"
                        className="capitalize"
                      >
                        {tag}
                      </Chip>
                    ))}
                  </div>
                  <time className="text-default-500 text-sm">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}