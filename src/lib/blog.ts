export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  content: string
  tags: string[]
  image?: string
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch('/api/posts')
    if (!response.ok) throw new Error('Failed to fetch posts')
    return response.json()
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`/api/posts/${slug}`)
    if (!response.ok) return null
    return response.json()
  } catch {
    return null
  }
} 