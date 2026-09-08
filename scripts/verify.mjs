import { chromium } from "playwright";
import { mkdirSync } from "fs";

const BASE = process.env.BASE_URL ?? "http://localhost:4173";
const OUT = process.env.PROOF_DIR ?? "/home/abasiono/code/personal/portfolio/proofs";
mkdirSync(OUT, { recursive: true });

const ROUTES = ["/2", "/3", "/4", "/5", "/6", "/7"];
const PREFIXES = ["pb2", "pc3", "pd4", "pe5", "pf6", "pg7"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

let failures = 0;
const fail = (label, detail) => {
  failures += 1;
  console.log(`FAIL  ${label} — ${detail}`);
};
const ok = (label) => console.log(`ok    ${label}`);

async function freshPage(browser, viewport, opts = {}) {
  const ctx = await browser.newContext({
    viewport,
    reducedMotion: opts.reducedMotion ?? "no-preference",
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  return { page, ctx, errors };
}

const browser = await chromium.launch();

for (const route of ROUTES) {
  for (const [vwName, vp] of [["desktop", DESKTOP], ["mobile", MOBILE]]) {
    const { page, ctx, errors } = await freshPage(browser, vp);
    await page.goto(BASE + route, { waitUntil: "load" });
    await page.waitForTimeout(900);

    if (errors.length > 0) fail(`console ${route} ${vwName}`, errors.join("; "));
    else ok(`console clean ${route} ${vwName}`);

    await page.screenshot({ path: `${OUT}/${route.replace("/", "d")}-${vwName}.png` });

    // first-paint readability: the root design element must be visible
    const rootVisible = await page.evaluate((re) => {
      const r = [...document.querySelectorAll("[class]")].find((el) =>
        new RegExp(`^(${re})\\b`).test(el.className),
      );
      if (!r) return false;
      const s = getComputedStyle(r);
      return s.display !== "none" && Number(s.opacity) > 0;
    }, PREFIXES.join("|"));
    if (!rootVisible) fail(`first paint ${route} ${vwName}`, "root hidden");
    else ok(`first paint ${route} ${vwName}`);

    await ctx.close();
  }
}

/*  ── /5 trading card: deck swap updates the stage ── */
{
  const { page, ctx, errors } = await freshPage(browser, DESKTOP);
  await page.goto(BASE + "/5", { waitUntil: "load" });
  await page.waitForTimeout(500);
  const stageName = await page.locator(".pe5-stage-name").first().textContent();
  const slots = page.locator(".pe5-deck-slot");
  const count = await slots.count();
  if (count < 2) fail("/5 deck", `deck has ${count} slots`);
  else ok(`/5 deck has ${count} slots`);
  // click the last slot
  await slots.nth(count - 1).click();
  await page.waitForTimeout(200);
  const newStageName = await page.locator(".pe5-stage-name").first().textContent();
  if (newStageName === stageName) fail("/5 deck swap", `stage name unchanged: ${newStageName}`);
  else ok(`/5 deck swap: ${stageName} → ${newStageName}`);
  if (errors.length) fail("/5 console", errors.join(";"));
  await ctx.close();
}

/*  ── reduced motion: zero CSS animations anywhere ── */
for (const route of ROUTES) {
  const { page, ctx } = await freshPage(browser, DESKTOP, { reducedMotion: "reduce" });
  await page.goto(BASE + route, { waitUntil: "load" });
  await page.waitForTimeout(600);
  const anims = await page.evaluate(() => document.getAnimations().length);
  if (anims > 0) fail(`reduced-motion ${route}`, `${anims} active animations`);
  else ok(`reduced-motion ${route} static`);
  await page.screenshot({ path: `${OUT}/${route.replace("/", "d")}-reduced.png` });
  await ctx.close();
}

/*  ── route-switch spam: unmount hygiene ── */
{
  const { page, ctx, errors } = await freshPage(browser, DESKTOP);
  for (let i = 0; i < 12; i++) {
    await page.goto(BASE + ROUTES[i % ROUTES.length], { waitUntil: "load" });
    await page.waitForTimeout(200);
  }
  const alive = await page.evaluate(() => document.body?.children.length > 0);
  if (!alive) fail("route spam", "page dead");
  else ok("route spam survived 12 switches");
  if (errors.length) fail("route spam console", errors.join(";"));
  else ok("route spam console clean");
  await ctx.close();
}

/*  ── legacy routes still render ── */
for (const route of ["/", "/pitch"]) {
  const { page, ctx, errors } = await freshPage(browser, DESKTOP);
  await page.goto(BASE + route, { waitUntil: "load" });
  await page.waitForTimeout(600);
  const hasRoot = await page.evaluate(() => document.getElementById("root")?.children.length > 0);
  if (!hasRoot || errors.length) fail(`legacy ${route}`, errors.join(";") || "empty root");
  else ok(`legacy ${route} renders`);
  await page.screenshot({ path: `${OUT}/${route === "/" ? "home" : "pitch"}.png` });
  await ctx.close();
}

await browser.close();
console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
