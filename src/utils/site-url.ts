/** URL publique du site (SEO, sitemap, Open Graph). Sans slash final. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return raw.replace(/\/$/, '');
}
