import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

export default function WritingIndex({ posts }: { posts: BlogPost[] }) {
  return (
    <ol className="divide-y divide-white/10 border-y border-white/10">
      {posts.map((post) => {
        const tags = post.tags.filter(Boolean).slice(0, 3);

        return (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group grid gap-5 py-8 sm:grid-cols-[8rem_1fr_auto] sm:items-start"
            >
              <time
                dateTime={post.date}
                className="text-xs uppercase tracking-[0.12em] text-stone-600"
              >
                {new Date(
                  post.date.length === 10 ? `${post.date}T00:00:00` : post.date,
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <div>
                <h2 className="text-2xl font-medium tracking-[-0.02em] text-stone-200 transition-colors group-hover:text-white">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="mt-3 max-w-2xl leading-7 text-stone-500">
                    {post.description}
                  </p>
                )}
                {tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-stone-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <ArrowUpRight
                aria-hidden="true"
                className="text-stone-600 transition-colors group-hover:text-stone-200"
                size={18}
              />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
