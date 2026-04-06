import type { PVBloc } from '@/types/pv';

/** Entête colonne gauche — modèles plainte F11 (SDCP). */
export const SDCP_ENTETE_GAUCHE_PLAINTE: string[] = [
  'RÉPUBLIQUE FRANÇAISE',
  "MINISTÈRE DE L'INTÉRIEUR",
  'DIRECTION GÉNÉRALE DE',
  'LA POLICE NATIONALE',
  'DIRECTION NATIONALE DE',
  'LA SÉCURITÉ PUBLIQUE',
  '__________',
  '(ADRESSE ET COORDONNÉES)',
  '(DU SERVICE)',
  'CODE INSEE :',
  'P.V. : n°…/…',
  '__________',
];

/** Incipit colonne droite — modèles plainte F11 (SDCP). */
export const SDCP_ENTETE_DROIT_PLAINTE: string[] = [
  'PROCÈS-VERBAL',
  'PV n° …/…/…',
  '',
  'L’an (année),',
  'Le (jour, mois), à (heures, minutes)',
  '',
  'Nous, (Prénom, NOM)',
  '(Grade du rédacteur)',
  'En fonction à (service) de (VILLE)',
  '',
  'OFFICIER DE POLICE JUDICIAIRE en résidence à (VILLE),',
];

/** Marge gauche type plainte avec victime (modèle 1). */
export const SDCP_MARGIN_PLAINTE_OBJET_VICTIME: string[] = [
  'AFFAIRE :',
  '',
  'C/ (Prénom, NOM)',
  '',
  "(qualification de l'infraction)",
  '',
  'OBJET :',
  '',
  'Plainte de :',
  'Prénom, NOM, âge,',
  'profession, domicile',
];

export const SDCP_CORPS_PLAINTE_R1_R2: PVBloc[] = [
  {
    type: 'rubrique-numerotee',
    numero: 1,
    texte: '--- Étant au service,---------------------------------------------------',
  },
  {
    type: 'rubrique-numerotee',
    numero: 2,
    texte:
      '--- Constatons que se présente M.(prénom, nom) qui nous informe avoir été victime d\'un (infraction) commis à (lieu), ce jour (date) entre (heure) et (heure).--------------------------------',
  },
];

export const SDCP_CORPS_PLAINTE_R3_R4: PVBloc[] = [
  {
    type: 'rubrique-numerotee',
    numero: 3,
    texte:
      "--- Agissant en flagrant délit.-----------------------------------------\n--- Vu les articles 53 et suivants du code de procédure pénale.----",
  },
  {
    type: 'rubrique-numerotee',
    numero: 4,
    texte:
      "--- Informons M. (prénom, nom) des droits mentionnés à l'article 10-2 du code de procédure pénale et l'entendons comme suit :- - -\n--- «J'ai pris connaissance de mes droits et me réserve la possibilité d'y recourir à tout moment». ----------------------------",
  },
];

/** De la rubrique « SUR SON IDENTITÉ » jusqu'aux mentions finales incluses. */
export const SDCP_CORPS_PLAINTE_SUITE_IDENTITE_A_FIN: PVBloc[] = [
  { type: 'paragraphe', texte: '--- SUR SON IDENTITÉ :--------------------------------------------' },
  {
    type: 'rubrique-numerotee',
    numero: 5,
    texte: '--- (petite identité)----------------------------------------------------',
  },
  { type: 'paragraphe', texte: '--- SUR LES FAITS :----------------------------------------------' },
  {
    type: 'rubrique-numerotee',
    numero: 6,
    texte: '--- (déclarations de la victime)---------------------------------------',
  },
  {
    type: 'rubrique-numerotee',
    numero: 7,
    texte: '--- «Je dépose plainte contre X. pour (…).---------------------------',
  },
  {
    type: 'rubrique-numerotee',
    numero: 8,
    texte: '--- Je vous remets (…).-----------------------------------------------',
  },
  {
    type: 'rubrique-numerotee',
    numero: 9,
    texte:
      '--- Je souhaite obtenir la copie de mon procès-verbal de dépôt de plainte».---------------------------------------------------------------',
  },
  {
    type: 'rubrique-numerotee',
    numero: 10,
    texte:
      '--- Après lecture faite personnellement, M. (prénom, nom) persiste et signe le présent avec nous.------------------------------',
  },
  { type: 'signature', signataires: ["L'intéressé", "L'Officier de Police Judiciaire"] },
  { type: 'annexe', texte: '--- Annexons au présent (…).-----------------------------------------' },
  {
    type: 'mention',
    texte:
      "--- Remettons à la victime le formulaire d'information des droits des victimes, un récépissé de sa plainte et la copie du présent procès-verbal.---------------------------------------------------------",
  },
  {
    type: 'mention',
    texte: '--- Avisons Monsieur le procureur de la République à (ville) etc.---',
  },
];

/** Ouverture « hors locaux » — enchaîne avec `renumberRubriquesAPartirDe(SDCP_CORPS_PLAINTE_SUITE_IDENTITE_A_FIN, 9)`. */
export const SDCP_CORPS_PLAINTE_HORS_LOCAUX_OUVERTURE: PVBloc[] = [
  {
    type: 'rubrique-numerotee',
    numero: 1,
    texte: '--- Étant au service,---------------------------------------------------',
  },
  {
    type: 'rubrique-numerotee',
    numero: 2,
    texte: '--- Sommes avisé (relation succincte des faits).--------------------',
  },
  {
    type: 'rubrique-numerotee',
    numero: 3,
    texte: '--- Agissant en (flagrant délit ou enquête préliminaire).------------',
  },
  {
    type: 'rubrique-numerotee',
    numero: 4,
    texte: '--- Vu les articles.-----------------------------------------------------',
  },
  {
    type: 'rubrique-numerotee',
    numero: 5,
    texte: '--- Nous transportons (adresse).-------------------------------------',
  },
  {
    type: 'rubrique-numerotee',
    numero: 6,
    texte: '--- Où étant à (heure).------------------------------------------------',
  },
  {
    type: 'rubrique-numerotee',
    numero: 7,
    texte: '--- Prenons contact avec… (petite identité).-------------------------',
  },
  {
    type: 'rubrique-numerotee',
    numero: 8,
    texte:
      "--- L'informons des droits mentionnés à l'article 10-2 du code de procédure pénale et l'entendons comme suit :----------------------",
  },
];

export const SDCP_CORPS_PLAINTE_POURSUITE_INSERT: PVBloc[] = [
  {
    type: 'rubrique-numerotee',
    numero: 2,
    texte: "--- Poursuivant l'enquête (préliminaire, de flagrance).--------------",
  },
  {
    type: 'rubrique-numerotee',
    numero: 3,
    texte: '--- Vu les articles.-----------------------------------------------------',
  },
  {
    type: 'rubrique-numerotee',
    numero: 4,
    texte: '--- Avons mandé et constatons que se présente.-------------------',
  },
];

export function renumberRubriquesAPartirDe(blocs: PVBloc[], start: number): PVBloc[] {
  let n = start;
  return blocs.map((b) => {
    if (b.type === 'rubrique-numerotee') {
      const next = { ...b, numero: n };
      n += 1;
      return next;
    }
    return b;
  });
}
