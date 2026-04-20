import AxeBuilder from '@axe-core/playwright';

import { expect, test } from './fixtures';

async function expectNoSeriousA11yViolations(page: import('@playwright/test').Page, path: string) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  expect(serious, `a11y ${path}: ${serious.map((v) => v.id).join(', ')}`).toEqual([]);
}

/** `vue=liste` évite le mode tableau (localStorage / URL) ; le shell client doit être hydraté. */
async function gotoInfractionsListe(page: import('@playwright/test').Page) {
  await page.goto('/infractions?vue=liste', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: 'Infractions', level: 1 })).toBeVisible({ timeout: 30_000 });
  await expect(page.getByRole('searchbox', { name: /Rechercher une infraction/i })).toBeVisible({ timeout: 30_000 });
}

test.describe('/infractions — Phase 2D (liste)', () => {
  test.describe.configure({ mode: 'serial' });

  test('axe : pas de violation serious/critical', async ({ page }) => {
    await gotoInfractionsListe(page);
    await expectNoSeriousA11yViolations(page, '/infractions');
  });

  test('reduced-motion : data-reduced-motion sur grille et cartes', async ({ page }) => {
    // Avant navigation : `matchMedia` + hook `usePrefersReducedMotion` alignés (Framer `useReducedMotion` non fiable en e2e).
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await gotoInfractionsListe(page);
    await expect(page.getByTestId('infractions-grid')).toHaveAttribute('data-reduced-motion', 'true', { timeout: 30_000 });
    // Accordéon Radix : les cartes ne sont pas montées tant que le groupe n’est pas ouvert.
    await page.getByTestId('infractions-grid').locator('button').first().click();
    await expect(page.getByTestId('infraction-card').first()).toHaveAttribute('data-reduced-motion', 'true', {
      timeout: 15_000,
    });
  });

  test('clavier : recherche focusable + carte visible dans un groupe ouvert', async ({ page }) => {
    await gotoInfractionsListe(page);
    const search = page.getByRole('searchbox', { name: /Rechercher une infraction/i });
    await search.focus();
    await expect(search).toBeFocused();
    // Même remarque que reduced-motion : accordéon fermé = pas de cartes dans le DOM (Radix).
    await page.getByTestId('infractions-grid').locator('button').first().click();
    await expect(page.getByTestId('infraction-card').first()).toBeVisible({ timeout: 15_000 });
  });
});
