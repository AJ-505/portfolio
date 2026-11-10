import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parseFrontmatter, slugFromPath } from "../src/blog/frontmatter.mjs";
import {
  BLOG_INDEX_META,
  HOME_META,
  SITE_NAME,
  postMeta,
} from "../src/blog/seo.mjs";

const META_MARKER = "<!-- meta:tags -->";
const SITE_URL = (
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://abasiono-mbat-portfolio.vercel.app")
).replace(/\/+$/, "");

/**
 * @param {string} value
 * @returns {string}
 */
function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * @param {number} count
 * @param {string} route
 * @param {string} label
 */
function expectOnce(count, route, label) {
  if (count !== 1) {
    throw new Error(`${route}: expected one ${label} tag, found ${count}`);
  }
}

/**
 * @param {string} html
 * @param {string} route
 */
function assertHead(html, route) {
  const count = (pattern) => (html.match(pattern) ?? []).length;
  expectOnce(count(/<title>/g), route, "title");
  expectOnce(count(/<meta name="description"/g), route, "description");
  expectOnce(count(/<link rel="canonical"/g), route, "canonical");
  expectOnce(count(/<meta property="og:title"/g), route, "og:title");
  expectOnce(count(/<meta property="og:description"/g), route, "og:description");
  expectOnce(count(/<meta property="og:url"/g), route, "og:url");
  expectOnce(count(/<meta name="twitter:title"/g), route, "twitter:title");
  expectOnce(
    count(/<meta name="twitter:description"/g),
    route,
    "twitter:description",
  );
  if (html.includes(META_MARKER)) {
    throw new Error(`${route}: meta marker was not replaced`);
  }
}

/**
 * @param {{ title: string, description: string, url: string, type: "website" | "article", publishedTime?: string }} meta
 * @returns {string}
 */
function renderTags({ title, description, url, type, publishedTime }) {
  const tags = [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:site" content="@Abasiono_Mbat" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  ];

  if (publishedTime) {
    tags.push(
      `<meta property="article:published_time" content="${escapeHtml(publishedTime)}" />`,
    );
  }

  return tags.join("\n    ");
}

/**
 * @param {string} template
 * @param {{ title: string, description: string, url: string, type: "website" | "article", publishedTime?: string }} meta
 * @returns {string}
 */
function renderPage(template, meta) {
  if (!template.includes(META_MARKER)) {
    throw new Error(`index.html is missing the ${META_MARKER} marker`);
  }

  return template
    .replace(
      /<title>[\s\S]*?<\/title>/,
      () => `<title>${escapeHtml(meta.title)}</title>`,
    )
    .replace(META_MARKER, () => renderTags(meta));
}

/**
 * @param {string} root
 * @returns {Promise<Array<{ slug: string, title: string, description: string, date: string }>>}
 */
async function readPosts(root) {
  const directory = path.join(root, "src/content/posts");
  const files = (await readdir(directory)).filter((file) =>
    file.endsWith(".md"),
  );

  const posts = [];
  for (const file of files) {
    const raw = await readFile(path.join(directory, file), "utf8");
    const { meta } = parseFrontmatter(raw);
    posts.push({
      slug: slugFromPath(file),
      title: meta.title ?? "Untitled",
      description: meta.description ?? "",
      date: meta.date ?? "",
    });
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * @param {{ root?: string, outDir?: string }} [options]
 * @returns {Promise<void>}
 */
export async function prerenderMeta({ root = process.cwd(), outDir = "dist" } = {}) {
  const templatePath = path.join(root, outDir, "index.html");
  const template = await readFile(templatePath, "utf8");
  const posts = await readPosts(root);

  const routes = [
    { path: "", ...HOME_META, type: "website" },
    { path: "blog", ...BLOG_INDEX_META, type: "website" },
    ...posts.map((post) => ({
      path: `blog/${post.slug}`,
      ...postMeta(post),
      type: "article",
      publishedTime: post.date,
    })),
  ];

  for (const route of routes) {
    const url = route.path ? `${SITE_URL}/${route.path}` : `${SITE_URL}/`;
    const html = renderPage(template, { ...route, url });
    const label = route.path || "/";
    assertHead(html, label);

    const file = route.path
      ? path.join(root, outDir, route.path, "index.html")
      : templatePath;
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
    console.log(`prerendered ${label}`);
  }
}

const isDirectRun =
  process.argv[1] !== undefined &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isDirectRun) {
  prerenderMeta({
    root: process.cwd(),
    outDir: process.env.OUT_DIR ?? "dist",
  }).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
