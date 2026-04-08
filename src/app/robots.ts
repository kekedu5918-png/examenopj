import type { MetadataRoute } from 'next';

import { getSiteUrl } from '@/utils/site-url';

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/account/',
          '/manage-subscription',
          '/login',
          '/inscription',
          '/auth/callback',
          '/callback',
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: new URL(base).host,
  };
}
