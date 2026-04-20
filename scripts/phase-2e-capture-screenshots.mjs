/**
 * Phase 2E — captures baseline avant / après (dark, desktop + mobile).
 * Prérequis : `npm run build` puis `npm run start` (ou PLAYWRIGHT_BASE_URL).
 *
 * Usage :
 *   node scripts/phase-2e-capture-screenshots.mjs before
 *   node scripts/phase-2e-capture-screenshots.mjs after
 */
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000';
const kind = process.argv[2] === 'before' || process.argv[2] === 'after' ? process.argv[2] : 'after';
const outDir = path.join(process.cwd(), 'docs/baselines/phase-2e', `screenshots-${kind}`);

const routes = [
  { name: 'home', path: '/' },
  { name: 'infractions', path: '/infractions' },
  { name: 'fondamentaux', path: '/fondamentaux' },
  { name: 'entrainement', path: '/entrainement' },
  { name: 'articulation', path: '/entrainement/articulation' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.addInitScript(() => {
      try {
        localStorage.setItem('theme', 'dark');
      } catch {
        /* ignore */
      }
    });

    for (const route of routes) {
      const url = `${baseURL.replace(/\/$/, '')}${route.path}`;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 120_000 });
      await page.evaluate(() => {
        document.documentElement.classList.add('dark');
      });
      await page.waitForTimeout(600);
      const file = path.join(outDir, `${route.name}-${vp.name}.png`);
      await page.screenshot({ path: file, fullPage: false });
      console.log('wrote', file);
    }
    await context.close();
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
