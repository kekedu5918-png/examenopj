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
    'fc-f07-222-52',
    'Détention irrégulière',
    'Acquisition, détention ou cession d’armes ou munitions A ou B sans autorisation',
    '**Avoir ou transférer des armes soumises à autorisation sans titre valable (fascicule F07).**',
    '*Art. 222-52 du Code pénal* — réitération, réunion… ; tentative *222-60*.',
    `**MATÉRIEL :** acquisition, détention ou cession de matériels de guerre, armes, éléments ou munitions catégories A ou B ; sans autorisation prévue (notamment *L. 2332-1 C.DEF.*, *L. 312-1* et s. *C.S.I.*).

**MORAL :** conscience de détenir ou céder sans titre.`,
    'OUI',
    'OUI',
  ),
  ...pair(
    'fc-f07-222-54',
    'Port et transport',
    'Port ou transport hors domicile sans titre ou sans motif légitime (A ou B)',
    '**Sortir avec une arme A ou B sans autorisation de port ou sans motif légitime de transport.**',
    '*Art. 222-54 du Code pénal* (prévoit et réprime — F07) — notion de domicile élargie (jurisprudence).',
    `**MATÉRIEL :** port ou transport de matériels, armes, éléments ou munitions A ou B ; hors domicile ; absence de titre ou de motif légitime ; dérogations *L. 315-1* et *L. 315-2 C.S.I.*

**MORAL :** conscience de ne pas respecter le cadre légal du déplacement.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f07-l317-8',
    'Port et transport',
    'Port ou transport sans motif légitime — armes C ou D listées',
    '**Hors domicile : armes de cat. C ou armes D inscrites sur liste, sans motif légitime (F07 — élément légal commun).**',
    '*Art. L. 317-8 du Code de la sécurité intérieure* — exception des armes de faible dangerosité listées (fascicule).',
    `**MATÉRIEL :** port ou transport hors domicile ; armes C, ou armes D figurant sur liste, munitions ou éléments ; sans motif légitime ; hors dérogations *L. 315-1*, *L. 315-2* et règlements d’application.

**MORAL :** volonté de porter ou transporter ; conscience de l’absence de motif légitime.`,
    'NON',
    'OUI',
  ),
];
