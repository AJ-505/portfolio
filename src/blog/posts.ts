import { marked } from "marked";
import {
  parseFrontmatter,
  parseTags,
  slugFromPath,
} from "./frontmatter.mjs";

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  /** Raw markdown body, without frontmatter */
  body: string;
  readingMinutes: number;
}

// Import markdown files as raw strings at build time
const modules = import.meta.glob("../content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const posts: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { meta, body } = parseFrontmatter(raw);
    const words = body.split(/\s+/).length;
    return {
      slug: slugFromPath(path),
      title: meta.title ?? "Untitled",
      date: meta.date ?? "",
      description: meta.description ?? "",
      tags: parseTags(meta.tags),
      body,
      readingMinutes: body ? Math.max(1, Math.round(words / 200)) : 0,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function renderMarkdown(body: string): string {
  return marked.parse(body, { async: false });
}

export { formatDate };
