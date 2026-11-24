const path = require("node:path");
const fs = require("node:fs/promises");
const { constants } = require("node:fs");
const { pathToFileURL } = require("node:url");

function loadPlaywright() {
  const override = process.env.SOCIAL_PREVIEW_PLAYWRIGHT;
  const candidates = override ? [override] : [
    "playwright",
    "playwright-core",
    "/opt/homebrew/lib/node_modules/openclaw/node_modules/playwright-core",
  ];
  for (const modulePath of candidates) {
    try {
      const loaded = require(modulePath);
      if (loaded.chromium) return loaded;
    } catch {
      // Try another existing installation. This optional helper never installs dependencies.
    }
  }
  throw new Error(
    "No usable Playwright installation was found. Set SOCIAL_PREVIEW_PLAYWRIGHT to the absolute path of an existing playwright or playwright-core module directory, then rerun this script.",
  );
}

// Uses an existing browser installation. No package or browser download is required.
// Run from any directory: node scripts/render-social-preview.cjs
const executablePath = process.env.SOCIAL_PREVIEW_CHROMIUM || "/Users/kaizer/Library/Caches/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const sourcePath = path.join(__dirname, "social-preview.html");
const outputPath = path.resolve(__dirname, "../public/og-image.png");

(async () => {
  const { chromium } = loadPlaywright();
  try {
    await fs.access(executablePath, constants.X_OK);
  } catch {
    throw new Error(`Chromium is missing or not executable at ${executablePath}. Set SOCIAL_PREVIEW_CHROMIUM to an existing Chromium executable, then rerun this script.`);
  }
  const browser = await chromium.launch({ executablePath, headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    // Both fonts are embedded in the HTML. Keep the renderer independent of external hosts.
    await page.route("**/*", (route) => route.request().url().startsWith("file:") || route.request().url().startsWith("data:") ? route.continue() : route.abort());
    await page.goto(pathToFileURL(sourcePath).href, { waitUntil: "load" });
    const fontsReady = await page.evaluate(async () => {
      const expected = [document.fonts.load('500 66px "Space Grotesk"'), document.fonts.load('400 18px "IBM Plex Mono"')];
      const loaded = await Promise.race([Promise.all(expected).then((faces) => faces.every((face) => face.length > 0)), new Promise((resolve) => setTimeout(() => resolve(false), 2000))]);
      return loaded && document.fonts.check('500 66px "Space Grotesk"') && document.fonts.check('400 18px "IBM Plex Mono"');
    });
    if (!fontsReady) throw new Error("Embedded Space Grotesk and IBM Plex Mono fonts must load before rendering. Preview was not saved.");
    const layout = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight }));
    if (layout.width !== 1200 || layout.height !== 630) throw new Error(`Unexpected social preview layout: ${layout.width}×${layout.height}`);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await page.screenshot({ path: outputPath, type: "png", animations: "disabled", clip: { x: 0, y: 0, width: 1200, height: 630 } });
    process.stdout.write(`Saved ${outputPath} (1200×630; verified embedded fonts).\n`);
  } finally {
    await browser.close();
  }
})().catch((error) => { process.stderr.write(`${error.message}\n`); process.exitCode = 1; });
