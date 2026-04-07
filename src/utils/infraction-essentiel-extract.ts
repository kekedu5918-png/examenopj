/**
 * Réduction des textes fascicule vers l’essentiel demandé au concours :
 * élément légal (référence unique), matériel et moral courts (hors jurisprudence détaillée).
 */

/** Référence légale : une ligne — article qui définit et réprime (Code pénal). */
export function legalArticleOnly(article: string, texte: string): string {
  const a = article.replace(/\s+/g, ' ').trim();
  if (a.length > 0) return a;
  const t = texte.replace(/\s+/g, ' ').trim();
  const first = t.split('\n')[0]?.trim();
  return first ?? t;
}

const BULLET_CHARS = /[\uF020-\uF0FF•·]/g;

/** Coupe avant tout bloc « Jurisprudence » et garde le début utile (élément principal). */
export function essentielElementBloc(contenuComplet: string, maxChars = 420): string {
  let s = contenuComplet.replace(/\r/g, '\n').replace(BULLET_CHARS, '');
  const jp = s.search(/\n\s*Jurisprudence\s*[:.\s]/i);
  if (jp >= 0) s = s.slice(0, jp);
  s = s.replace(/\n{3,}/g, '\n\n').trim();
  const lines = s
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  let out = '';
  for (const line of lines) {
    if (out.length + line.length + 1 > maxChars) break;
    out = out ? `${out}\n${line}` : line;
  }
  out = out.trim();
  if (out.length > maxChars) {
    out = out.slice(0, maxChars);
    const cut = out.lastIndexOf(' ');
    if (cut > maxChars * 0.55) out = out.slice(0, cut);
    out = `${out.trim()}…`;
  }
  return out;
}
