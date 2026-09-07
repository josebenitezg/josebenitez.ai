import { test, expect } from "@playwright/test";

declare global {
  interface Window {
    sculptureFrames: number;
    sculptureTime: number;
    sculptureMode: number;
  }
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.sculptureFrames = 0;
    window.sculptureTime = 0;
    window.sculptureMode = 0;
    const draw = WebGLRenderingContext.prototype.drawArrays;
    WebGLRenderingContext.prototype.drawArrays = function (...args) {
      window.sculptureFrames++;
      const program = this.getParameter(this.CURRENT_PROGRAM);
      window.sculptureTime = this.getUniform(
        program,
        this.getUniformLocation(program, "uTime"),
      );
      window.sculptureMode = this.getUniform(
        program,
        this.getUniformLocation(program, "uMode"),
      );
      return draw.apply(this, args);
    };
  });
});

test("renders, morphs, pauses, resumes, and stops drawing offscreen", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Between thephysical &the possible.",
  );
  const stage = page.locator(".object-stage");
  await expect(stage).toHaveAttribute("data-renderer", "webgl");
  await stage.scrollIntoViewIfNeeded();
  await expect
    .poll(() => page.evaluate(() => window.sculptureFrames))
    .toBeGreaterThan(5);
  await page.getByRole("button", { name: "Connection", exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => window.sculptureMode))
    .toBeGreaterThan(0.95);
  await page.getByRole("button", { name: "Possibility", exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => window.sculptureMode))
    .toBeGreaterThan(1.95);

  await page.getByRole("button", { name: "Pause sculpture motion" }).click();
  const pausedFrames = await page.evaluate(() => window.sculptureFrames);
  // A deliberate observation interval proves the animation loop really stops.
  await page.waitForTimeout(250);
  expect(await page.evaluate(() => window.sculptureFrames)).toBe(pausedFrames);
  await page.getByRole("button", { name: "Perception", exact: true }).click();
  expect(await page.evaluate(() => window.sculptureMode)).toBe(0);
  await page.getByRole("button", { name: "Resume sculpture motion" }).click();
  await expect
    .poll(() => page.evaluate(() => window.sculptureFrames))
    .toBeGreaterThan(pausedFrames + 2);
  await page
    .getByRole("link", { name: "Say hello", exact: true })
    .scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  const hiddenFrames = await page.evaluate(() => window.sculptureFrames);
  await page.waitForTimeout(250);
  expect(await page.evaluate(() => window.sculptureFrames)).toBe(hiddenFrames);
  await stage.scrollIntoViewIfNeeded();
  await expect
    .poll(() => page.evaluate(() => window.sculptureFrames))
    .toBeGreaterThan(hiddenFrames + 2);
  await page.getByRole("button", { name: "Pause sculpture motion" }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: testInfo.outputPath("observatory.png"),
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("respects reduced motion initially and when the preference changes", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const stage = page.locator(".object-stage");
  await expect(stage).toHaveAttribute("data-renderer", "webgl");
  await stage.scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("button", { name: "Motion reduced by system preference" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Connection", exact: true }).click();
  expect(await page.evaluate(() => window.sculptureMode)).toBe(1);
  expect(await page.evaluate(() => window.sculptureTime)).toBe(0);
  const frames = await page.evaluate(() => window.sculptureFrames);
  await page.waitForTimeout(250);
  expect(await page.evaluate(() => window.sculptureFrames)).toBe(frames);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect
    .poll(() => page.evaluate(() => window.sculptureTime))
    .toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(
    page.getByRole("button", { name: "Motion reduced by system preference" }),
  ).toBeDisabled();
});

test("keeps a useful still illustration when WebGL is unavailable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      ...args: Parameters<typeof getContext>
    ) {
      if (String(args[0]).includes("webgl")) return null;
      return getContext.apply(this, args);
    } as typeof getContext;
  });
  await page.goto("/");
  await expect(page.locator(".object-fallback")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Still illustration" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Possibility", exact: true }).click();
  await expect(page.locator(".object-fallback-2")).toBeVisible();
  await page.getByRole("link", { name: "Explore" }).click();
  await expect(page).toHaveURL(/#explore$/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("falls back on context loss and recovers after restoration", async ({
  page,
}) => {
  await page.goto("/");
  const stage = page.locator(".object-stage");
  await expect(stage).toHaveAttribute("data-renderer", "webgl");
  await stage.scrollIntoViewIfNeeded();
  await page.locator("canvas").evaluate((canvas) => {
    const gl = (canvas as HTMLCanvasElement).getContext("webgl")!;
    const extension = gl.getExtension("WEBGL_lose_context")!;
    extension.loseContext();
    canvas.addEventListener(
      "webglcontextlost",
      () => setTimeout(() => extension.restoreContext(), 500),
      { once: true },
    );
  });
  await expect(stage).toHaveAttribute("data-renderer", "still");
  await expect(page.locator(".object-fallback")).toBeVisible();
  await expect(stage).toHaveAttribute("data-renderer", "webgl");
  await expect(
    page.getByRole("button", { name: "Pause sculpture motion" }),
  ).toBeEnabled();
});

test("supports keyboard form selection and mobile menu navigation", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Connection", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Connection", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  if (isMobile) {
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(
      page.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeVisible();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Work", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Open navigation menu" }),
    ).toHaveAttribute("aria-expanded", "false");
  } else {
    await page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Work", exact: true })
      .click();
  }
  await expect(page).toHaveURL(/\/work$/);
  await page.getByRole("link", { name: "José Benítez", exact: true }).click();
  await expect(page.locator(".object-stage")).toHaveAttribute(
    "data-renderer",
    "webgl",
  );
});

test("preserves every homepage internal destination and works without JavaScript", async ({
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
    // Same-document anchors do not produce a navigation response.
    const response = await page.request.get(href);
    expect(response.status(), href).toBe(200);
    await page.goto(href);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const hash = new URL(page.url()).hash;
    if (hash) await expect(page.locator(hash)).toBeAttached();
  }
  const context = await browser.newContext({ javaScriptEnabled: false });
  const plainPage = await context.newPage();
  await plainPage.goto("http://127.0.0.1:3107/");
  await expect(plainPage.locator(".object-fallback")).toBeVisible();
  await expect(plainPage.getByRole("heading", { level: 1 })).toBeVisible();
  await plainPage
    .getByRole("link", { name: "All writing", exact: true })
    .click();
  await expect(plainPage).toHaveURL(/\/writing$/);
  await context.close();
});
