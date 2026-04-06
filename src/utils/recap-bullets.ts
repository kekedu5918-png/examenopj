/**
 * Découpe un champ récap (matériel / moral) pour l’onglet Récapitulatif :
 * chaque segment séparé par un saut de ligne ou par « / » devient une puce à part.
 * (Les données source utilisent souvent « élément1 / élément2 » sur une seule ligne.)
 */
function stripLeadingBullet(s: string): string {
  return s.replace(/^\s*[-–•·.]+\s*/, '').trim();
}

function splitLineBySlash(line: string): string[] {
  return line
    .split(/\s*\/\s*/)
    .map((s) => stripLeadingBullet(s.trim()))
    .filter(Boolean);
}

export function splitRecapElements(text: string): string[] {
  const t = text.trim();
  if (!t || t === '—') return [];

  const lines = t
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const out: string[] = [];
  for (const line of lines) {
    out.push(...splitLineBySlash(line));
  }
  return out;
}
