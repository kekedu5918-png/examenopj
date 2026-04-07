/** Aligné sur reference/audit/infractions_officielles.json — champs optionnels selon extraction. */

export type InfractionOfficielleMeta = {
  version: string;
  source_principale?: string;
  cahier_maj?: string;
  genere_le?: string;
  note?: string;
};

export type InfractionOfficielleRecord = {
  id: string;
  fascicule: string;
  verification?: string;
  titre: string;
  accroche: string;
  element_legal: { article: string; formulation_exacte: string };
  element_materiel: { points: { titre: string; sous_points: string[] }[] };
  element_moral: { titre: string; texte: string };
  circonstances_aggravantes: { degre: string }[];
  repression: { qualification: string; article: string; peines: string }[];
  tentative: string;
  complicite: string;
  maj_2025: boolean;
  badge_maj: string | null;
  pieges_examen?: string[];
  notes_audit?: string;
};
