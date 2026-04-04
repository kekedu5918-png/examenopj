import type { Flashcard } from '@/data/flashcards-types';

const C = 'Armes et munitions';
const S = 'armes-et-munitions';

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
      fascicule: 7,
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
      fascicule: 7,
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

export const flashcardsF07: Flashcard[] = [
  ...pair(
    'fc-f07-222-51',
    'Commerce et fabrication',
    'Exercice sans autorisation de fabrication, import, export ou commerce d’armes',
    '**Activité industrielle ou commerciale d’armes sans titres L.2332-1 C.def. et L.312-9 C.S.I.**',
    '*Art. 222-51 du Code pénal*.',
    `**MATÉRIEL :** exercer sans autorisation l’activité de fabrication, importation, exportation ou commerce réglementée par le code de la défense et le code de la sécurité intérieure.

**MORAL :** conscience de l’absence de titre.`,
    'OUI',
    'OUI',
  ),
  ...pair(
    'fc-f07-222-52',
    'Détention irrégulière',
    'Acquisition, détention ou cession d’armes ou munitions A ou B sans autorisation',
    '**Avoir ou transférer des armes soumises à autorisation sans titre valable.**',
    '*Art. 222-52 du Code pénal* — ca réitération, réunion… ; tentative *222-60*.',
    `**MATÉRIEL :** acquisition, détention ou cession de matériels de guerre, armes, éléments ou munitions catégories A ou B ; sans autorisation prévue (art. *L.312-1* et s. C.S.I., etc.).

**MORAL :** conscience de détenir ou céder sans titre.`,
    'OUI',
    'OUI',
  ),
  ...pair(
    'fc-f07-222-54',
    'Port et transport',
    'Port ou transport hors domicile sans motif légitime (A ou B)',
    '**Sortir régulièrement détenteur d’arme sans motif ou sans dérogation (stand de tir…).**',
    '*Art. 222-54 du Code pénal* — notion de domicile élargie (jurisprudence).',
    `**MATÉRIEL :** port ou transport de matériels, armes, éléments ou munitions A ou B ; hors domicile ou lieu assimilé ; absence de motif légitime ou d’autorisation de port ; dérogations *L.315-1* et *L.315-2*.

**MORAL :** conscience de ne pas respecter le cadre légal du déplacement.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f07-l317-8-2',
    'Port et transport',
    'Port ou transport sans motif légitime — armes de catégorie C',
    '**Même schéma pour armes soumises à déclaration hors exceptions.**',
    '*Art. L.317-8 2° du Code de la sécurité intérieure*.',
    `**MATÉRIEL :** arme, munition ou élément de catégorie C ; hors domicile ; sans motif légitime de transport.

**MORAL :** conscience de l’absence de motif légitime.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f07-l317-8-3',
    'Port et transport',
    'Port ou transport sans motif légitime — armes de catégorie D listées',
    '**Armes D non libres : transport encadré comme pour les C.**',
    '*Art. L.317-8 3° du Code de la sécurité intérieure* — peine moindre qu’un 2° en principe.',
    `**MATÉRIEL :** arme, munition ou élément de catégorie D figurant sur liste réglementaire ; hors domicile ; sans motif légitime.

**MORAL :** conscience de l’illicité du déplacement.`,
    'NON',
    'OUI',
  ),
];
