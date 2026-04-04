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
  complicite?: string,
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

/** F01 P1 — extension SDCP (tortures, violences aggravées, embuscade, violence routière, violences sexuelles aggravées, images). */
export const flashcardsF01P1Supplement: Flashcard[] = [
  ...pair(
    'fc-f01-torture',
    'Tortures et actes de barbarie',
    'Les tortures et actes de barbarie',
    '**Actes d’une gravité exceptionnelle causant une souffrance insupportable ou niant la dignité humaine.**',
    '*Art. 222-1 C.P.* — crime — 15 à perpétuité selon circonstances — CA : mineur 15 ans, vulnérable, ascendant, DAP, conjoint, bande organisée (222-2 à 222-6).',
    `**ÉLÉMENT MATÉRIEL :** actes de torture ou barbarie / souffrance physique ou morale d’intensité insupportable / personne humaine vivante.

**ÉLÉMENT MORAL :** intention coupable ; volonté de causer une souffrance exceptionnellement aiguë ou de nier la dignité (C.A. Lyon 19/01/1996).`,
    'OUI',
    'OUI',
  ),
  ...pair(
    'fc-f01-viol-hab-mineur',
    'Violences sur mineurs et personnes vulnérables',
    'Les violences habituelles sur mineur de 15 ans ou personne vulnérable',
    '**Violences répétées (au moins deux fois) sur mineur de 15 ans ou personne vulnérable.**',
    '*Art. 222-14 C.P.* — peines selon résultat (ITT, mutilation, mort).',
    `**ÉLÉMENT MATÉRIEL :** caractère habituel des violences / mineur de 15 ans ou vulnérabilité apparente ou connue.

**ÉLÉMENT MORAL :** volonté de violences répétées / conscience de la qualité de la victime.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f01-viol-arme-sp',
    'Violences sur agents et services publics',
    'Les violences avec arme sur dépositaire d\'autorité publique, sapeur-pompier ou agent de transport public',
    '**Violences avec usage ou menace d’arme sur DAP, pompier ou agent de transport public de voyageurs.**',
    '*Art. 222-14-4 C.P.* — délit — jusqu’à 7 ans et 100 000 € (ITT ≤ 8 j ou sans ITT).',
    `**ÉLÉMENT MATÉRIEL :** violence + arme (usage ou menace) / qualité de la victime / exercice ou fait des fonctions / qualité connue ou apparente.

**ÉLÉMENT MORAL :** volonté de violences + connaissance de la qualité.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f01-groupe-violent',
    'Groupements violents',
    'La participation à un groupement violent',
    '**Participer sciemment à un groupement en vue de préparer des violences ou dégradations.**',
    '*Art. 222-14-2 C.P.* — délit — 1 an / 15 000 € — **infraction d’obstacle** (violences non nécessaires).',
    `**ÉLÉMENT MATÉRIEL :** participation à un groupement / préparation matérielle de violences aux personnes ou dégradations de biens.

**ÉLÉMENT MORAL :** participation volontaire et en connaissance de cause / conscience du but violent.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f01-viol-fsi',
    'Violences sur agents et services publics',
    'Les violences sur forces de sécurité intérieure ou élus locaux (ITT ≤ 8 j ou sans ITT)',
    '**Violences sur GN, PN, pénitentiaire, douanes ou élu local — ITT faible ou nulle mais délit.**',
    '*Art. 222-14-5 C.P.* — délit — 3 ans / 45 000 € (dérogation : pas une simple contravention).',
    `**ÉLÉMENT MATÉRIEL :** violences / victime parmi les personnels désignés / exercice ou fait des fonctions / ITT ≤ 8 j ou sans ITT.

**ÉLÉMENT MORAL :** volonté de violences + connaissance de la qualité.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f01-embuscade',
    'Groupements violents',
    'L\'embuscade',
    '**Attendre une victime pour commettre des violences avec arme contre un agent désigné.**',
    '*Art. 222-15-1 C.P.* — infraction d’obstacle — peines selon gravité (5 à 7 ans et plus si ITT).',
    `**ÉLÉMENT MATÉRIEL :** embuscade dans un lieu déterminé / intention de violences avec arme / victime parmi le catalogue légal (DAP, GN, PN, santé en exercice…).

**ÉLÉMENT MORAL :** volonté de s’embusquer + intention de violences armées.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f01-appels-malveillants',
    'Trouble à la tranquillité',
    'Les appels et messages malveillants / agressions sonores (trouble de la tranquillité)',
    '**Appels ou messages réitérés, ou agressions sonores, pour troubler la tranquillité d’autrui.**',
    '*Art. 222-16 C.P.* — 1 an / 15 000 € — CA conjoint / concubin : 3 ans / 45 000 €.',
    `**ÉLÉMENT MATÉRIEL :** agissements réitérés (téléphone, SMS, mails, RS…) ou agressions sonores / visant la tranquillité d’autrui.

**ÉLÉMENT MORAL :** conscience de la pression + volonté de troubler la tranquillité.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f01-homicide-routier',
    'Atteintes involontaires à la vie',
    'L\'homicide routier',
    '**Conducteur de VTM cause la mort sans intention, avec au moins un comportement dangereux prévu par la loi.**',
    '*Art. 221-18 C.P.* — loi n° 2025-622 — délit — 7 ans (une circonstance) / 10 ans et 150 000 € (deux ou plus).',
    `**ÉLÉMENT MATÉRIEL :** conducteur VTM / faute + circonstance aggravante routière (stupéfiants, alcool, vitesse +30 km/h, permis, fuite, téléphone, refus d’obtempérer, écran…) / mort / causalité.

**ÉLÉMENT MORAL :** pas d’intention homicide ; faute qualifiée avec comportement dangereux.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f01-bless-routier-grave',
    'Atteintes involontaires à l’intégrité',
    'Les blessures routières — ITT > 3 mois',
    '**Conducteur VTM, ITT > 3 mois, avec circonstance de violence routière.**',
    '*Art. 221-19 C.P.* (loi 2025-622) — délit — peines aggravées vs 222-19 classique.',
    `**ÉLÉMENT MATÉRIEL :** VTM + ITT > 3 mois + au moins une circonstance du 221-18 + causalité.

**ÉLÉMENT MORAL :** absence d’intention de blesser ; faute avec comportement dangereux caractérisé.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f01-bless-routier-leg',
    'Atteintes involontaires à l’intégrité',
    'Les blessures routières — ITT ≤ 3 mois',
    '**Même schéma que les blessures routières graves mais ITT ≤ 3 mois.**',
    '*Art. 221-20 C.P.* (loi 2025-622).',
    `**ÉLÉMENT MATÉRIEL :** VTM + ITT ≤ 3 mois + circonstance aggravante routière + causalité.

**ÉLÉMENT MORAL :** absence d’intention de blesser.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f01-blesse-vtm-sans-vr',
    'Atteintes involontaires à l’intégrité',
    'Les atteintes involontaires à l\'intégrité par conducteur de VTM — ITT ≤ 3 mois (sans violence routière)',
    '**Imprudence du conducteur de VTM, ITT ≤ 3 mois, sans les circonstances du homicide/blessures routiers.**',
    '*Art. 222-19-1 C.P.* — 2 ans / 30 000 €.',
    `**ÉLÉMENT MATÉRIEL :** conducteur VTM / faute simple / ITT ≤ 3 mois / **sans** les comportements du 221-18 / causalité.

**ÉLÉMENT MORAL :** pas d’intention de blesser.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f01-viol-mineur15',
    'Agressions sexuelles aggravées',
    'Le viol commis par un majeur sur un mineur de 15 ans',
    '**Pénétration ou acte bucco-génital : majeur sur mineur de 15 ans — VCMS non requise.**',
    '*Art. 222-23-1 C.P.* — crime — 20 ans — écart d’âge ≥ 5 ans (al. 2) ; tentative : oui.',
    `**ÉLÉMENT MATÉRIEL :** acte de viol sur mineur de 15 ans par majeur / présomption irréfragable de non-consentement (sauf exception d’âge).

**ÉLÉMENT MORAL :** connaissance (ou inexcusable ignorance) de l’âge.`,
    'OUI',
    'OUI',
  ),
  ...pair(
    'fc-f01-viol-inceste',
    'Agressions sexuelles aggravées',
    'Le viol incestueux',
    '**Viol sur mineur par membre de famille désigné au texte (liens + autorité).**',
    '*Art. 222-23-2 C.P.* — crime — 20 ans.',
    `**ÉLÉMENT MATÉRIEL :** pénétration ou bucco-génital + liens familiaux prévus + mineur / pour mineur : pas de preuve de VCMS.

**ÉLÉMENT MORAL :** connaissance du lien familial.`,
    'OUI',
    'OUI',
  ),
  ...pair(
    'fc-f01-ag-vuln',
    'Agressions sexuelles aggravées',
    'Les agressions sexuelles sur personne vulnérable',
    '**Attouchements sans pénétration avec VCMS sur personne vulnérable.**',
    '*Art. 222-29 C.P.* — délit — 7 ans / 100 000 €.',
    `**ÉLÉMENT MATÉRIEL :** atteinte sexuelle sans pénétration / VCMS / vulnérabilité apparente ou connue.

**ÉLÉMENT MORAL :** conscience de la vulnérabilité + volonté d’acte sexuel.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f01-ag-mineur15',
    'Agressions sexuelles aggravées',
    'L\'agression sexuelle commise par un majeur sur un mineur de 15 ans',
    '**Sans pénétration : majeur / mineur 15 ans — VCMS non requise (écart d’âge ≥ 5 ans).**',
    '*Art. 222-29-2 C.P.* — délit — 10 ans / 150 000 €.',
    `**ÉLÉMENT MATÉRIEL :** atteinte sans pénétration / majeur sur mineur de 15 ans.

**ÉLÉMENT MORAL :** connaissance de l’âge.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f01-ag-inceste',
    'Agressions sexuelles aggravées',
    'L\'agression sexuelle incestueuse',
    '**Atteinte sans pénétration, liens du 222-23-2, mineur, pas de VCMS pour le mineur.**',
    '*Art. 222-29-3 C.P.* — 10 ans / 150 000 €.',
    `**ÉLÉMENT MATÉRIEL :** atteinte sans pénétration / membre de famille / mineur.

**ÉLÉMENT MORAL :** connaissance du lien familial.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f01-subst-viol',
    'Agressions sexuelles aggravées',
    'L\'administration de substance pour viol ou agression sexuelle',
    '**Donner à l’insu une substance pour altérer le discernement en vue d’un viol ou d’une agression sexuelle.**',
    '*Art. 222-30-1 C.P.* — délit autonome — 5 ans / 75 000 € (même si viol non commis).',
    `**ÉLÉMENT MATÉRIEL :** administration à l’insu / substance altérant discernement ou contrôle / but : viol ou agression sexuelle.

**ÉLÉMENT MORAL :** connaissance de la substance + volonté d’altérer pour commettre l’infraction sexuelle.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f01-happy-slap',
    'Images et violences',
    'L\'enregistrement d\'images de violences (happy slapping)',
    '**Enregistrer sciemment des images de violences ou agressions sexuelles commises.**',
    '*Art. 222-33-3 C.P.* — délit — jusqu’à 5 ans / 75 000 € (violences punies d’au moins 5 ans).',
    `**ÉLÉMENT MATÉRIEL :** enregistrement sur tout support / infractions de violences ou agressions sexuelles en cours.

**ÉLÉMENT MORAL :** conscience + volonté d’enregistrer.
**Repère :** peut coexister avec complicité si participation aux violences.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f01-diffuse-viol',
    'Images et violences',
    'La diffusion d\'images de violences',
    '**Diffuser l’enregistrement d’images de violences — infraction distincte de l’enregistrement.**',
    '*Art. 222-33-3 al. 2 C.P.*',
    `**ÉLÉMENT MATÉRIEL :** diffusion par quelque moyen (internet, RS, MMS…).

**ÉLÉMENT MORAL :** conscience et volonté de porter à la connaissance d’autrui.`,
    'NON',
    'OUI',
  ),
];
