export type CartoucheData = {
  id: number;
  date: string;
  heure: string;
  qualite: string;
  titre: string;
  contenu: string;
  valide: boolean;
};

export const QUALITE_OPTIONS = [
  'OPJ',
  'OPJ 2',
  'OPJ (permanence de nuit)',
  'APJ',
  'APJ sur instructions OPJ',
] as const;

export function formatContenuLignes(contenu: string): string[] {
  const lines = contenu.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  return lines.map((l) => (l.startsWith('-') ? l : `- ${l}`));
}

export function coteLabel(id: number): string {
  return String(id).padStart(2, '0');
}
