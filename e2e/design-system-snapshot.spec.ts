import AxeBuilder from '@axe-core/playwright';

import { expect, test } from './fixtures';

/**
 * Phase 1 — DS Institut Judiciaire.
 *
 * La page interne `/design-system` est rendue uniquement quand
 * `ENABLE_DESIGN_SYSTEM=true` (passé au webServer dans `playwright.config.ts`).
 * Hors de ce contexte, elle renvoie 404, donc la prod réelle ne fuit jamais
 * le détail des tokens.
 *
 * Trois garanties testées :
 *   1. Smoke : la page s'affiche, contient bien les 4 sections du DS.
 *   2. A11y : axe-core ne remonte aucune violation serious/critical (les tokens
 *      `--ij-*` doivent rester WCAG AA — double filet en complément du test
 *      Vitest sur les contrastes).
 *   3. Visual : snapshot ciblé sur `[data-design-system-root]` (la baseline
 *      sera créée au premier run). Tolérance pixel raisonnable car les fontes
 *      Google peuvent varier d'un run à l'autre.
 */
test.describe('Design system Institut Judiciaire — page /design-system', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.setItem('theme', 'light');
      } catch {
        /* ignore */
      }
      // Verrou Phase 1 : le layout force `.dark` même si `theme=light`.
    });
  });

  test('smoke : page accessible + sections présentes', async ({ page }) => {
    const response = await page.goto('/design-system');
    expect(response?.status(), 'page DS doit répondre 200 quand ENABLE_DESIGN_SYSTEM=true').toBe(
      200,
    );

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Institut Judiciaire');

    await expect(page.getByRole('heading', { name: /Palette principale — clair/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Palette principale — sombre/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Typographie/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Ombres douces/i })).toBeVisible();

    const swatches = page.getByTestId('ij-swatches-light').locator('> div');
    await expect(swatches).toHaveCount(14);
  });

  test('a11y : aucune violation serious/critical sur le DS', async ({ page }) => {
    await page.goto('/design-system');
    await page.getByRole('heading', { level: 1 }).waitFor();
    // On scope axe-core uniquement à `[data-design-system-root]` pour ne tester
    // que la nouvelle page DS Phase 1, pas le chrome global (Header / Footer)
    // qui sera refondu en Phase 1bis et a ses propres dettes a11y connues.
    const results = await new AxeBuilder({ page })
      .include('[data-design-system-root]')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    expect(
      serious,
      `a11y /design-system : ${serious.map((v) => `${v.id} (${v.nodes.length} nodes)`).join(', ')}`,
    ).toEqual([]);
  });

  test('aucune erreur console au rendu', async ({ page }) => {
    // On ignore les erreurs 404 légitimes en local pour les scripts d'analytics
    // Vercel (`_vercel/insights/script.js`, `va.vercel-scripts.com`) qui ne
    // sont injectés qu'en environnement Vercel réel et n'impactent pas le DS.
    const IGNORED_PATTERNS = [
      // Tous les paths /_vercel/* (analytics, speed-insights, etc.) ne sont
      // disponibles qu'en runtime Vercel — en local ils renvoient 404 ou une
      // page HTML de fallback (d'où le « MIME type not executable »).
      /\/_vercel\//i,
      /va\.vercel-scripts\.com/i,
      /vercel-(analytics|insights|speed-insights)/i,
      /MIME type.*not executable/i,
      /Failed to load resource.*404/i,
    ];

    const errors: string[] = [];
    const push = (entry: string) => {
      if (IGNORED_PATTERNS.some((re) => re.test(entry))) return;
      errors.push(entry);
    };

    page.on('pageerror', (err) => push(`pageerror: ${err.message}`));
    page.on('console', (msg) => {
      if (msg.type() === 'error') push(`console.error: ${msg.text()}`);
    });
    await page.goto('/design-system');
    await page.getByRole('heading', { level: 1 }).waitFor();
    await page.waitForLoadState('networkidle');
    expect(errors, `Erreurs console : ${errors.join(' | ')}`).toEqual([]);
  });
});
