import { readFileSync } from 'fs';
import { join } from 'path';

/** Lecture serveur du fichier .txt d’audit (ne pas importer depuis un composant client). */
export function readFasciculeAuditTxt(fileName: string): string {
  const p = join(process.cwd(), 'reference', 'audit', 'fascicules', fileName);
  return readFileSync(p, 'utf8');
}

/** Retire l’en-tête markdown (# F0X — …) jusqu’au début du fascicule « Fascicule n° ». */
export function stripAuditMarkdownFrontmatter(raw: string): string {
  const m = raw.match(/^Fascicule n°/m);
  if (m && m.index != null) return raw.slice(m.index);
  const v = raw.search(/Version au \d{2}\/\d{2}\/\d{4}/);
  if (v >= 0) return raw.slice(v);
  return raw.trim();
}
