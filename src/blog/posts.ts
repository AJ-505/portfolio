import { marked } from "marked";

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

function parseFrontmatter(
  raw: string,
): { meta: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { meta: {}, body: raw };

  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) meta[key] = value;
  }
  return { meta, body: raw.slice(match[0].length).trim() };
}

function parseTags(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((t) => t.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

/** "2026-09-08-the-ease-paradox.md" -> "the-ease-paradox" */
function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

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
