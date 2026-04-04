import { flashcardsF01P1Supplement } from '@/data/flashcards-f01-p1-supplement';
import type { Flashcard } from '@/data/flashcards-types';

const P = 'Atteintes aux personnes';
const S = 'atteintes-aux-personnes';

function pair(
  baseId: string,
  groupe: string,
  nom: string,
  definitionCourte: string,
  legalLine: string,
  materielMoral: string,
  tentative?: string,
  complicite?: string
): Flashcard[] {
  const footer = legalLine;
  return [
    {
      id: `${baseId}-legal`,
      fascicule: 1,
      domaine: 'DPS',
      categorie: P,
      categorieSlug: S,
      groupe,
      nom,
      definitionCourte,
      materiel: [],
      moral: '',
      legal: legalLine,
      versoFooter: footer,
      tentative,
      complicite,
    },
    {
      id: `${baseId}-mm`,
      fascicule: 1,
      domaine: 'DPS',
      categorie: P,
      categorieSlug: S,
      groupe,
      nom,
      definitionCourte,
      materiel: [],
      moral: '',
      legal: '',
      materielMoralComplet: materielMoral,
      versoFooter: footer,
      tentative,
      complicite,
    },
  ];
}

/** F01 partie 1 — Infractions contre les personnes (vie, violences, agressions sexuelles, menaces, blessures involontaires). */
export const flashcardsF01P1: Flashcard[] = [
  ...pair(
    'fc-f01-meurtre',
    'Atteintes à la vie',
    'Le meurtre',
    "**Le fait de donner volontairement la mort à autrui constitue un crime.**",
    "*L'article 221-1 du C.P.* définit et réprime le meurtre — réclusion criminelle à 30 ans — tentative punissable (121-5).",
    `**ÉLÉMENT MATÉRIEL :** acte positif de violence / mort de la victime / lien causal.

**ÉLÉMENT MORAL :** intention homicide (*animus necandi*) au moment de l'acte.
**Repères :** mobile indifférent ; erreur sur la personne indifférente.`,
    'OUI',
    'OUI'
  ),
  ...pair(
    'fc-f01-assassinat',
    'Atteintes à la vie',
    'Le meurtre avec préméditation (qualification usuelle « assassinat », art. 221-3 C.P.)',
    "**Qualification autonome du *meurtre* aggravé par la préméditation — réclusion à perpétuité.**",
    "*L'article 221-3 du C.P.* — qualification du meurtre avec préméditation ; notion de préméditation : *art. 132-72 C.P.*",
    `**ÉLÉMENT MATÉRIEL :** mêmes éléments que le meurtre + préméditation (dessein formé avant l'action).

**ÉLÉMENT MORAL :** intention homicide + projet réfléchi (intervalle résolution / exécution).`
  ),
  ...pair(
    'fc-f01-empoisonnement',
    'Atteintes à la vie',
    "L'empoisonnement",
    "**Attenter à la vie d'autrui par l'emploi ou l'administration de substances mortelles.**",
    "*L'article 221-5 du C.P.* — crime — réclusion 30 ans — infraction *formelle* (consommée dès l'administration).",
    `**ÉLÉMENT MATÉRIEL :** administration de substances de nature à entraîner la mort — la mort n'est pas nécessaire.

**ÉLÉMENT MORAL :** connaissance du caractère mortel + volonté de donner la mort.`
  ),
  ...pair(
    'fc-f01-homicide-invol',
    'Atteintes involontaires à la vie',
    "L'homicide involontaire",
    "**Cause involontairement la mort d'autrui par imprudence, négligence ou manquement.**",
    "*L'article 221-6 C.P.* — délit : 3 ans / 45 000 € (al. 1) ; 5 ans / 75 000 € si violation manifestement délibérée (al. 2).",
    `**ÉLÉMENT MATÉRIEL :** faute simple ou qualifiée / mort / causalité certaine.

**ÉLÉMENT MORAL :** *pas* d'intention de donner la mort — imprudence, négligence, inattention.
**Repères :** *homicide routier* (*art. 221-18*, loi 2025-622) : conducteur VTM + au moins une circonstance de « violence routière » — **infraction distincte**.`
  ),
  ...pair(
    'fc-f01-viol-morte',
    'Violences volontaires',
    'Les violences ayant entraîné la mort sans intention de la donner',
    "**Violences ayant entraîné la mort sans intention homicide.**",
    "*L'article 222-7 C.P.* — crime — 15 ans de réclusion — infraction *praeterintentionnelle*.",
    `**ÉLÉMENT MATÉRIEL :** violences / mort / causalité.

**ÉLÉMENT MORAL :** volonté de violences ; *absence* d'intention de donner la mort.`
  ),
  ...pair(
    'fc-f01-viol-mutil',
    'Violences volontaires',
    'Les violences ayant entraîné une mutilation ou infirmité permanente',
    "**Violences ayant causé mutilation ou infirmité permanente.**",
    "*L'article 222-9 C.P.* — délit — 10 ans / 150 000 €.",
    `**ÉLÉMENT MATÉRIEL :** violences physiques ou psychiques + mutilation ou infirmité permanente.

**ÉLÉMENT MORAL :** volonté de commettre des violences.`
  ),
  ...pair(
    'fc-f01-viol-itt8',
    'Violences volontaires',
    'Les violences ayant entraîné une ITT supérieure à 8 jours',
    "**Violences volontaires avec ITT pénale supérieure à 8 jours.**",
    "*L'article 222-11 C.P.* — délit — 3 ans / 45 000 €.",
    `**ÉLÉMENT MATÉRIEL :** violences physiques ou psychiques + ITT > 8 jours (ITT pénale : gêne notable dans les actes de la vie courante, fixée par médecin).

**ÉLÉMENT MORAL :** volonté de violences.`
  ),
  ...pair(
    'fc-f01-viol-ittfaible',
    'Violences volontaires',
    'Les violences ayant entraîné une ITT ≤ 8 jours ou sans ITT',
    "**Violences sans gravité physique au sens des art. 222-7 à 222-11.**",
    "Contravention *R.625-1* ou délit *222-13* si circonstances aggravantes — 3 ans / 45 000 €.",
    `**ÉLÉMENT MATÉRIEL :** violences physiques ou psychiques + ITT ≤ 8 jours ou pas d'ITT.

**ÉLÉMENT MORAL :** volonté de violences.
**Repères :** ITT pénale ≠ ITT civile — fixée par un médecin.`
  ),
  ...pair(
    'fc-f01-viol-habituel',
    'Violences volontaires',
    'Les violences habituelles sur conjoint ou concubin',
    "**Violences répétées sur conjoint, concubin ou partenaire de Pacs.**",
    "*L'article 222-14-3 C.P.* — circonstance aggravante autonome (caractère habituel).",
    `**ÉLÉMENT MATÉRIEL :** violences commises de façon habituelle / sur conjoint, concubin ou partenaire de Pacs.

**ÉLÉMENT MORAL :** volonté de commettre des violences de manière répétée.`
  ),
  ...pair(
    'fc-f01-subst-nuis',
    'Violences volontaires',
    "L'administration de substances nuisibles",
    "**Administration de substances nuisibles portant atteinte à l'intégrité physique ou psychique d'autrui.**",
    "*L'article 222-15 C.P.* — peines selon le résultat (ITT, mutilation, mort).",
    `**ÉLÉMENT MATÉRIEL :** administration de substances nuisibles + atteinte à l'intégrité.

**ÉLÉMENT MORAL :** connaissance du caractère nuisible + volonté d'administrer.
**Repères :** se distingue de l'empoisonnement (substance nuisible vs mortelle).`
  ),
  ...pair(
    'fc-f01-viol',
    'Agressions sexuelles',
    'Le viol',
    "**Acte de pénétration sexuelle ou acte bucco-génital par violence, contrainte, menace ou surprise.**",
    "*Art. 222-23 C.P.* (définition) — *222-23-1 C.P.* (répression : 15 ans) — loi n° 2025-1057 du 06/11/2025.",
    `**ÉLÉMENT MATÉRIEL :** pénétration ou acte bucco-génital / violence, contrainte, menace ou surprise.

**ÉLÉMENT MORAL :** conscience de l'absence de consentement + volonté d'imposer l'acte.`,
    'OUI',
    'OUI'
  ),
  ...pair(
    'fc-f01-ag-sex',
    'Agressions sexuelles',
    "L'agression sexuelle (autre que le viol)",
    "**Atteinte sexuelle (sans pénétration) par violence, contrainte, menace ou surprise.**",
    "*Arts. 222-22 et 222-27 C.P.* — délit — 5 ans / 75 000 €.",
    `**ÉLÉMENT MATÉRIEL :** attouchement à connotation sexuelle / violence, contrainte, menace ou surprise / *sans* pénétration (sinon viol).

**ÉLÉMENT MORAL :** absence de consentement + volonté d'accomplir l'acte à caractère sexuel.`
  ),
  ...pair(
    'fc-f01-exhibition',
    'Agressions sexuelles',
    "L'exhibition sexuelle",
    "**Exposition des parties sexuelles imposée à la vue d'autrui, lieu accessible au public.**",
    "*L'article 222-32 C.P.* — délit — 1 an / 15 000 €.",
    `**ÉLÉMENT MATÉRIEL :** exhibition sexuelle / imposée à la vue d'autrui / lieu accessible aux regards du public.

**ÉLÉMENT MORAL :** volonté de s'exhiber + conscience d'être vu ou susceptible de l'être.`
  ),
  ...pair(
    'fc-f01-harcel-sex',
    'Agressions sexuelles',
    'Le harcèlement sexuel',
    "**Propos ou comportements à connotation sexuelle répétés, ou pression grave, portant atteinte à la dignité.**",
    "*L'article 222-33 C.P.* — délit — 2 ans / 30 000 €.",
    `**ÉLÉMENT MATÉRIEL :** propos ou comportements répétés à connotation sexuelle ou sexiste — ou pression grave (visant un acte sexuel) — situation intimidante / dégradante / humiliante.

**ÉLÉMENT MORAL :** conscience du caractère dégradant, humiliant ou offensant.`
  ),
  ...pair(
    'fc-f01-menace-delit-nc',
    'Menaces',
    'Les menaces de commettre un crime ou un délit contre les personnes — sans condition',
    "**Menace matérialisée (écrit, image, objet) de commettre un crime ou délit contre les personnes — sans condition.**",
    "*L'article 222-17 al. 1 C.P.* — délit — 6 mois / 7 500 €.",
    `**ÉLÉMENT MATÉRIEL :** menace de crime ou délit contre les personnes / matérialisation par écrit, image ou objet.

**ÉLÉMENT MORAL :** volonté d'intimider la victime.`
  ),
  ...pair(
    'fc-f01-menace-mort-nc',
    'Menaces',
    'Les menaces de mort — sans condition',
    "**Menace de mort matérialisée par écrit, image ou tout objet, sans condition.**",
    "*L'article 222-17 al. 2 C.P.* — délit — 3 ans / 45 000 €.",
    `**ÉLÉMENT MATÉRIEL :** menace de mort / matérialisation écrite ou autre.

**ÉLÉMENT MORAL :** volonté d'intimider.`
  ),
  ...pair(
    'fc-f01-menace-delit-c',
    'Menaces',
    'Les menaces de crime ou délit contre les personnes — avec condition',
    "**Menace de commettre un crime ou délit contre les personnes assortie d'une condition.**",
    "*L'article 222-18 al. 1 C.P.* — délit — 3 ans / 45 000 €.",
    `**ÉLÉMENT MATÉRIEL :** menace de crime ou délit + condition (faire / ne pas faire).

**ÉLÉMENT MORAL :** volonté d'obtenir quelque chose sous la menace.`
  ),
  ...pair(
    'fc-f01-menace-mort-c',
    'Menaces',
    'Les menaces de mort — avec condition',
    "**Menace de mort assortie d'une condition.**",
    "*L'article 222-18 al. 2 C.P.* — délit — 5 ans / 75 000 €.",
    `**ÉLÉMENT MATÉRIEL :** menace de mort + condition.

**ÉLÉMENT MORAL :** volonté d'obtenir quelque chose sous la menace de mort.`
  ),
  ...pair(
    'fc-f01-bless-inv-long',
    'Blessures involontaires',
    'Les blessures involontaires — ITT > 3 mois',
    "**Faute d'imprudence ayant causé des blessures avec ITT pénale supérieure à 3 mois.**",
    "*L'article 222-19 C.P.* — délit — 2 ans / 30 000 €.",
    `**ÉLÉMENT MATÉRIEL :** faute / blessures ITT > 3 mois / causalité.

**ÉLÉMENT MORAL :** absence d'intention de blesser.`
  ),
  ...pair(
    'fc-f01-bless-inv-court',
    'Blessures involontaires',
    'Les blessures involontaires — ITT ≤ 3 mois',
    "**Faute d'imprudence — blessures ITT ≤ 3 mois (contravention ou délit si violation manifestement délibérée).**",
    "*R.625-2* (5ᵉ classe) / *222-20* si faute qualifiée — 1 an / 15 000 €.",
    `**ÉLÉMENT MATÉRIEL :** faute / blessures ITT ≤ 3 mois / causalité.

**ÉLÉMENT MORAL :** absence d'intention de blesser.`
  ),
  ...flashcardsF01P1Supplement,
];
