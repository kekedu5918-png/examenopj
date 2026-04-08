export type Flashcard = {
  id: string;
  fascicule: number;
  domaine: 'DPS' | 'DPG' | 'Procédure pénale';
  nom: string;
  materiel: string[];
  moral: string;
  legal: string;
  peines?: string;
  tentative?: string;
  complicite?: string;
  categorie?: string;
  /** Filtre navigation (ex. atteintes-aux-biens) */
  categorieSlug?: string;
  groupe?: string;
  definitionCourte?: string;
  materielMoralComplet?: string;
  versoFooter?: string;
};
