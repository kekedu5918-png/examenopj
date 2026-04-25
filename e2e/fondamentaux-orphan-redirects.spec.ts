import { test, expect } from '@playwright/test';

/**
 * Phase 2F.2 — redirections 301 (ou 308 Next permanent) pour anciens slugs orphelins.
 * Requêtes sans suivi de redirection pour lire Location.
 */
const TO_HUB: readonly string[] = [
  '/fondamentaux/cadres-enquete',
  '/fondamentaux/crimes-biens',
  '/fondamentaux/crimes-personnes',
  '/fondamentaux/fouille-vehicule',
  '/fondamentaux/instruction-mandats',
  '/fondamentaux/libertes-publiques',
  '/fondamentaux/saisies-scelles',
];

const TARGET_200 = '/fondamentaux';

test.describe('2F.2 — 301 orphelins fondamentaux', () => {
  for (const path of TO_HUB) {
    test(`${path} → hub`, async ({ request }) => {
      const res = await request.get(path, { maxRedirects: 0 });
      expect([301, 308, 302].includes(res.status())).toBeTruthy();
      const loc = res.headers()['location'];
      expect(loc, 'Location absente').toBeTruthy();
      const url = new URL(loc!, 'http://localhost');
      expect(url.pathname).toBe(TARGET_200);
    });
  }

  test('/fondamentaux/loi-penale-responsabilite → classification tripartite (ch. 17)', async ({ request }) => {
    const res = await request.get('/fondamentaux/loi-penale-responsabilite', { maxRedirects: 0 });
    expect([301, 308, 302].includes(res.status())).toBeTruthy();
    const loc = res.headers()['location'];
    expect(loc).toBeTruthy();
    const url = new URL(loc!, 'http://localhost');
    expect(url.pathname).toBe('/fondamentaux/classification-tripartite-application-loi');
  });
});
