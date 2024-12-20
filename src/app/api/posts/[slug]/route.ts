import { readFile } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'
import { BlogPost } from '@/lib/blog'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  const resolvedParams = await params
  try {
    const fullPath = path.join(postsDirectory, `${resolvedParams.slug}.mdx`)
    const fileContents = await readFile(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return NextResponse.json({
      slug: resolvedParams.slug,
      content,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      description: data.description || '',
      tags: data.tags || [],
      image: data.image,
    } as BlogPost)
  } catch (error) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }
} 