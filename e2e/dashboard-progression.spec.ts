import { expect, test } from '@playwright/test';

/**
 * Bug 0.3 — non-régression React #310 sur `/dashboard/progression`.
 *
 * Sans helper d'auth, on ne charge pas la page authentifiée elle-même —
 * la route redirige vers `/login`. Mais l'arbre layout root + providers
 * client (ThemeProvider, AnalyticsProviders, PageTransition,
 * SiteHeaderClient, SiteAmbientMotion, …) est rendu *avant* la
 * redirection serveur, et c'est précisément là que se logeait le crash.
 *
 * On surveille donc `pageerror` et `console.error` pendant toute la nav
 * et on échoue dès qu'un message contient `#310` ou
 * « Rendered more hooks than during the previous render ».
 */
test.describe('Dashboard progression — anti-régression React #310', () => {
  test('aucun crash React lors du rendu / redirection vers /login', async ({ page }) => {
    const errors: string[] = [];

    page.on('pageerror', (err) => {
      errors.push(`pageerror: ${err.message}`);
    });
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(`console.error: ${msg.text()}`);
      }
    });

    await page.goto('/dashboard/progression');

    /** Sans auth → redirection vers /login. */
    await expect(page).toHaveURL(/\/login/);

    /** Petite marge pour laisser le client hydrater et déclencher un éventuel #310. */
    await page.waitForLoadState('networkidle');

    const reactBugs = errors.filter((e) =>
      /#310\b|Rendered more hooks than during the previous render|Hooks can only be called/i.test(e),
    );

    expect(reactBugs, `Crash React détecté : ${reactBugs.join(' | ')}`).toEqual([]);
  });

  /**
   * Smoke complémentaire : on visite aussi `/dashboard` (root) sans auth
   * pour s'assurer que l'arbre dashboard layout côté client n'introduit
   * pas non plus de hook conditionnel.
   */
  test('aucun crash React lors du rendu de /dashboard', async ({ page }) => {
    const errors: string[] = [];

    page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
    });

    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
    await page.waitForLoadState('networkidle');

    const reactBugs = errors.filter((e) =>
      /#310\b|Rendered more hooks than during the previous render|Hooks can only be called/i.test(e),
    );

    expect(reactBugs, `Crash React détecté : ${reactBugs.join(' | ')}`).toEqual([]);
  });
});
