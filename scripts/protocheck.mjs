import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:5173";
const ROUTES = ["/2", "/3", "/4", "/5", "/6", "/7"];

let failures = 0;
const fail = (label, detail) => { failures += 1; console.log(`FAIL  ${label} — ${detail}`); };
const ok = (label) => console.log(`ok    ${label}`);

const browser = await chromium.launch();

for (const mode of ["normal", "reduced"]) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: mode === "reduced" ? "reduce" : "no-preference",
  });
  for (const route of ROUTES) {
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    await page.goto(BASE + route, { waitUntil: "load" });
    await page.waitForTimeout(700);
    if (errors.length) fail(`console ${route} ${mode}`, errors.join(" | "));
    else ok(`console clean ${route} ${mode}`);

    if (mode === "reduced") {
      const anims = await page.evaluate(() => document.getAnimations().length);
      if (anims > 0) fail(`reduced static ${route}`, `${anims} animations`);
      else ok(`reduced static ${route}`);
    }

    // real text present + CV reachable + name present
    const bodyText = (await page.evaluate(() => document.body.innerText)).toLowerCase();
    for (const [label, needle] of [
      ["name", "abasiono mbat"],
      ["number", "800+"],
      ["project", "cbt platform"],
    ]) {
      if (!bodyText.includes(needle.toLowerCase())) fail(`content ${route} ${label}`, `missing "${needle}"`);
      else ok(`content ${route} ${label}`);
    }
    const cvClickable = await page.evaluate(() => {
      const a = [...document.querySelectorAll("a")].find((x) => /cv\.pdf$/.test(x.getAttribute("href") || ""));
      return a ? a.getBoundingClientRect().top < window.innerHeight : false;
    });
    if (!cvClickable) fail(`cv one-click ${route}`, "CV link not in first viewport");
    else ok(`cv one-click ${route}`);
    await page.close();
  }
  await ctx.close();
}

await browser.close();
console.log(failures === 0 ? "\nALL PROTO CHECKS PASSED" : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
