import { chromium } from "playwright";
import { mkdirSync } from "fs";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:4005";
const OUT = process.env.PROOF_DIR ?? "/tmp/opencode/tabs-proof";
mkdirSync(OUT, { recursive: true });

const DESKTOP = { width: 1440, height: 900 };
const TABLET = { width: 768, height: 1024 };
const MOBILE = { width: 390, height: 844 };
const SMALL = { width: 320, height: 700 };

let failures = 0;
const check = (label, passed, detail = "") => {
  if (passed) {
    console.log(`ok    ${label}`);
    return;
  }
  failures += 1;
  console.log(`FAIL  ${label}${detail ? ` — ${detail}` : ""}`);
};

const tab = (page, name) => page.getByRole("tab", { name: new RegExp(name) });
const panel = (page) => page.getByRole("tabpanel");

async function openPage(browser, viewport, reducedMotion = "no-preference") {
  const context = await browser.newContext({ viewport, reducedMotion });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto(BASE, { waitUntil: "load" });
  await page.waitForSelector('[role="tablist"]');
  return { context, page, errors };
}

async function switchTo(page, name) {
  await tab(page, name).click();
  await page.waitForTimeout(400);
}

const browser = await chromium.launch();

for (const [name, viewport] of [
  ["desktop", DESKTOP],
  ["tablet", TABLET],
  ["mobile", MOBILE],
  ["small", SMALL],
]) {
  const { context, page, errors } = await openPage(browser, viewport);

  const tabs = page.getByRole("tab");
  check(`${name}: three category tabs`, (await tabs.count()) === 3);

  const tablist = page.getByRole("tablist");
  const metrics = await tablist.evaluate((node) => ({
    scrollWidth: node.scrollWidth,
    clientWidth: node.clientWidth,
  }));
  check(
    `${name}: tab bar does not overflow`,
    metrics.scrollWidth <= metrics.clientWidth + 1,
    `${metrics.scrollWidth} > ${metrics.clientWidth}`,
  );

  const docOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  check(`${name}: page has no horizontal overflow`, docOverflow <= 1, `${docOverflow}px`);

  const sizes = await tabs.evaluateAll((nodes) =>
    nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return { width: rect.width, height: rect.height, left: rect.left, right: rect.right };
    }),
  );
  check(
    `${name}: every tab is a 44px touch target`,
    sizes.every((size) => size.height >= 43.5),
    JSON.stringify(sizes.map((size) => size.height)),
  );
  check(
    `${name}: every tab stays inside the viewport`,
    sizes.every((size) => size.left >= 0 && size.right <= viewport.width + 0.5),
    JSON.stringify(sizes.map((size) => [size.left, size.right])),
  );

  const work = tab(page, "Work");
  check(`${name}: Work is selected by default`, (await work.getAttribute("aria-selected")) === "true");
  check(`${name}: default panel shows Work projects`, (await panel(page).textContent()).includes("Client System Prototype"));
  check(`${name}: default panel hides Personal projects`, !(await panel(page).textContent()).includes("LifeOS"));
  check(
    `${name}: all categories stay in the document`,
    await page.evaluate(() => {
      const text = document.body.textContent ?? "";
      return text.includes("LifeOS") && text.includes("CBT Platform");
    }),
  );
  await page.screenshot({ path: `${OUT}/work-${name}.png`, fullPage: true });

  await switchTo(page, "Personal");
  check(`${name}: Personal tab selects`, (await tab(page, "Personal").getAttribute("aria-selected")) === "true");
  check(`${name}: Personal panel shows LifeOS`, (await panel(page).textContent()).includes("LifeOS"));
  check(`${name}: Personal panel shows PAU Archive`, (await panel(page).textContent()).includes("PAU Archive"));
  check(`${name}: Personal panel drops Work content`, !(await panel(page).textContent()).includes("Client System Prototype"));
  check(
    `${name}: Personal tab is deep-linkable`,
    new URL(page.url()).searchParams.get("tab") === "personal",
    page.url(),
  );
  await page.screenshot({ path: `${OUT}/personal-${name}.png`, fullPage: true });

  await switchTo(page, "School");
  const schoolText = await panel(page).textContent();
  check(`${name}: School panel shows club projects`, schoolText.includes("CBT Platform"));
  check(`${name}: School panel shows volunteering`, schoolText.includes("SST Makerspace"));
  check(
    `${name}: School tab is deep-linkable`,
    new URL(page.url()).searchParams.get("tab") === "school",
    page.url(),
  );
  await page.screenshot({ path: `${OUT}/school-${name}.png`, fullPage: true });

  await switchTo(page, "Work");
  check(
    `${name}: Work keeps the URL clean`,
    !new URL(page.url()).searchParams.has("tab"),
    page.url(),
  );

  if (errors.length) check(`${name}: no console errors`, false, errors.join("; "));
  else check(`${name}: no console errors`, true);

  await context.close();
}

