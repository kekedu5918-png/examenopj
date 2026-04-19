import type { MetadataRoute } from 'next';

import { ENQUETES } from '@/data/enquetes-data';
import { listMarkdownBasenames, slugFromBasename } from '@/lib/content/markdown';
import { getSiteUrl } from '@/utils/site-url';

function priorityForPath(path: string): number {
  if (path === '') return 1;
  if (path === '/fondamentaux' || path === '/infractions' || path === '/enquetes') return 0.9;
  if (path === '/pricing' || path.startsWith('/epreuves')) return 0.8;
  if (path.startsWith('/entrainement')) return 0.65;
  if (path.startsWith('/fondamentaux/')) return 0.75;
  if (path.startsWith('/enquetes/')) return 0.75;
  return 0.7;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  /** `/premium` est volontairement omis (redirection 301 vers `/pricing`). */
  const mainPages = [
    '',
    '/pricing',
    '/a-propos',
    '/contact',
    '/cgv',
    '/mentions-legales',
  ];

  const pillarPages = ['/fondamentaux', '/enquetes'];

  const epreuvesPages = ['/epreuves', '/epreuves/epreuve-1', '/epreuves/epreuve-2', '/epreuves/epreuve-3'];

  const entrainementPages = [
    '/entrainement',
    '/entrainement/parcours/cadres-enquetes',
    '/entrainement/quiz',
    '/entrainement/flashcards',
    '/entrainement/recapitulatif',
    '/entrainement/articulation',
    '/entrainement/redaction-pv',
    '/entrainement/rapport-synthese',
  ];

  const infractionsPages = ['/infractions'];

  const allStaticPaths = [
    ...mainPages,
    ...pillarPages,
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

  const coursBasenames = await listMarkdownBasenames('cours');
  const fondamentauxFicheEntries: MetadataRoute.Sitemap = coursBasenames.map((b) => {
    const slug = slugFromBasename(b);
    const p = `/fondamentaux/${slug}`;
    return {
      url: `${base}${p}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: priorityForPath(p),
    };
  });

  /** Enquêtes dynamiques — chaque scénario a une URL canonique indexable. */
  const enqueteEntries: MetadataRoute.Sitemap = ENQUETES.map((e) => {
    const p = `/enquetes/${e.id}`;
    return {
      url: `${base}${p}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: priorityForPath(p),
    };
  });

  return [...staticEntries, ...fondamentauxFicheEntries, ...enqueteEntries];
}
