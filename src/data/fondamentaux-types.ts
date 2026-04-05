export type Categorie = 'procedure' | 'droit-penal' | 'acteurs' | 'juridictions' | 'special';

export interface Regle {
  label: string;
  detail?: string;
  article?: string;
  alerte?: boolean;
}

export interface Tableau {
  colonnes: string[];
  lignes: string[][];
}

export interface Fiche {
  id: string;
  categorie: Categorie;
  titre: string;
  accroche: string;
  source: string;
  regles: Regle[];
  tableau?: Tableau;
  /** Lien vers la fiche synthétique du thème correspondant sur ExamenOPJ. */
  lienModule?: string;
  lienQuiz?: string;
}

export const CATEGORIES: Record<Categorie, { label: string; couleur: string }> = {
  procedure: { label: 'Procédure pénale', couleur: 'emerald' },
  'droit-penal': { label: 'Droit pénal', couleur: 'red' },
  acteurs: { label: 'Acteurs judiciaires', couleur: 'blue' },
  juridictions: { label: 'Juridictions', couleur: 'violet' },
  special: { label: 'Thèmes spéciaux', couleur: 'amber' },
};
