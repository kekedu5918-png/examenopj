/** Normalisation pour comparaison tolérante des titres de cartouches. */
export function normalizeTitreArticulation(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function titreCartoucheMatcheReference(userTitre: string, referenceTitre: string): boolean {
  const u = normalizeTitreArticulation(userTitre);
  const r = normalizeTitreArticulation(referenceTitre);
  if (!u || !r) return false;
  const prefixLen = Math.min(18, r.length);
  const prefix = r.slice(0, prefixLen);
  return u.includes(prefix) || r.includes(u.slice(0, prefixLen));
}

export type CartoucheCheckItem = {
  ordreRef: number;
  titreReference: string;
  trouvee: boolean;
  /** Indice parmi les cartouches validées utilisateur (0-based) si trouvée */
  indexUtilisateur?: number;
};

export function evaluerCartouchesParRessource(
  titresReference: string[],
  titresUtilisateurValides: string[],
): { items: CartoucheCheckItem[]; ordreRespecte: boolean } {
  const utilisateurLibres = titresUtilisateurValides.map((t, i) => ({ t, i }));
  const items: CartoucheCheckItem[] = titresReference.map((titreReference, ordreRef) => {
    const idx = utilisateurLibres.findIndex((u) => titreCartoucheMatcheReference(u.t, titreReference));
    if (idx === -1) {
      return { ordreRef: ordreRef + 1, titreReference, trouvee: false };
    }
    const { i } = utilisateurLibres[idx]!;
    utilisateurLibres.splice(idx, 1);
    return { ordreRef: ordreRef + 1, titreReference, trouvee: true, indexUtilisateur: i };
  });

  const positions = items.filter((x) => x.trouvee).map((x) => x.indexUtilisateur!);
  let ordreRespecte = true;
  for (let k = 1; k < positions.length; k++) {
    if (positions[k]! < positions[k - 1]!) {
      ordreRespecte = false;
      break;
    }
  }

  return { items, ordreRespecte };
}
