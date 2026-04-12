/** Construit `path` + query string pour préserver les paramètres lors d'une redirection canonique. */
export function pathWithSearchParams(
  path: string,
  searchParams: Record<string, string | string[] | undefined> | undefined,
): string {
  if (!searchParams || Object.keys(searchParams).length === 0) return path;
  const q = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) value.forEach((v) => q.append(key, v));
    else q.set(key, value);
  }
  const s = q.toString();
  return s ? `${path}?${s}` : path;
}
