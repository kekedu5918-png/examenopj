/** Évite les redirections ouvertes : chemins internes uniquement (`/foo`, pas `//evil.com`). */
export function safeInternalPath(raw: string | null | undefined, fallback = '/dashboard'): string {
  if (raw == null || typeof raw !== 'string') return fallback;
  const t = raw.trim();
  if (!t.startsWith('/') || t.startsWith('//')) return fallback;
  return t;
}
