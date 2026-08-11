import { readFile, readdir } from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  tags: string[];
  image?: string;
}

type PostFrontmatter = {
  title?: unknown;
  date?: unknown;
  description?: unknown;
  tags?: unknown;
  image?: unknown;
};

const postsDirectory = path.join(process.cwd(), "content/posts");

function parsePost(
  slug: string,
  content: string,
  data: PostFrontmatter,
): BlogPost {
  return {
    slug,
    content,
    title: typeof data.title === "string" ? data.title : "Untitled",
    date:
      typeof data.date === "string"
        ? data.date
        : new Date(0).toISOString(),
    description: typeof data.description === "string" ? data.description : "",
    tags: Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    image:
      typeof data.image === "string" && data.image.length > 0
        ? data.image
        : undefined,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const fileNames = await readdir(postsDirectory);
    const posts = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.mdx$/, "");
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = await readFile(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          return parsePost(slug, content, data);
        }),
    );

    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = await readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return parsePost(slug, content, data);
  } catch {
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const fileNames = await readdir(postsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => fileName.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}
