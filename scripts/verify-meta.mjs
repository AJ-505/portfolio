import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:5183";

const cases = [
  {
    path: "/",
    title: "Abasiono Mbat | AI-Native Software Engineer",
    description:
      "AI-native software engineer. CS student at Pan-Atlantic University, Lagos. I build AI-powered products and ship them fast with teams.",
  },
  {
    path: "/blog",
    title: "Writing | Abasiono Mbat",
    description: "Essays and notes on things I can't stop thinking about.",
  },
  {
    path: "/blog/the-ease-paradox",
    title: "The Ease Paradox | Abasiono Mbat's Blog",
    description: "Why making things easy can make things hard",
  },
  {
    path: "/blog/does-not-exist",
    title: "Not found | Abasiono Mbat",
    description: "Nothing lives at /blog/does-not-exist.",
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
  check(`${testCase.path}: no runtime errors`, errors.length === 0, errors.join("; "));

  await page.close();
}

await browser.close();

const html = await (await fetch(`${BASE}/`)).text();
check(
  "served HTML ships no static description tag",
  !/<meta[^>]+name=["']description["']/i.test(html),
);

if (failures > 0) {
  console.log(`\n${failures} failure(s)`);
  process.exit(1);
}

console.log("\nall meta checks passed");
