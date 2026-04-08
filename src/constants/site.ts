/** Date affichée (contenu / déploiement) — mettre à jour lors des releases majeures. */
export const SITE_LAST_UPDATED_ISO = '2026-04-08';
export const SITE_LAST_UPDATED_LABEL = '8 avril 2026';

/** Preuve sociale (valeurs éditoriales — à ajuster si stats réelles disponibles). */
export const SITE_SOCIAL_PROOF = {
  registeredCandidates: 147,
  avgQuizScoreLabel: '14,2/20',
} as const;

/** Identité produit (unique source pour libellés UI / SEO / intégrations). */
export const APP_NAME = 'ExamenOPJ';
export const APP_TAGLINE = "Révisions pour l'examen OPJ";

export const EXAM_DATE = new Date('2026-06-15');
export const EXAM_LABEL = 'Juin 2026';
export const EXAM_YEAR = 2026;
export const PROGRAM_VERSION = 'Programme officiel en vigueur';

/** Mots-clés SEO (page d’accueil / marque) — à enrichir avec vos requêtes Analytics Search Console. */
export const SEO_KEYWORDS = [
  'examen OPJ',
  'officier de police judiciaire',
  'révision OPJ 2026',
  'cours OPJ',
  'droit pénal police',
  'procédure pénale',
  'quiz OPJ',
  'préparation examen OPJ',
  'guide révision OPJ',
  'méthodologie examen OPJ',
] as const;
