import type { Flashcard } from '@/data/flashcards-types';

const C = 'Stupéfiants';
const S = 'stupefiants';

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
      fascicule: 5,
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
      fascicule: 5,
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

export const flashcardsF05: Flashcard[] = [
  ...pair(
    'fc-f05-usage',
    'Usage et provocation',
    'Usage illicite de stupéfiants',
    '**Consommer une substance classée stupéfiant hors cadre légal — souvent qualifié aussi par détention « personal use ».**',
    '*Art. L.3421-1 al.1 du Code de la santé publique* — tentative non ; complicité oui.',
    `**MATÉRIEL :** usage (consommation hors autorisation médicale ou recherche) ; peut inclure acquisition, détention ou transport à titre strictement personnel selon appréciation.

**MORAL :** usage intentionnel en connaissance de cause.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f05-l34214',
    'Usage et provocation',
    'Provocation à l’usage ou au trafic (majeur)',
    '**Inciter ou présenter sous un jour favorable l’usage ou le trafic, y compris sans effet.**',
    '*Art. L.3421-4 du Code de la santé publique*.',
    `**MATÉRIEL :** provocation à l’infraction d’usage *L.3421-1* ou aux infractions *222-34 à 222-39* même non suivie d’effet ; ou présentation favorable ; ou provocation avec substances « présentées comme » stupéfiants.

**MORAL :** provoquer ou présenter en connaissance de cause (alinéa 1 ou 2).`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f05-222-34',
    'Trafic',
    'Direction ou organisation d’un trafic de stupéfiants',
    '**Crime — structuration d’un groupement dont l’activité est le trafic effectif de stupéfiants.**',
    '*Art. 222-34 al.1 du Code pénal* — tentative oui ; complicité oui ; *706-73 CPP*.',
    `**MATÉRIEL :** diriger ou organiser un **groupement** (plusieurs personnes, structuration minimale) ayant pour objet production, fabrication, import-export, transport, détention, offre, cession, acquisition ou emploi **illicites** ; seul le fait d’être **membre** sans diriger n’est pas visé par *222-34*.

**MORAL :** intention coupable — diriger ou organiser en connaissance de cause.`,
    'OUI',
    'OUI',
  ),
  ...pair(
    'fc-f05-222-37',
    'Trafic',
    'Transport, détention, offre, cession, acquisition ou emploi illicites',
    '**Actes de deal ou de stockage hors autorisation, hors champ de l’usage personnel simple.**',
    '*Art. 222-37 al.1 du Code pénal* — tentative oui selon *222-40*.',
    `**MATÉRIEL :** substances classées stupéfiants ; un des actes énumérés ; illicite ; hors simple usage personnel qualifié *L.3421-1* ; hors petites cessions *222-39*.

**MORAL :** conscience d’agir dans le trafic.`,
    'OUI',
    'OUI',
  ),
  ...pair(
    'fc-f05-222-39',
    'Trafic',
    'Offre ou cession en vue de la consommation personnelle du destinataire',
    '**« Petit deal » : céder à une personne identifiée pour sa conso personnelle.**',
    '*Art. 222-39 al.1 du Code pénal*.',
    `**MATÉRIEL :** offre ou cession ; stupéfiants ; destinataire déterminé ; destination : consommation personnelle de ce destinataire.

**MORAL :** conscience de la destination personnelle.`,
    'OUI',
    'OUI',
  ),
  ...pair(
    'fc-f05-222-35',
    'Trafic',
    'Production ou fabrication illicites',
    '**Fabriquer ou produire un stupéfiant sans titre.**',
    '*Art. 222-35 al.1 du Code pénal*.',
    `**MATÉRIEL :** production ou fabrication de stupéfiant ; absence d’autorisation légale.

**MORAL :** conscience d’opérer sans droit.`,
    'OUI',
    'OUI',
  ),
  ...pair(
    'fc-f05-222-36',
    'Trafic',
    'Importation ou exportation illicites',
    '**Faire entrer ou sortir des stupéfiants sans autorisation.**',
    '*Art. 222-36 al.1 du Code pénal*.',
    `**MATÉRIEL :** mouvement transfrontalier prohibé ; stupéfiants ; absence d’autorisation.

**MORAL :** conscience de l’illicité du passage.`,
    'OUI',
    'OUI',
  ),
  ...pair(
    'fc-f05-222-38',
    'Trafic',
    'Blanchiment du produit du trafic',
    '**Dissimuler l’origine des biens issus du trafic ou aider à les placer.**',
    '*Art. 222-38 al.1 du Code pénal*.',
    `**MATÉRIEL :** justification mensongère de l’origine du bien ; ou concours au placement, dissimulation ou conversion du produit du trafic.

**MORAL :** conscience du lien avec le trafic.`,
    'OUI',
    'OUI',
  ),
];
