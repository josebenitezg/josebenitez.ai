import { readFile, readdir } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  content: string
  tags: string[]
  image?: string
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const fileNames = await readdir(postsDirectory)
    const posts = await Promise.all(
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
            title: (data as any).title || 'Untitled',
            date: (data as any).date || new Date().toISOString(),
            description: (data as any).description || '',
            tags: (data as any).tags || [],
            image: (data as any).image,
          } as BlogPost
        })
    )

    return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = await readFile(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      title: (data as any).title || 'Untitled',
      date: (data as any).date || new Date().toISOString(),
      description: (data as any).description || '',
      tags: (data as any).tags || [],
      image: (data as any).image,
    } as BlogPost
  } catch {
    return null
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const fileNames = await readdir(postsDirectory)
    return fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => fileName.replace(/\.mdx$/, ''))
  } catch {
    return []
  }
}