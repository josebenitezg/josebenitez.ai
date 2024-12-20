import { readFile } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost } from '@/lib/blog'
import { NextRequest } from 'next/server'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    
    if (!post) {
      return new Response(null, { status: 404 });
    }

    return Response.json(post);
  } catch (error: unknown) {
    console.error('Error fetching post:', error);
    return new Response('Error fetching post', { status: 500 });
  }
}

async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
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
}
