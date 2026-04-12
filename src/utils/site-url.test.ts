import { afterEach, describe, expect, it, vi } from 'vitest';

describe('getSiteUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('retire le slash final', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://examenopj.fr/');
    const { getSiteUrl } = await import('@/utils/site-url');
    expect(getSiteUrl()).toBe('https://examenopj.fr');
  });

  it('utilise localhost par défaut en développement', async () => {
    vi.unstubAllEnvs();
    vi.stubEnv('NODE_ENV', 'development');
    const { getSiteUrl } = await import('@/utils/site-url');
    expect(getSiteUrl()).toBe('http://localhost:3000');
  });

  it('utilise examenopj.fr en production si NEXT_PUBLIC_SITE_URL est absent', async () => {
    vi.unstubAllEnvs();
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', '');
    vi.stubEnv('NODE_ENV', 'production');
    vi.resetModules();
    const { getSiteUrl } = await import('@/utils/site-url');
    expect(getSiteUrl()).toBe('https://examenopj.fr');
  });
});
