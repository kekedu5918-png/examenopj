/**
 * Découpe un markdown en sections pour accordéons (tout bloc avant le premier ## + chaque ##).
 */
export function splitMarkdownByH2(markdown: string): Array<{ id: string; title: string; bodyMd: string }> {
  const trimmed = markdown.trim();
  if (!trimmed) return [];

  const re = /^## (.+)$/gm;
  const matches = [...trimmed.matchAll(re)];
  const out: Array<{ id: string; title: string; bodyMd: string }> = [];

  if (matches.length === 0) {
    return [{ id: 'contenu', title: 'Contenu', bodyMd: trimmed }];
  }

  const head = trimmed.slice(0, matches[0].index!).trim();
  if (head) {
    out.push({ id: 'intro', title: 'Introduction et repères', bodyMd: head });
  }

  for (let i = 0; i < matches.length; i++) {
    const title = matches[i][1].trim();
    const start = matches[i].index! + matches[i][0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index! : trimmed.length;
    const bodyMd = trimmed.slice(start, end).trim();
    const slug =
      title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 48) || `section-${i}`;
    out.push({ id: `h2-${i}-${slug}`, title, bodyMd });
  }

  return out;
}

/** Retire le premier titre `# …` pour éviter le doublon avec le hero V3. */
export function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^\s*#\s[^\n]*\n+/u, '').trimStart();
}
