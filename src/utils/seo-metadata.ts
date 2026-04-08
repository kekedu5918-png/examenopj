import type { Metadata } from 'next';

import { getSiteUrl } from '@/utils/site-url';

/** Image Open Graph unique (1200×630, `public/og-image.png`). */
export const OG_IMAGE_PATH = '/og-image.png';

export function openGraphForPage(
  path: string,
  title: string,
  description: string,
): Pick<Metadata, 'openGraph' | 'twitter'> {
  const site = getSiteUrl();
  const url = `${site}${path.startsWith('/') ? path : `/${path}`}`;
  const images = [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: title }];
  return {
    openGraph: {
      title,
      description,
      url,
      siteName: 'ExamenOPJ',
      locale: 'fr_FR',
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${site}${OG_IMAGE_PATH}`],
    },
  };
}
