export type Categorie = 'procedure' | 'droit-penal' | 'acteurs' | 'juridictions';

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
  lienFascicule?: string;
  lienQuiz?: string;
}

export const CATEGORIES: Record<Categorie, { label: string; couleur: string }> = {
  procedure: { label: 'Procédure pénale', couleur: 'emerald' },
  'droit-penal': { label: 'Droit pénal', couleur: 'red' },
  acteurs: { label: 'Acteurs judiciaires', couleur: 'blue' },
  juridictions: { label: 'Juridictions', couleur: 'violet' },
};
