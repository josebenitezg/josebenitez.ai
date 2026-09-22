import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/writing",
  "/about",
  "/blog/autonomous-retail",
  "/blog/inferentia-chips",
  "/blog/paraguay-ai-factory",
  "/blog/4o-image-gen",
];

test("every page shares one quiet foundation at desktop and phone widths", async ({
  page,
  isMobile,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const widths = isMobile ? [390, 320] : [1440, 768];
  for (const width of widths) {
    await page.setViewportSize({ width, height: isMobile ? 844 : 1000 });
    for (const route of routes) {
      expect((await page.goto(route))?.status(), route).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      const appearance = await page.evaluate(() => ({
        background: getComputedStyle(document.body).backgroundColor,
        font: getComputedStyle(document.querySelector("h1")!).fontFamily,
        overflow: document.documentElement.scrollWidth > window.innerWidth,
      }));
      expect(appearance.background, route).toBe("rgb(0, 0, 0)");
      expect(appearance.font, route).toMatch(/geist/i);
      expect(appearance.overflow, `${route} at ${width}px`).toBe(false);
      await expect(
        page.getByRole("navigation", { name: "Primary navigation" }),
      ).toBeVisible();
      if (width === widths[0]) {
        await page.screenshot({
          path: testInfo.outputPath(
            `${route.replaceAll("/", "_") || "home"}.png`,
          ),
          fullPage: true,
        });
      }
    }
  }
  expect(errors).toEqual([]);
});

test("home, article and writing form one client-side journey", async ({
  page,
}) => {
  await page.goto("/");
  const header = await page.locator(".site-header").elementHandle();
  await page.locator('main a[href="/blog/autonomous-retail"]').click();
  await expect(page).toHaveURL(/\/blog\/autonomous-retail$/);
  expect(await header!.evaluate((el) => el.isConnected)).toBe(true);
  const primary = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(primary.getByRole("link", { name: "Writing" })).toHaveAttribute(
    "aria-current",
    "location",
  );
  await page.getByRole("link", { name: "← Writing" }).click();
  await expect(page).toHaveURL(/\/writing$/);
  await expect(primary.getByRole("link", { name: "Writing" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await page.getByRole("link", { name: "José Benítez", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("retired pages redirect to their replacements", async ({ page }) => {
  for (const route of ["/work", "/capabilities", "/contact", "/blog"]) {
    await page.goto(route);
    await expect(page).toHaveURL(route === "/blog" ? /\/writing$/ : /\/about$/);
  }
});

test("every homepage destination resolves and works without JavaScript", async ({
  page,
  browser,
}) => {
  await page.goto("/");
  const links = await page
    .locator('main a[href^="/"]')
    .evaluateAll((elements) => [
      ...new Set(elements.map((el) => el.getAttribute("href")!)),
    ]);
  for (const href of links) {
    expect((await page.request.get(href)).status(), href).toBe(200);
    await page.goto(href);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const hash = new URL(page.url()).hash;
    if (hash) await expect(page.locator(hash)).toBeAttached();
  }
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 740 },
  });
  const plainPage = await context.newPage();
  await plainPage.goto("http://127.0.0.1:3107/");
  await plainPage.getByRole("link", { name: "All writing →" }).click();
  await expect(plainPage).toHaveURL(/\/writing$/);
  await plainPage
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "About" })
    .click();
  await expect(plainPage).toHaveURL(/\/about$/);
  await context.close();
});
