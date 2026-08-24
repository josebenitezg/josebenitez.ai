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
    title: "Systems in the physical world.",
    description:
      "Perception, autonomy, inference, and the operating constraints that separate production systems from demos.",
  },
  {
    id: "correlations",
    eyebrow: "Correlations",
    title: "The forces around intelligent systems.",
    description:
      "Connections across compute, energy, infrastructure, and model shifts that shape what Physical AI can become.",
  },
];

export default function WritingIndex({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="space-y-20 sm:space-y-28">
      {series.map((group) => {
        const groupedPosts = posts.filter((post) => post.series === group.id);

        if (groupedPosts.length === 0) return null;

        return (
          <section key={group.id} aria-labelledby={`${group.id}-heading`}>
            <div className="mb-9 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-[0.7fr_1.3fr] sm:gap-10">
              <p className="eyebrow">{group.eyebrow}</p>
              <div>
                <h2
                  id={`${group.id}-heading`}
                  className="text-3xl font-semibold tracking-[-0.03em] text-stone-100 sm:text-4xl"
                >
                  {group.title}
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-stone-400">
                  {group.description}
                </p>
              </div>
            </div>

            <ol className="divide-y divide-white/10 border-y border-white/10">
              {groupedPosts.map((post) => {
                const tags = post.tags.filter(Boolean).slice(0, 3);

                return (
                  <li key={post.slug} lang={post.language}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group grid gap-5 py-8 sm:grid-cols-[8rem_1fr_auto] sm:items-start"
                    >
                      <time
                        dateTime={post.date}
                        className="text-xs uppercase tracking-[0.12em] text-stone-600"
                      >
                        {new Date(
                          post.date.length === 10
                            ? `${post.date}T00:00:00`
                            : post.date,
                        ).toLocaleDateString(
                          post.language === "es" ? "es-ES" : "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </time>
                      <div>
                        <h3 className="text-2xl font-medium tracking-[-0.02em] text-stone-200 transition-colors group-hover:text-white">
                          {post.title}
                        </h3>
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
          </section>
        );
      })}
    </div>
  );
}
