import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/work",
  "/writing",
  "/about",
  "/capabilities",
  "/contact",
  "/blog/autonomous-retail",
  "/blog/inferentia-chips",
  "/blog/paraguay-ai-factory",
  "/blog/4o-image-gen",
];

test("all rooms share their visual foundation at desktop and phone widths", async ({
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
        weight: getComputedStyle(document.querySelector("h1")!).fontWeight,
        header: getComputedStyle(document.querySelector(".site-header")!)
          .backgroundColor,
        overflow: document.documentElement.scrollWidth > window.innerWidth,
      }));
      expect(appearance.background, route).toBe("rgb(17, 18, 15)");
      expect(appearance.font, route).toContain("instrumentSerif");
      expect(appearance.weight, route).toBe("400");
      expect(appearance.header, route).toBe("rgba(17, 18, 15, 0.96)");
      expect(appearance.overflow, `${route} at ${width}px`).toBe(false);
      for (const content of await page
        .locator(".room-content, .contact-grid, .reading-layout")
        .all()) {
        const gutters = await content.evaluate((el) => ({
          left: parseFloat(getComputedStyle(el).paddingLeft),
          right: parseFloat(getComputedStyle(el).paddingRight),
        }));
        expect(gutters.left, `${route} left gutter`).toBeGreaterThanOrEqual(20);
        expect(gutters.right, `${route} right gutter`).toBeGreaterThanOrEqual(
          20,
        );
      }
      await expect(
        page.locator('nav[aria-label="Observatory index"]'),
      ).toBeAttached();
      if (width === widths[0]) {
        await page.screenshot({
          path: testInfo.outputPath(
            `${route.replaceAll("/", "_") || "home"}.png`,
          ),
          fullPage: true,
          animations: "disabled",
        });
      }
    }
  }
  expect(errors).toEqual([]);
});

test("home, work, article and writing form one client-side journey", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".object-stage")).toHaveAttribute(
    "data-renderer",
    "webgl",
  );
  await page.getByRole("button", { name: "Connection", exact: true }).click();
  await page.getByRole("button", { name: "Pause sculpture motion" }).click();
  const header = await page.locator(".site-header").elementHandle();
  await page.locator('main a[href="/work#intuitivo"]').click();
  await expect(page).toHaveURL(/\/work#intuitivo$/);
  expect(await header!.evaluate((el) => el.isConnected)).toBe(true);
  await page.locator('#intuitivo a[href="/blog/autonomous-retail"]').click();
  await expect(page).toHaveURL(/\/blog\/autonomous-retail$/);
  expect(await header!.evaluate((el) => el.isConnected)).toBe(true);
  await expect(
    page.locator('.desktop-navigation a[href="/writing"]'),
  ).toHaveAttribute("aria-current", "location");
  await page.getByRole("link", { name: "All writing", exact: true }).click();
  await expect(page).toHaveURL(/\/writing$/);
  expect(await header!.evaluate((el) => el.isConnected)).toBe(true);
  await page.goBack();
  await expect(page).toHaveURL(/\/blog\/autonomous-retail$/);
  await page.getByRole("link", { name: "José Benítez", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole("button", { name: "Connection", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("button", { name: "Resume sculpture motion" }),
  ).toBeVisible();
});

test("reading progress belongs to the article and clears when leaving", async ({
  page,
}) => {
  await page.goto("/blog/autonomous-retail");
  const bar = page.locator(".reading-progress span");
  await expect(page.locator(".reading-progress")).toBeVisible();
  await page.locator(".reading-end").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      bar.evaluate(
        (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).a,
      ),
    )
    .toBeGreaterThan(0.9);
  await page.getByRole("link", { name: "All writing", exact: true }).click();
  await expect(page.locator(".reading-progress")).toBeHidden();
  await expect(
    page.locator('.desktop-navigation a[href="/writing"]'),
  ).toHaveAttribute("aria-current", "page");
});

test("keyboard and reduced-motion navigation stay immediate", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "José Benítez", exact: true }).focus();
  await page.keyboard.press("Enter");
  expect(
    await page
      .locator(".room-arrival")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/writing");
  expect(
    await page
      .locator(".room-arrival")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page.setViewportSize({ width: 390, height: 844 });
  const toggle = page.getByRole("button", { name: "Open navigation menu" });
  await toggle.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeHidden();
});

test("the room index remains usable without scripts and storage is optional", async ({
  page,
  browser,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "sessionStorage", {
      get() {
        throw new Error("Storage unavailable");
      },
    });
  });
  await page.goto("/");
  await expect(page.locator(".object-stage")).toHaveAttribute(
    "data-renderer",
    "webgl",
  );
  await page.getByRole("button", { name: "Possibility", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Possibility", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 740 },
  });
  const plainPage = await context.newPage();
  await plainPage.goto("http://127.0.0.1:3107/writing");
  await plainPage.locator(".footer-index summary").click();
  await plainPage
    .getByRole("navigation", { name: "Observatory index" })
    .getByRole("link", { name: /About/ })
    .click();
  await expect(plainPage).toHaveURL(/\/about$/);
  await expect(plainPage.getByRole("heading", { level: 1 })).toContainText(
    "Engineer.",
  );
  await context.close();
});
