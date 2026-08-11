"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface LikeButtonProps {
  slug: string;
}

type LikesResponse = {
  likes?: number;
  available?: boolean;
};

export default function LikeButton({ slug }: LikeButtonProps) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadLikes() {
      try {
        const response = await fetch(`/api/likes/${slug}`);
        const data = (await response.json()) as LikesResponse;

        if (isActive) {
          setLikes(typeof data.likes === "number" ? data.likes : 0);
          setIsAvailable(data.available !== false);
          setHasLiked(localStorage.getItem(`liked_${slug}`) === "true");
        }
      } catch {
        if (isActive) {
          setIsAvailable(false);
        }
      }
    }

    void loadLikes();

    return () => {
      isActive = false;
    };
  }, [slug]);

  async function handleLike() {
    if (isLoading || !isAvailable) return;

    setIsLoading(true);

    try {
      const nextHasLiked = !hasLiked;
      const response = await fetch(`/api/likes/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ increment: nextHasLiked }),
      });
      const data = (await response.json()) as LikesResponse;

      if (response.ok && typeof data.likes === "number") {
        setLikes(data.likes);
        setHasLiked(nextHasLiked);
        localStorage.setItem(`liked_${slug}`, String(nextHasLiked));
      } else if (data.available === false) {
        setIsAvailable(false);
      }
    } catch {
      setIsAvailable(false);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isAvailable) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl px-5 pb-20 sm:px-8">
      <button
        type="button"
        onClick={handleLike}
        disabled={isLoading}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-stone-400 transition-colors hover:border-white/20 hover:text-stone-100 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={hasLiked ? "Remove like from post" : "Like this post"}
        aria-pressed={hasLiked}
      >
        <Heart
          aria-hidden="true"
          size={17}
          className={hasLiked ? "fill-red-400 text-red-400" : ""}
        />
        <span>{hasLiked ? "Liked" : "Like"}</span>
        <span aria-label={`${likes} likes`} className="text-stone-600">
          {likes}
        </span>
      </button>
    </div>
  );
}
