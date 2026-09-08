import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:4173";
const ROUTES = ["/2", "/3", "/4", "/5", "/6", "/7"];
const PREFIXES = ["pb2", "pc3", "pd4", "pe5", "pf6", "pg7"];
const VIEWPORTS = [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
];

let failures = 0;
const fail = (label, detail) => { failures += 1; console.log(`FAIL  ${label} — ${detail}`); };
const ok = (label) => console.log(`ok    ${label}`);

const browser = await chromium.launch();

for (const [vwName, vp] of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: vp });
  const page = await ctx.newPage();
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "load" });
    await page.waitForTimeout(500);

    // 1. horizontal overflow
    const over = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth - doc.clientWidth;
    });
    if (over > 1) fail(`h-overflow ${route} ${vwName}`, `${over}px`);
    else ok(`no h-overflow ${route} ${vwName}`);

    // 2. clipped text: elements with overflow hidden whose content overflows
    const clipped = await page.evaluate((sel) => {
      const bad = [];
      const el = document.querySelector(sel);
      if (!el) return [];
      for (const n of el.querySelectorAll("*")) {
        const s = getComputedStyle(n);
        if (!["hidden", "clip", "ellipsis"].includes(s.overflowX) && s.overflowX !== "auto") continue;
        if (n.scrollWidth > n.clientWidth + 3 && n.clientWidth > 0) {
          const t = (n.textContent || "").trim().slice(0, 40);
          if (t) bad.push(`${n.tagName}.${n.className.toString().split(" ")[0]} "${t}" ${n.scrollWidth}>${n.clientWidth}`);
        }
      }
      return bad.slice(0, 5);
    }, "." + PREFIXES.join(", ."));
    if (clipped.length) fail(`clipped ${route} ${vwName}`, clipped.join(" | "));
    else ok(`no clipped text ${route} ${vwName}`);

    // 3. text contrast: body-size text against its effective background
    const lowContrast = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return [];
      const lum = (c) => {
        const [r, g, b] = [0, 1, 2].map((i) => {
          const v = parseInt(c.slice(i * 2 + 1, i * 2 + 3), 16) / 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      const ratio = (a, b) => {
        const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
        return (l1 + 0.05) / (l2 + 0.05);
      };
      const effectiveBg = (n) => {
        let cur = n;
        while (cur && cur !== el) {
          const bg = getComputedStyle(cur).backgroundColor;
          const m = bg.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
          if (m && (m[4] === undefined || Number(m[4]) > 0.95)) {
            return "#" + [m[1], m[2], m[3]].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
          }
          cur = cur.parentElement;
        }
        return "#000000";
      };
      const bad = [];
      for (const n of el.querySelectorAll("p, span, a, h1, h2, h3, li, button, pre, label")) {
        const t = (n.textContent || "").trim();
        if (!t) continue;
        const s = getComputedStyle(n);
        const size = parseFloat(s.fontSize);
        const m = s.color.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
        if (!m) continue;
        const fg = "#" + [m[1], m[2], m[3]].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
        if (s.color.includes("0.") && Number(m[4]) < 0.55) continue;
        const r = ratio(fg, effectiveBg(n));
        const min = size >= 24 || /(h1|h2|h3)/.test(n.tagName) ? 2.4 : 3.4;
        if (r < min) {
          bad.push(`${n.tagName}.${n.className.toString().split(" ")[0]} "${t.slice(0, 26)}" ${r.toFixed(1)}`);
        }
      }
      return bad.slice(0, 6);
    }, "." + PREFIXES.join(", ."));
    if (lowContrast.length) fail(`contrast ${route} ${vwName}`, lowContrast.join(" | "));
    else ok(`contrast ok ${route} ${vwName}`);
  }
  await ctx.close();
}

await browser.close();
console.log(failures === 0 ? "\nALL LAYOUT CHECKS PASSED" : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
