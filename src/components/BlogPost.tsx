"use client";

import React from 'react'
import { MDXRemote } from 'next-mdx-remote'
import { Card, Chip } from '@nextui-org/react'

type BlogPostProps = {
  title: string
  date: string
  content: any
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
            <img 
              src={image} 
              alt={title}
              className="w-full h-[300px] object-cover"
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