/* Keyboard model, deep links, and reduced motion */
{
  const { context, page, errors } = await openPage(browser, DESKTOP);

  await tab(page, "Work").focus();
  await page.keyboard.press("ArrowRight");
  check("keyboard: ArrowRight selects Personal", (await tab(page, "Personal").getAttribute("aria-selected")) === "true");
  check(
    "keyboard: focus follows selection",
    await tab(page, "Personal").evaluate((node) => node === document.activeElement),
  );
  await page.keyboard.press("End");
  check("keyboard: End selects School", (await tab(page, "School").getAttribute("aria-selected")) === "true");
  await page.keyboard.press("Home");
  check("keyboard: Home selects Work", (await tab(page, "Work").getAttribute("aria-selected")) === "true");
  await page.keyboard.press("ArrowLeft");
  check("keyboard: ArrowLeft wraps to School", (await tab(page, "School").getAttribute("aria-selected")) === "true");
  await page.keyboard.press("Tab");
  check(
    "keyboard: Tab reaches the panel",
    await panel(page).evaluate((node) => node === document.activeElement),
  );

  check(
    "aria: tab points at its panel",
    (await tab(page, "School").getAttribute("aria-controls")) === (await panel(page).getAttribute("id")),
  );
  check(
    "aria: panel is named by its tab",
    (await panel(page).getAttribute("aria-labelledby")) === (await tab(page, "School").getAttribute("id")),
  );
  const panelState = await page.evaluate(() => {
    const panels = [...document.querySelectorAll('[role="tabpanel"]')];
    return {
      total: panels.length,
      visible: panels.filter((node) => !node.hidden).length,
    };
  });
  check(
    "aria: three panels exist and one is visible",
    panelState.total === 3 && panelState.visible === 1,
    JSON.stringify(panelState),
  );

  if (errors.length) check("interaction console clean", false, errors.join("; "));
  await context.close();
}

{
  const context = await browser.newContext({ viewport: DESKTOP });
  const page = await context.newPage();
  await page.goto(`${BASE}/?tab=school`, { waitUntil: "load" });
  await page.waitForSelector('[role="tablist"]');
  check("deep link: ?tab=school selects School", (await tab(page, "School").getAttribute("aria-selected")) === "true");
  check("deep link: ?tab=school shows School content", (await panel(page).textContent()).includes("Codespark"));
  await context.close();
}

{
  const context = await browser.newContext({ viewport: DESKTOP });
  const page = await context.newPage();
  await page.goto(`${BASE}/?tab=nonsense`, { waitUntil: "load" });
  await page.waitForSelector('[role="tablist"]');
  check("deep link: invalid tab falls back to Work", (await tab(page, "Work").getAttribute("aria-selected")) === "true");
  await context.close();
}

{
  const { context, page } = await openPage(browser, MOBILE, "reduce");
  const animation = await page.locator(".tab-enter").evaluate(
    (node) => getComputedStyle(node).animationName,
  );
  check("reduced motion: panel entrance is disabled", animation === "none", animation);
  await switchTo(page, "Personal");
  const nextAnimation = await page.locator(".tab-enter").evaluate(
    (node) => getComputedStyle(node).animationName,
  );
  check("reduced motion: switch stays static", nextAnimation === "none", nextAnimation);
  const transition = await page
    .locator('[role="tablist"] > span')
    .evaluate((node) => getComputedStyle(node).transitionProperty);
  check("reduced motion: indicator does not slide", transition === "none", transition);
  await context.close();
}

await browser.close();
console.log(failures === 0 ? "\nALL TAB CHECKS PASSED" : `\n${failures} TAB FAILURES`);
process.exit(failures === 0 ? 0 : 1);
