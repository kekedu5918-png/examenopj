import type { MetadataRoute } from 'next';

import { FASCICULES } from '@/data/fascicules-list';
import { getSiteUrl } from '@/utils/site-url';

const PUBLIC_PATHS = [
  '',
  '/fascicules',
  '/cours',
  '/cours/pv',
  '/entrainement',
  '/entrainement/quiz',
  '/entrainement/flashcards',
  '/entrainement/recapitulatif',
  '/infractions',
  '/epreuves/epreuve-1',
  '/epreuves/epreuve-2',
  '/epreuves/epreuve-3',
  '/pricing',
  '/contact',
  '/cgv',
  '/mentions-legales',
  '/a-propos',
  '/guide-revision-opj',
  '/fondamentaux',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = PUBLIC_PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.85,
  }));

  const fasciculeEntries: MetadataRoute.Sitemap = FASCICULES.map((f) => ({
    url: `${base}/fascicules/${f.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticEntries, ...fasciculeEntries];
}
