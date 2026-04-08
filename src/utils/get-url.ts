import { getSiteUrl } from '@/utils/site-url';

/** URL absolue du site + chemin optionnel (callbacks Supabase, redirections). */
export function getURL(path = ''): string {
  const base = getSiteUrl();
  const cleanPath = path.replace(/^\/+/, '');
  return cleanPath ? `${base}/${cleanPath}` : base;
}
