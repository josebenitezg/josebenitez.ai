import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";
import DitherField from "@/components/DitherField";
import {
  capabilities,
  credentials,
  selectedWork,
  siteConfig,
} from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.title,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const latestPosts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <section className="hero-section overflow-hidden border-b border-white/10">
        <DitherField />
        <Container className="relative z-10 grid min-h-[82vh] items-end gap-14 py-20 sm:py-28 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.5fr)] lg:py-32">
          <div className="relative">
            <p className="eyebrow">Applied AI · Computer vision · Infrastructure</p>
            <h1
              className="hero-title mt-7 max-w-5xl text-stone-100"
              aria-label="AI systems for the physical world."
            >
              <span className="block">AI systems for the</span>
              <em className="block">physical world.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-stone-400 sm:text-xl">
              I&apos;m an electrical engineer, founder, and AI operator working
              across computer vision, AI infrastructure, IoT, and applied
              machine learning for unattended retail.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/work" className="button">
                View selected work
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
              <Link href="/contact" className="button button-secondary">
                Start a conversation
              </Link>
            </div>
          </div>
          <div className="border-l border-white/10 pl-6 text-sm leading-7 text-stone-500 lg:mb-3">
            <p>Based in San Francisco.</p>
            <p>Originally from Ybycui, Paraguay.</p>
            <p className="mt-5 text-stone-300">
              Founder & Chief AI Officer at Intuitivo.
            </p>
          </div>
        </Container>
      </section>

      <section aria-label="Selected credentials" className="border-b border-white/10">
        <Container className="grid sm:grid-cols-3">
          {credentials.map((credential, index) => (
            <div
              key={credential.label}
              className={`py-7 sm:px-6 ${
                index > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""
              }`}
            >
              <p className="text-xs uppercase tracking-[0.15em] text-stone-600">
                {credential.label}
              </p>
              <p className="mt-2 text-sm text-stone-300">{credential.value}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Capabilities</p>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.035em] text-stone-100 sm:text-5xl">
                From AI ambition to an operating system.
              </h2>
            </div>
            <Link href="/capabilities" className="text-link">
              See how I can help
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
            {capabilities.map((capability) => (
              <article key={capability.number} className="bg-[#0b0b0b] p-7 sm:p-9">
                <p className="text-xs font-medium text-stone-600">
                  {capability.number}
                </p>
                <h3 className="mt-8 text-2xl font-semibold text-stone-100">
                  {capability.title}
                </h3>
                <p className="mt-4 max-w-xl leading-7 text-stone-400">
                  {capability.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-white/10 bg-white/[0.015] py-24 sm:py-32">
        <Container>
          <p className="eyebrow">Selected work</p>
          <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.035em] text-stone-100 sm:text-5xl">
              Applied systems, documented without theatre.
            </h2>
            <Link href="/work" className="text-link">
              Explore the work
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {selectedWork.map((work) => (
              <Link
                key={work.title}
                href={work.href}
                className="surface group flex min-h-[25rem] flex-col p-7 transition-colors hover:bg-white/[0.05]"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-stone-600">
                  {work.eyebrow}
                </p>
                <h3 className="mt-5 text-3xl font-semibold text-stone-100">
                  {work.title}
                </h3>
                <p className="mt-5 leading-7 text-stone-400">{work.description}</p>
                <ul className="mt-8 space-y-2 text-sm text-stone-500">
                  {work.areas.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-stone-300 group-hover:text-white">
                  View context
                  <ArrowRight aria-hidden="true" size={15} />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-[0.6fr_1.4fr]">
          <div>
            <p className="eyebrow">Writing</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-stone-100">
              Notes from the work.
            </h2>
            <p className="mt-5 max-w-md leading-7 text-stone-400">
              Essays on applied AI, infrastructure, autonomy, technology, and
              the ideas that shape how I build.
            </p>
            <Link href="/writing" className="text-link mt-8">
              Browse all writing
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid gap-3 py-7 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <div>
                  <h3 className="text-xl font-medium text-stone-200 transition-colors group-hover:text-white">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-500">
                      {post.description}
                    </p>
                  )}
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="text-stone-600 transition-colors group-hover:text-stone-200"
                  size={18}
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 py-24 sm:py-32">
        <Container>
          <div className="surface grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow">Conversation</p>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.035em] text-stone-100 sm:text-5xl">
                Building an AI system that has to work in the real world?
              </h2>
              <p className="mt-5 max-w-2xl leading-7 text-stone-400">
                Share the context, the constraint, and the decision you need to
                make. I&apos;ll tell you if my experience is relevant.
              </p>
            </div>
            <Link href="/contact" className="button">
              Get in touch
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
