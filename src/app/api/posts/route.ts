import { readFile, readdir } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'
import { BlogPost } from '@/lib/blog'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export async function GET() {
  try {
    const fileNames = await readdir(postsDirectory)
    const allPostsData = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.mdx$/, '')
          const fullPath = path.join(postsDirectory, fileName)
          const fileContents = await readFile(fullPath, 'utf8')
          const { data, content } = matter(fileContents)

          return {
            slug,
            content,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            description: data.description || '',
            tags: data.tags || [],
            image: data.image,
          } as BlogPost
        })
    )

    return NextResponse.json(
      allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
    )
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
} 