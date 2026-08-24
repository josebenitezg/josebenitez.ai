import type { NextConfig } from "next";

const personalRedirects = [
  { source: "/lab", destination: "https://joselo.blog/lab", permanent: true },
  {
    source: "/biohacking",
    destination: "https://joselo.blog/lab",
    permanent: true,
  },
  {
    source: "/blog/do-it-anyway",
    destination: "https://joselo.blog/do-it-anyway",
    permanent: true,
  },
  {
    source: "/blog/marco-existencial",
    destination: "https://joselo.blog/marco-existencial",
    permanent: true,
  },
  {
    source: "/blog/hello-world",
    destination: "https://joselo.blog/hello-world",
    permanent: true,
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    if (process.env.JOSELO_BLOG_REDIRECTS_ENABLED !== "true") {
      return [];
    }

    return personalRedirects;
  },
};

export default nextConfig;
