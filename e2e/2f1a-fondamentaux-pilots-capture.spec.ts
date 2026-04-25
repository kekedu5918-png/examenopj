/**
 * Captures HTML (MarkdownArticle) des 3 fiches pilote 2F.1.a — thème sombre.
 * Fichiers : docs/audits/2f1a-captures/*.png
 */
import * as path from 'node:path';

import { expect, test } from './fixtures';

const slugs = [
  'enquete-flagrance',
  'causes-irresponsabilite-attenuation',
  'viol-agressions-sexuelles',
] as const;

const outDir = path.join(process.cwd(), 'docs/audits/2f1a-captures');

for (const slug of slugs) {
  test(`2F.1.a capture dark — ${slug}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(`/fondamentaux/${slug}`, { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('main')).toBeVisible({ timeout: 30_000 });
    await page.screenshot({
      path: path.join(outDir, `${slug}-dark.png`),
      fullPage: true,
    });
  });
}
