import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

type RouteContext = {
  params: Promise<{ slug: string }>
}

// GET: Obtener el número de likes de un post
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const { slug } = await context.params
  
  try {
    const supabase = await createClient()
    
    // Intentar obtener el post
    const { data, error } = await supabase
      .from('post_likes')
      .select('likes')
      .eq('slug', slug)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 es el código de "no rows returned"
      throw error
    }

    return NextResponse.json({ likes: data?.likes || 0 })
  } catch (error) {
    console.error('Error fetching likes:', error)
    return NextResponse.json({ likes: 0 }, { status: 500 })
  }
}

// POST: Incrementar o decrementar likes
export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  const { slug } = await context.params
  
  try {
    const body = await request.json()
    const { increment } = body

    const supabase = await createClient()

    // Primero intentar obtener el registro actual
    const { data: existingData } = await supabase
      .from('post_likes')
      .select('likes')
      .eq('slug', slug)
      .single()

    let newLikes: number

    if (existingData) {
      // Si existe, actualizar
      newLikes = increment
        ? existingData.likes + 1
        : Math.max(0, existingData.likes - 1)

      const { error } = await supabase
        .from('post_likes')
        .update({ likes: newLikes, updated_at: new Date().toISOString() })
        .eq('slug', slug)

      if (error) throw error
    } else {
      // Si no existe, crear
      newLikes = increment ? 1 : 0

      const { error } = await supabase
        .from('post_likes')
        .insert({ slug, likes: newLikes })

      if (error) throw error
    }

    return NextResponse.json({ likes: newLikes })
  } catch (error) {
    console.error('Error updating likes:', error)
    return NextResponse.json(
      { error: 'Failed to update likes' },
      { status: 500 }
    )
  }
}

