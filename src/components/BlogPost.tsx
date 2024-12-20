"use client";

import React from 'react'
import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote/rsc'
import { Card, Chip } from '@nextui-org/react'
import Image from 'next/image';

interface BlogPostProps {
  title: string
  date: string
  content: MDXRemoteSerializeResult
  tags: string[]
  description?: string
  image?: string
}

export default function BlogPost({ 
  title, 
  date, 
  content, 
  tags,
  description,
  image 
}: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto py-8">
      <Card className="p-6 glassmorphism neural-glow">
        {image && (
          <div className="mb-6 rounded-lg overflow-hidden">
            <Image 
              src={image || '/default-image.jpg'} 
              alt={title}
              width={800}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        )}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          {description && (
            <p className="text-default-500 text-lg mb-4">{description}</p>
          )}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <Chip 
                  key={tag} 
                  color="success" 
                  variant="flat"
                  className="capitalize"
                >
                  {tag}
                </Chip>
              ))}
            </div>
            <time className="text-default-500">
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </div>
        <div className="prose prose-invert prose-green max-w-none">
          <MDXRemote {...content} />
        </div>
      </Card>
    </article>
  )
}