import { Metadata } from 'next'

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> | { slug: string }
}): Promise<Metadata> {
  const resolvedParams = await params
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${resolvedParams.slug}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    )
    const post = await response.json()
    
    if (!response.ok) {
      return {
        title: 'Post Not Found',
        description: 'The post you are looking for does not exist.'
      }
    }

    return {
      title: post.title,
      description: post.description,
      openGraph: {
        images: post.image ? [post.image] : [],
      },
    }
  } catch {
    return {
      title: 'Post Not Found',
      description: 'The post you are looking for does not exist.'
    }
  }
} 