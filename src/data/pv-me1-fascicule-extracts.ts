/**
 * Extraits structurants issus du fascicule officiel ME1 « La procédure pénale policière »
 * (session Examen OPJ juin 2026, version indiquée au 01/12/2025 dans le document source).
 * Reproduction locale à des fins pédagogiques sur ExamenOPJ — conserver le PDF diffuseur comme référence.
 */

/** Exemple p. 127 — enquête de voisinage (corps type, pagination 1–8). */
export const PV_ME1_VERBATIM_ENQUETE_VOISINAGE = `RÉPUBLIQUE FRANÇAISE
MINISTÈRE DE L’INTÉRIEUR
DIRECTION GÉNÉRALE DE LA POLICE NATIONALE
DIRECTION NATIONALE DE LA SÉCURITÉ PUBLIQUE
__________
(ADRESSE ET COORDONNÉES)
(DU SERVICE)
CODE INSEE :
P.V. : n°…/…
__________
PROCÈS-VERBAL
PV n° …/…/…
L’an (année),
Le (jour, mois), à (heures, minutes)
Nous, (Prénom, NOM)
(Grade du rédacteur)
En fonction à (service) de (VILLE)
OFFICIER DE POLICE JUDICIAIRE en résidence à (VILLE),
AFFAIRE :
C/ (Prénom, NOM)
(qualification de l’infraction)
OBJET :
ENQUÊTE DE VOISINAGE
1 … 2 … 3 … 4 … 5 … 6 … 7 … 8 …
--- Poursuivant l'enquête de flagrance.------------------------------
--- Vu les articles 53 et suivants du C.P.P.---------------------------
--- Nous trouvant (…).------------------------------------------------
--- Procédons à une enquête de voisinage dans les environs et
plus particulièrement (…).--------------------------------------------
--- De l'ensemble des personnes contactées, seulement (nombre
de personnes) sont susceptibles de fournir des éléments
intéressant l'enquête.-------------------------------------------------
--- Il s'agit de :--------------------------------------------------------
--- M. (NOM Prénom, domicile, téléphone);-------------------------
--- Mme (NOM Prénom, domicile, téléphone).-----------------------
--- Ces personnes ont été invitées à se présenter au service.------
--- Dont Procès-verbal.-----------------------------------------------
L’Officier de Police Judiciaire`;

/** Articulation audition de témoin — relevé ME1 (10 points). */
export const PV_ME1_ARTICULATION_AUDITION_TEMOIN = [
  'Lieu de rédaction du P.V.',
  'Cadre juridique et visa des articles',
  'Assistants éventuels',
  'Mode de comparution du témoin (spontané / convocation)',
  'Petite identité (état civil, domicile, téléphones…)',
  'Rubrique des faits (chronologie, récit / Q-R si nécessaire)',
  'Droits du témoin selon le cadre (62 / 78 / 153)',
  'Relecture et signature',
  'Mention durée si retenue ≤ 4 h (art. 62 al. 2)',
  'Clôture et annexes éventuelles',
] as const;

/** Exemple interpellation — structure 12 points (ME1 p. 132). */
export const PV_ME1_ARTICULATION_INTERPELLATION = [
  'Mission exacte et lieu',
  'Assistants',
  'Constatations',
  'Base juridique du contrôle d’identité',
  'Palpation de sécurité',
  'Cadre juridique (flagrance / délit apparent)',
  'Interpellation et heure',
  'Identification',
  'Notification GAV et droits',
  'Représentation / saisie-scellé',
  'Clôture',
  'Recherches administratives',
] as const;
