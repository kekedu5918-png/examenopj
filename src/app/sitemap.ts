import type { MetadataRoute } from 'next';

import { FASCICULES } from '@/data/fascicules-list';
import { getSiteUrl } from '@/utils/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const mainPages = [
    '',
    '/fondamentaux',
    '/pricing',
    '/a-propos',
    '/contact',
    '/cgv',
    '/mentions-legales',
    '/guide-revision-opj',
  ];

  const coursPages = ['/cours', '/cours/pv'];

  const epreuvesPages = ['/epreuves/epreuve-1', '/epreuves/epreuve-2', '/epreuves/epreuve-3'];

  const entrainementPages = [
    '/entrainement',
    '/entrainement/quiz',
    '/entrainement/flashcards',
    '/entrainement/recapitulatif',
  ];

  const fasciculesHub = ['/fascicules'];

  const infractionsPages = ['/infractions'];

  const allStaticPaths = [
    ...mainPages,
    ...coursPages,
    ...epreuvesPages,
    ...entrainementPages,
    ...fasciculesHub,
    ...infractionsPages,
  ];

  const staticEntries: MetadataRoute.Sitemap = allStaticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.startsWith('/entrainement') ? 0.9 : 0.7,
  }));

  const fasciculeEntries: MetadataRoute.Sitemap = FASCICULES.map((f) => ({
    url: `${base}/fascicules/${f.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...fasciculeEntries];
}
