import type { MetadataRoute } from 'next';

import { listMarkdownBasenames, slugFromBasename } from '@/lib/content/markdown';
import { getSiteUrl } from '@/utils/site-url';

function priorityForPath(path: string): number {
  if (path === '') return 1;
  if (path === '/cours' || path === '/infractions') return 0.9;
  if (path === '/pricing' || path === '/premium' || path.startsWith('/epreuves')) return 0.8;
  if (path.startsWith('/entrainement')) return 0.65;
  if (path.startsWith('/cours/')) return 0.75;
  return 0.7;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const mainPages = [
    '',
    '/pricing',
    '/premium',
    '/a-propos',
    '/contact',
    '/cgv',
    '/mentions-legales',
  ];

  const coursPages = ['/cours'];

  const epreuvesPages = ['/epreuves', '/epreuves/epreuve-1', '/epreuves/epreuve-2', '/epreuves/epreuve-3'];

  const entrainementPages = [
    '/entrainement',
    '/entrainement/parcours/cadres-enquetes',
    '/entrainement/quiz',
    '/entrainement/flashcards',
    '/entrainement/enquetes',
    '/entrainement/recapitulatif',
    '/entrainement/articulation',
    '/entrainement/redaction-pv',
    '/entrainement/rapport-synthese',
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

  const coursBasenames = await listMarkdownBasenames('cours');
  const coursFicheEntries: MetadataRoute.Sitemap = coursBasenames.map((b) => {
    const slug = slugFromBasename(b);
    const p = `/cours/${slug}`;
    return {
      url: `${base}${p}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: priorityForPath(p),
    };
  });

  return [...staticEntries, ...coursFicheEntries];
}
