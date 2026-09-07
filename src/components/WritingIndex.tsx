import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
export default function WritingIndex({ posts }: { posts: BlogPost[] }) {
  return (
    <ol className="writing-list">
      {posts.map((post) => (
        <li key={post.slug} lang={post.language}>
          <Link href={`/blog/${post.slug}`} className="writing-entry">
            <div>
              <h2>{post.title}</h2>
              <time dateTime={post.date}>
                {new Date(
                  post.date.length === 10
                    ? `${post.date}T00:00:00Z`
                    : post.date,
                ).toLocaleDateString(
                  post.language === "es" ? "es-ES" : "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    timeZone: "UTC",
                  },
                )}
              </time>
            </div>
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </li>
      ))}
    </ol>
  );
}
