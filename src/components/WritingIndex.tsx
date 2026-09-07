import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost, WritingSeries } from "@/lib/blog";
const series: Array<{
  id: WritingSeries;
  eyebrow: string;
  title: string;
  description: string;
}> = [
  {
    id: "physical-ai",
    eyebrow: "Physical AI",
    title: "When intelligence meets matter.",
    description:
      "Perception, autonomy, inference, and what it takes for a system to work in the physical world.",
  },
  {
    id: "correlations",
    eyebrow: "Correlations",
    title: "Things that connect.",
    description:
      "Compute, energy, infrastructure, and the model shifts changing what becomes possible.",
  },
];
export default function WritingIndex({ posts }: { posts: BlogPost[] }) {
  return (
    <div>
      {series.map((group) => {
        const groupedPosts = posts.filter((post) => post.series === group.id);
        if (!groupedPosts.length) return null;
        return (
          <section
            key={group.id}
            className="writing-shelf"
            aria-labelledby={`${group.id}-heading`}
          >
            <div className="shelf-heading">
              <p className="observatory-label">{group.eyebrow}</p>
              <h2 id={`${group.id}-heading`}>{group.title}</h2>
              <p>{group.description}</p>
            </div>
            <ol className="writing-list">
              {groupedPosts.map((post) => (
                <li key={post.slug} lang={post.language}>
                  <Link href={`/blog/${post.slug}`} className="writing-entry">
                    <div>
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
                      <h3>{post.title}</h3>
                      {post.description && (
                        <p className="writing-summary">{post.description}</p>
                      )}
                      <div className="writing-tags">
                        {post.tags
                          .filter(Boolean)
                          .slice(0, 3)
                          .map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                      </div>
                    </div>
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
