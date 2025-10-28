'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

interface LikeButtonProps {
  slug: string
}

export default function LikeButton({ slug }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(0)
  const [hasLiked, setHasLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchLikes()
    checkIfUserLiked()
  }, [slug])

  const fetchLikes = async () => {
    try {
      const response = await fetch(`/api/likes/${slug}`)
      const data = await response.json()
      setLikes(data.likes || 0)
    } catch (error) {
      console.error('Error fetching likes:', error)
    }
  }

  const checkIfUserLiked = () => {
    const liked = localStorage.getItem(`liked_${slug}`)
    setHasLiked(liked === 'true')
  }

  const handleLike = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/likes/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ increment: !hasLiked }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setLikes(data.likes)
        setHasLiked(!hasLiked)
        localStorage.setItem(`liked_${slug}`, (!hasLiked).toString())
      }
    } catch (error) {
      console.error('Error updating like:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Desktop Version - Sidebar flotante */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col items-center gap-2 bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-2xl p-4 shadow-xl">
          <button
            onClick={handleLike}
            disabled={isLoading}
            className={`group relative transition-all duration-300 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
            aria-label={hasLiked ? 'Unlike post' : 'Like post'}
          >
            <Heart
              className={`w-8 h-8 transition-all duration-300 ${
                hasLiked
                  ? 'fill-red-500 text-red-500'
                  : 'text-neutral-400 group-hover:text-red-400 group-hover:fill-red-400/20'
              }`}
            />
            {!hasLiked && (
              <span className="absolute inset-0 rounded-full bg-red-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
          </button>
          <span className="text-sm font-medium text-neutral-300 tabular-nums">
            {likes}
          </span>
          <span className="text-xs text-neutral-500 text-center max-w-[60px] leading-tight">
            {hasLiked ? 'Liked' : 'Like this'}
          </span>
        </div>
      </div>

      {/* Mobile Version - FAB en esquina inferior izquierda */}
      <div className="fixed bottom-6 left-6 z-50 lg:hidden">
        <button
          onClick={handleLike}
          disabled={isLoading}
          className={`group relative bg-neutral-900/90 backdrop-blur-md border border-neutral-800 rounded-full shadow-2xl transition-all duration-300 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95 hover:shadow-red-500/20'
          }`}
          aria-label={hasLiked ? 'Unlike post' : 'Like post'}
        >
          <div className="flex items-center gap-2 px-4 py-3">
            <Heart
              className={`w-6 h-6 transition-all duration-300 ${
                hasLiked
                  ? 'fill-red-500 text-red-500'
                  : 'text-neutral-400 group-active:text-red-400 group-active:fill-red-400/20'
              }`}
            />
            <span className="text-sm font-semibold text-neutral-300 tabular-nums min-w-[20px] text-center">
              {likes}
            </span>
          </div>
          {/* Glow effect */}
          {hasLiked && (
            <span className="absolute inset-0 rounded-full bg-red-500/30 blur-xl" />
          )}
        </button>
      </div>
    </>
  )
}

