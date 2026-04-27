/**
 * Correspondance slug annexe B (`content/cours`) → chapitre(s) dans
 * `content/_sources/synthese-46-chapitres/chapitres-*.md` (titres `CHAPITRE N —`).
 *
 * Valeur : nombre unique ou tableau ordonné [primaire, secondaire, …]. L’enrichissement
 * fusionne stats (2+2…), plans, articles et blocs texte ; le schéma mémo provient du premier bloc.
 *
 * Référence rapide (écarts annexe vs synthèse) :
 * - `information-judiciaire` → CH11 (instruction) : pas de chapitre « IJ » isolé dans la synthèse.
 * - `auditions` / `perquisition` : numéros annexe 6–7 inversés par rapport à CH6/CH7 synthèse ; la carte suit la synthèse pour le contenu enrichi.
 * - `enlevement-sequestration` : absent de la synthèse sous ce thème → enrich manuel, slug dans SYNTHESE_ENRICH_SKIP_SLUGS.
 * - Paires fusionnées : vol+escroquerie 34+35 ; tentative+récidive 23+25 ; menaces+harcèlement 30+32 ; PM+mineurs/famille 21+40 ; sanctions+échelle/casier 24+26.
 *
 * @typedef {number | number[]} SyntheseChapterSpec
 */

/** @param {SyntheseChapterSpec | undefined | null} spec */
export function normalizeSyntheseChapters(spec) {
  if (spec == null) return [];
  return Array.isArray(spec) ? [...spec] : [spec];
}

export const SLUG_TO_SYNTHESE_CHAPTER = {
  'enquete-flagrance': 1,
  'enquete-preliminaire': 2,
  'information-judiciaire': 11,
  'police-judiciaire-statut': 3,
  'garde-a-vue': 5,
  'perquisition': 7,
  'auditions': 6,
  'controle-identite': 9,
  'requisition-commission-rogatoire': 8,
  'action-publique-opportunite': 10,
  /** Corps = instruction (JI) ; même chapitre synthèse que `information-judiciaire`. */
  'parquet-instruction': 11,
  'jld-mandats': 12,
  'mise-en-examen-instruction': 13,
  /** Poursuites, alternatives, modes de saisine (CH14). */
  'juridictions-jugement': 14,
  /** Cour d’assises, appel, juridictions répressives (CH15). */
  'assises-appel': 15,
  'nullites-procedure': 16,
  'classification-tripartite-application-loi': 17,
  'responsabilite-penale-personnes-physiques': 18,
  'causes-irresponsabilite-attenuation': 19,
  'usage-armes-forces-ordre': 20,
  'complicite-concours': 22,
  /** Tentative / repentir (CH23) + récidive, concours, cumul (CH25). */
  'tentative-recidive-circonstances': [23, 25],
  /** Personnes morales (CH21) + mineurs / famille synthèse (CH40). */
  'personne-morale-mineurs': [21, 40],
  'peines-modes-individuation': 24,
  'prescription-extinction': 17,
  /** Échelle des peines (CH24) + casier / mentions (CH26). */
  'sanction-penale': [24, 26],
  'homicides-atteintes-vie': 27,
  'violences-involontaires-integrite': 28,
  /** Menaces, torture, barbarie (CH30) + harcèlement, dignité (CH32). */
  'violences-menaces-harcelement': [30, 32],
  'viol-agressions-sexuelles': 31,
  'mineurs-cjpm': 41,
  'atteintes-aux-biens': 36,
  /** Vol et circonstances (CH34) + extorsion, escroquerie, abus de confiance (CH35). */
  'vols-escroquerie-extorsion': [34, 35],
  'stupefiants-usage': 38,
  'stupefiants-trafic': 38,
  'delits-circulation-routiere': 37,
  'atteintes-autorite-corruption': 42,
  'atteintes-nation-terrorisme': 42,
  'armes-materiel-guerre': 39,
  'traites-dignite-personne': 32,
  'infractions-numeriques': 33,
  'blanchiment-infractions-economiques': 36,
  'actualisation-lois-2025': 44,
  'outils-oral-entrainement': 45,
  'entrainement-session-2026': 46,
};

/** Fiches déjà rédigées « main » : ne pas écraser le frontmatter par la synthèse. */
export const SYNTHESE_ENRICH_SKIP_SLUGS = new Set([
  'enquete-flagrance',
  'causes-irresponsabilite-attenuation',
  'viol-agressions-sexuelles',
  /** Thème non couvert par un chapitre dédié dans la synthèse 46 — fiche maintenue à la main. */
  'enlevement-sequestration',
]);
