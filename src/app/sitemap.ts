import type { MetadataRoute } from 'next';

import { COURSE_MODULE_IDS } from '@/data/fascicules-list';
import { FICHES } from '@/data/fondamentaux-data';
import { getSujetsBlancsIds } from '@/data/sujets-blancs';
import { getSiteUrl } from '@/utils/site-url';

function priorityForPath(path: string): number {
  if (path === '') return 1;
  if (path === '/cours/modules' || path === '/infractions') return 0.9;
  if (path === '/guide-revision-opj') return 0.85;
  if (path.startsWith('/cours/modules/')) return 0.75;
  if (path === '/pricing' || path === '/fondamentaux' || path.startsWith('/epreuves')) return 0.8;
  if (path.startsWith('/sujets-blancs')) return 0.72;
  if (path.startsWith('/entrainement')) return 0.65;
  return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const mainPages = [
    '',
    '/programme',
    '/fondamentaux',
    '/pricing',
    '/a-propos',
    '/contact',
    '/cgv',
    '/mentions-legales',
    '/guide-revision-opj',
  ];

  const coursPages = ['/cours', '/parcours-opj', '/cours/pv', '/cours/modules', '/cours/enquetes'];

  const epreuvesPages = ['/epreuves', '/epreuves/epreuve-1', '/epreuves/epreuve-2', '/epreuves/epreuve-3'];

  /** Hub entraînement + URLs canoniques quiz/flashcards (`/entrainement/quiz` → redirect `/quiz`, idem flashcards). */
  const entrainementPages = [
    '/entrainement',
    '/quiz',
    '/flashcards',
    '/entrainement/recapitulatif',
    '/entrainement/articulation',
    '/entrainement/redaction-pv',
    '/entrainement/rapport-synthese',
    '/parcours-candidat',
    '/sujets-blancs',
  ];

  const infractionsPages = ['/infractions'];

  const allStaticPaths = [
    ...mainPages,
    ...coursPages,
    ...epreuvesPages,
    ...entrainementPages,
    ...infractionsPages,
  ];

  const staticEntries: MetadataRoute.Sitemap = allStaticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: priorityForPath(path),
  }));

  const moduleEntries: MetadataRoute.Sitemap = COURSE_MODULE_IDS.map((id) => ({
    url: `${base}/cours/modules/${id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: priorityForPath(`/cours/modules/${id}`),
  }));

  const fondamentauxFicheEntries: MetadataRoute.Sitemap = FICHES.filter((f) => !f.ficheCanoniqueId).map((f) => ({
    url: `${base}/fondamentaux/${f.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.72,
  }));

  const sujetsBlancsEntries: MetadataRoute.Sitemap = getSujetsBlancsIds().map((id) => ({
    url: `${base}/sujets-blancs/${id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: priorityForPath(`/sujets-blancs/${id}`),
  }));

  return [...staticEntries, ...moduleEntries, ...fondamentauxFicheEntries, ...sujetsBlancsEntries];
}
