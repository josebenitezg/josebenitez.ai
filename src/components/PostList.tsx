import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export default function PostList({ posts }: { posts: BlogPost[] }) {
  return (
    <ul className="list">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`} className="row">
            <span className="row-title" lang={post.language}>
              {post.title}
            </span>
            <time className="row-meta" dateTime={post.date}>
              {post.date.slice(0, 4)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
