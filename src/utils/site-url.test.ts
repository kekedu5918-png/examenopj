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

  it('utilise localhost par défaut', async () => {
    vi.unstubAllEnvs();
    const { getSiteUrl } = await import('@/utils/site-url');
    expect(getSiteUrl()).toBe('http://localhost:3000');
  });
});
