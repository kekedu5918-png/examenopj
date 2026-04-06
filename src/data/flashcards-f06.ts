import type { Flashcard } from '@/data/flashcards-types';

const C = 'Mineurs et famille';
const S = 'mineurs-et-famille';

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
      fascicule: 6,
      domaine: 'DPS',
      categorie: C,
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
      fascicule: 6,
      domaine: 'DPS',
      categorie: C,
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

export const flashcardsF06: Flashcard[] = [
  ...pair(
    'fc-f06-227-3',
    'Obligations familiales',
    'Abandon de famille',
    '**Plus de deux mois sans payer pension ou prestation à exécution forcée.**',
    '*Art. 227-3 du Code pénal*.',
    `**MATÉRIEL :** titre ou décision exécutoire imposant pension, subsides, etc. ; inexécution totale ou partielle ; délai supérieur à deux mois.

**MORAL :** volonté de ne pas exécuter (exclu si précarité involontaire).`,
  ),
  ...pair(
    'fc-f06-227-42',
    'Violences familiales',
    'Violation d’ordonnance de protection (JAF)',
    '**Méconnaître mesures de protection *515-9 C.civ.* notifiées.**',
    '*Art. 227-4-2 du Code pénal*.',
    `**MATÉRIEL :** ordonnance de protection ; obligations ou interdictions ; violation caractérisée.

**MORAL :** conscience d’enfreindre l’ordonnance.`,
  ),
  ...pair(
    'fc-f06-227-43',
    'Violences familiales',
    'Défaut de notification de changement de domicile (ordonnance provisoire)',
    '**Omettre d’avertir le créancier lorsque l’inscription l’impose (*515-13-1*).**',
    '*Art. 227-4-3 du Code pénal*.',
    `**MATÉRIEL :** inscription du créancier ; changement de domicile ; absence de notification dans les formes.

**MORAL :** volonté de ne pas informer.`,
  ),
  ...pair(
    'fc-f06-227-5',
    'Autorité parentale',
    'Non-représentation d’enfant mineur',
    '**Refuser de présenter l’enfant au titulaire du droit de garde ou de visite.**',
    '*Art. 227-5 du Code pénal*.',
    `**MATÉRIEL :** détention légitime de l’enfant ; refus de représentation envers ayant droit.

**MORAL :** volonté de priver l’autre de l’exercice du droit.`,
  ),
  ...pair(
    'fc-f06-227-6',
    'Autorité parentale',
    'Défaut de notification de transfert de domicile d’enfant',
    '**Déménager l’enfant sans prévenir le titulaire du droit de visite.**',
    '*Art. 227-6 du Code pénal*.',
    `**MATÉRIEL :** décision ou convention avec droit de visite ; changement de résidence de l’enfant sans information.

**MORAL :** volonté de soustraire l’information.`,
  ),
  ...pair(
    'fc-f06-227-7',
    'Soustraction',
    'Soustraction par ascendant',
    '**Retirer l’enfant à la garde ou autorité légitime.**',
    '*Art. 227-7 du Code pénal*.',
    `**MATÉRIEL :** auteur ascendant ; soustraction à autorité parentale, garde ou droit de visite légitime.

**MORAL :** volonté de soustraire.`,
  ),
  ...pair(
    'fc-f06-227-8',
    'Soustraction',
    'Soustraction par non-ascendant sans violence',
    '**Autre qu’un ascendant retire l’enfant sans violence ni fraude sur l’enfant.**',
    '*Art. 227-8 du Code pénal*.',
    `**MATÉRIEL :** auteur non ascendant ; soustraction sans fraude ni violence à l’égard de l’enfant ; atteinte aux droits du titulaire de l’autorité ou garde.

**MORAL :** volonté de soustraire.`,
  ),
  ...pair(
    'fc-f06-227-15',
    'Mise en péril',
    'Privation d’aliments ou de soins (mineur de 15 ans)',
    '**Laisser sans nourriture ou soins indispensables un mineur de moins de 15 ans.**',
    '*Art. 227-15 du Code pénal*.',
    `**MATÉRIEL :** mineur concerné ; privation d’aliments ou de soins indispensables ; auteurs visés par le texte (plusieurs hypothèses).

**MORAL :** dol ou intention homicide suivant qualification retenue.`,
  ),
  ...pair(
    'fc-f06-227-17',
    'Mise en péril',
    'Soustraction d’un parent à ses obligations (délaissement)',
    '**Parents qui délaissent un enfant confié en violation manifeste de leurs devoirs.**',
    '*Art. 227-17 du Code pénal*.',
    `**MATÉRIEL :** père et mère (ou assimilés) ; enfant de moins de 15 ans confié ; délaissement en fraude aux obligations légales.

**MORAL :** volonté de se soustraire.`,
  ),
  ...pair(
    'fc-f06-227-18',
    'Stupéfiants (mineurs)',
    'Provocation directe d’un mineur à l’usage illicite de stupéfiants',
    '**Incitation directe — se distingue de la propagande ou apologie sans cible identifiée (L. 3421-4 C.S.P.).**',
    '*Art. 227-18 al. 1 du Code pénal* (F06 SDCP) — ca *al. 2*.',
    `**MATÉRIEL :** provocation directe ; mineur ; cible : usage illicite.

**MORAL :** conscience d’inciter.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f06-227-18-1',
    'Stupéfiants (mineurs)',
    'Provocation directe d’un mineur au trafic de stupéfiants',
    '**Inciter au transport, à la cession, à la détention illicite ou à la complicité de ces faits.**',
    '*Art. 227-18-1 al. 1 du Code pénal* (F06 SDCP).',
    `**MATÉRIEL :** provocation directe ; mineur ; infractions de trafic (transport, détention, offre, cession…) ou complicité.

**MORAL :** conscience d’inciter au trafic.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f06-227-19',
    'Provocations',
    'Provocation du mineur à l’alcool',
    '**Inciter directement un mineur à boire de façon excessive ou habituelle.**',
    '*Art. 227-19 du Code pénal*.',
    `**MATÉRIEL :** provocation directe ; mineur ; visée : consommation excessive ou habituelle d’alcool.

**MORAL :** conscience d’inciter.`,
  ),
  ...pair(
    'fc-f06-227-21',
    'Provocations',
    'Provocation du mineur à commettre un crime ou délit',
    '**Pousser un mineur à commettre une infraction (hors textes spéciaux).**',
    '*Art. 227-21 du Code pénal*.',
    `**MATÉRIEL :** provocation directe ; crime ou délit ciblé.

**MORAL :** volonté d’inciter.`,
  ),
  ...pair(
    'fc-f06-227-22',
    'Corruption et images',
    'Corruption de mineur',
    '**Faciliter la débauche ou assister à des relations sexuelles de mineurs.**',
    '*Art. 227-22 du Code pénal* (plusieurs al.).',
    `**MATÉRIEL :** aides ou incitations à la corruption ; présence à réunions ou spectacles avec rapports sexuels entre mineurs ; gratification ou non.

**MORAL :** conscience de favoriser la corruption.`,
  ),
  ...pair(
    'fc-f06-227-221',
    'Corruption et images',
    'Propositions sexuelles à mineur de 15 ans (moyen électronique)',
    '**Proposer via internet une rencontre visant une atteinte sexuelle.**',
    '*Art. 227-22-1 du Code pénal*.',
    `**MATÉRIEL :** majeur ; mineur de 15 ans ; moyen électronique ; proposition de rencontre avec objectif ou conscience d’un risque d’atteinte sexuelle.

**MORAL :** conscience suffisante des éléments objectivement caractérisés.`,
  ),
  ...pair(
    'fc-f06-227-23',
    'Corruption et images',
    'Images pédopornographiques (captation, détention, diffusion…)',
    '**Imagerie pornographique impliquant un mineur ou personne lui ressemblant.**',
    '*Art. 227-23 du Code pénal* — plusieurs figures ; tentative punissable (texte).',
    `**MATÉRIEL :** actes de fixation, transmission, offre, détention, consultation habituelle… selon alinéas ; caractère pornographique ; mineur ou apparence.

**MORAL :** conscience du contenu et de la situation.`,
  ),
  ...pair(
    'fc-f06-227-24',
    'Messages et incitations',
    'Diffusion de message dangereux susceptible d’être perçu par un mineur',
    '**Propager contenu violent, terroriste, pornographique ou dangereux accessible aux mineurs.**',
    '*Art. 227-24 du Code pénal*.',
    `**MATÉRIEL :** diffusion (modalités prévues) ; message violent, incitant au terrorisme, pornographique ou dangereux ; accessibilité pour mineurs.

**MORAL :** conscience de diffuser et du caractère du message.`,
  ),
  ...pair(
    'fc-f06-227-283',
    'Messages et incitations',
    'Provocation à commettre des faits de pédopornographie',
    '**Inciter autrui à réaliser les faits du 227-23 (ordre, instruction, fourniture de moyens…).**',
    '*Art. 227-28-3 du Code pénal*.',
    `**MATÉRIEL :** provocation d’un tiers à commettre les infractions *227-23* ; modes prévus (ordre, instructions, moyens…).

**MORAL :** volonté de provoquer à la commission.`,
  ),
  ...pair(
    'fc-f06-227-25',
    'Atteintes sexuelles',
    'Atteintes sexuelles sur mineur de quinze ans par majeur',
    '**Acte sexuel sans contrainte ni violence sur mineur de moins de 15 ans.**',
    '*Art. 227-25 du Code pénal*.',
    `**MATÉRIEL :** majeur et mineur de 15 ans ; atteinte sexuelle sans violence, contrainte, menace ni surprise ; hors qualifications plus graves.

**MORAL :** conscience du caractère sexuel et de la minorité.`,
  ),
  ...pair(
    'fc-f06-227-27',
    'Atteintes sexuelles',
    'Atteintes sexuelles sur mineur de 15 à 18 ans avec abus d’autorité',
    '**Même schéma sans contrainte, avec lien d’autorité parentale ou de la personne chargée de l’éduquer.**',
    '*Art. 227-27 du Code pénal*.',
    `**MATÉRIEL :** mineur entre 15 et 18 ans ; auteur majeur avec autorité, ascendant ou personne chargée de l’éduquer ; atteinte sexuelle sans violence, contrainte, menace ni surprise.

**MORAL :** conscience de l’abus de la position.`,
  ),
];
