"use client";

import React from 'react'
import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote/rsc'
import { Card, Chip, Button } from '@nextui-org/react'
import Image from 'next/image';
import StaticTweet from './Tweet'
import Link from 'next/link'
import { ClipboardIcon } from '@heroicons/react/24/outline'

// Define the components that will be available in MDX
const components = {
  Image: (props: any) => (
    <div className="my-6">
      <Image
        {...props}
        style={{ maxWidth: '100%', height: 'auto' }}
        alt={props.alt || 'Blog image'}
      />
    </div>
  ),
  StaticTweet,
  // Add custom heading styles
  h1: (props: any) => (
    <h1 {...props} className="text-3xl md:text-4xl font-bold mt-8 mb-4" />
  ),
  h2: (props: any) => (
    <h2 {...props} className="text-2xl md:text-3xl font-bold mt-8 mb-4" />
  ),
  h3: (props: any) => (
    <h3 {...props} className="text-xl md:text-2xl font-bold mt-6 mb-3" />
  ),
  // Add custom code block styling
  pre: (props: any) => (
    <div className="relative group">
      <pre {...props} className="rounded-lg p-4 bg-black/50 overflow-x-auto" />
      <button
        onClick={() => {
          navigator.clipboard.writeText(props.children.props.children);
        }}
        className="absolute top-2 right-2 p-2 rounded-lg bg-default-100/10 
                   opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        <ClipboardIcon className="w-4 h-4" />
      </button>
    </div>
  ),
  // Enhance link styling
  a: (props: any) => (
    <Link
      {...props}
      className="text-success hover:underline decoration-2 underline-offset-2"
    />
  ),
}

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
    <article className="max-w-4xl mx-auto py-8 px-4 md:px-8">
      <Card className="p-4 md:p-8 glassmorphism">
        {/* Hero Section */}
        <div className="mb-8">
          {image && (
            <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
              <Image 
                src={image} 
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          
          {/* Title and Meta */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {title}
            </h1>
            
            {description && (
              <p className="text-lg md:text-xl text-default-500 leading-relaxed">
                {description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 border-y border-default-200/20">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
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
              <time className="text-default-500 text-sm ml-auto">
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-green max-w-none">
          <MDXRemote {...content} components={components} />
        </div>

        {/* Share and Navigation */}
        <div className="mt-12 pt-6 border-t border-default-200/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="flat"
                color="success"
                onClick={() => {
                  navigator.share({
                    title,
                    text: description,
                    url: window.location.href,
                  }).catch(() => {
                    navigator.clipboard.writeText(window.location.href);
                  });
                }}
              >
                Share Post
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-default-500">
              <Link href="/blog" className="hover:text-success transition-colors">
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </article>
  )
}