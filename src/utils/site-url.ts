/** URL publique du site (SEO, sitemap, Open Graph). Sans slash final. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv && fromEnv.length > 0) {
    return fromEnv.replace(/\/$/, '');
  }
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  // Production (ex. Vercel) : domaine custom par défaut si la variable n’est pas définie
  return 'https://examenopj.fr';
}
