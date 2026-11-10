import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:5183";
const SITE_ORIGIN = (
  process.env.SITE_URL ?? "https://abasiono-mbat-portfolio.vercel.app"
).replace(/\/+$/, "");
const EXPECT_STATIC = process.env.EXPECT_STATIC_META === "1";

const cases = [
  {
    path: "/",
    url: `${SITE_ORIGIN}/`,
    title: "Abasiono Mbat | AI-Native Software Engineer",
    description:
      "AI-native software engineer. CS student at Pan-Atlantic University, Lagos. I build AI-powered products and ship them fast with teams.",
    type: "website",
    static: true,
  },
  {
    path: "/blog",
    url: `${SITE_ORIGIN}/blog`,
    title: "Writing | Abasiono Mbat",
    description: "Essays and notes on things I can't stop thinking about.",
    type: "website",
    static: true,
  },
  {
    path: "/blog/the-ease-paradox",
    url: `${SITE_ORIGIN}/blog/the-ease-paradox`,
    title: "The Ease Paradox | Abasiono Mbat's Blog",
    description: "Why making things easy can make things hard",
    type: "article",
    publishedTime: "2026-09-08",
    static: true,
  },
  {
    path: "/blog/does-not-exist",
    title: "Not found | Abasiono Mbat",
    description: "Nothing lives at /blog/does-not-exist.",
    static: false,
  },
];

let failures = 0;
const check = (label, passed, detail = "") => {
  if (passed) {
    console.log(`ok    ${label}`);
    return;
  }
  failures += 1;
  console.log(`FAIL  ${label}${detail ? ` — ${detail}` : ""}`);
};

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

async function checkStaticHead(testCase) {
  const fetchPath = testCase.path === "/" ? "/" : `${testCase.path}/`;
  const html = await (await fetch(`${BASE}${fetchPath}`)).text();
  const title = escapeHtml(testCase.title);
  const description = escapeHtml(testCase.description);
  const url = escapeHtml(testCase.url);
  const count = (pattern) => (html.match(pattern) ?? []).length;

  check(
    `${testCase.path}: static title`,
    html.includes(`<title>${title}</title>`),
  );
  check(
    `${testCase.path}: static description`,
    html.includes(`<meta name="description" content="${description}"`),
  );
  check(
    `${testCase.path}: one static description`,
    count(/<meta name="description"/g) === 1,
    `${count(/<meta name="description"/g)} tags`,
  );
  check(
    `${testCase.path}: static canonical`,
    html.includes(`<link rel="canonical" href="${url}"`),
  );
  check(
    `${testCase.path}: static og:type`,
    html.includes(`<meta property="og:type" content="${testCase.type}"`),
  );
  check(
    `${testCase.path}: static og:title`,
    html.includes(`<meta property="og:title" content="${title}"`),
  );
  check(
    `${testCase.path}: static og:description`,
    html.includes(`<meta property="og:description" content="${description}"`),
  );
  check(
    `${testCase.path}: static og:url`,
    html.includes(`<meta property="og:url" content="${url}"`),
  );
  check(
    `${testCase.path}: one static og:title`,
    count(/<meta property="og:title"/g) === 1,
    `${count(/<meta property="og:title"/g)} tags`,
  );
  check(
    `${testCase.path}: static twitter:title`,
    html.includes(`<meta name="twitter:title" content="${title}"`),
  );

  if (testCase.publishedTime) {
    check(
      `${testCase.path}: published time`,
      html.includes(
        `<meta property="article:published_time" content="${testCase.publishedTime}"`,
      ),
    );
  }
}

const browser = await chromium.launch();

for (const testCase of cases) {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto(`${BASE}${testCase.path}`, { waitUntil: "load" });

  const title = await page.title();
  const description = await page.evaluate(() => {
    const tags = document.querySelectorAll('meta[name="description"]');
    return {
      count: tags.length,
      content: tags[0]?.getAttribute("content") ?? null,
    };
  });

  check(`${testCase.path}: title`, title === testCase.title, title);
  check(
    `${testCase.path}: one description tag`,
    description.count === 1,
    `${description.count} tags`,
  );
  check(
    `${testCase.path}: description`,
    description.content === testCase.description,
    String(description.content),
  );
  check(
    `${testCase.path}: no runtime errors`,
    errors.length === 0,
    errors.join("; "),
  );

  if (EXPECT_STATIC && testCase.static) {
    await checkStaticHead(testCase);
  }

  await page.close();
}

await browser.close();

if (!EXPECT_STATIC) {
  const html = await (await fetch(`${BASE}/`)).text();
  check(
    "dev HTML ships no static description tag",
    !/<meta[^>]+name=["']description["']/i.test(html),
  );
}

if (failures > 0) {
  console.log(`\n${failures} failure(s)`);
  process.exit(1);
}

console.log("\nall meta checks passed");
