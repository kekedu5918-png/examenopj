import type { Flashcard } from '@/data/flashcards-types';

const C = 'Circulation routière';
const S = 'circulation-routiere';

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
      fascicule: 3,
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
      fascicule: 3,
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

export const flashcardsF03: Flashcard[] = [
  ...pair(
    'fc-f03-cea',
    'État alcoolique et ivresse',
    'Conduite sous l’empire d’un état alcoolique (CEA)',
    '**Délit dès les seuils délictuels : 0,80 g/l sang ou 0,40 mg/l air (seuils contraventionnels plus bas en droit pénal de la circulation).**',
    '*Art. L. 234-1 / I et V du Code de la route* — tentative non punissable — complicité punissable. Repères : immunité diplomatique, parlementaires…',
    `**ÉLÉMENT MATÉRIEL :** conducteur ou accompagnateur d’élève ; voie ouverte au public ; seuils d’alcoolémie atteints (délictuels ou, le cas échéant, contraventionnels selon catégorie de conducteur).

**ÉLÉMENT MORAL :** *volonté de conduire* en ayant consommé de l’alcool (intentionnelle — *Cass. crim.* 19/12/1994).`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f03-ivresse',
    'État alcoolique et ivresse',
    'Conduite en état d’ivresse manifeste',
    '**Ivresse appréciée par signes extérieurs, sans seuil de taux obligatoire (distinct de la CEA chiffrée).**',
    '*Art. L. 234-1 / II et V du Code de la route* (état d’ivresse manifeste) — délit.',
    `**ÉLÉMENT MATÉRIEL :** conducteur ou accompagnateur ; ivresse *manifeste* (troubles de l’élocution, équilibre, coordination, agressivité…).

**ÉLÉMENT MORAL :** conscience d’être en état d’ivresse au moment de conduire.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f03-stups',
    'Stupéfiants au volant',
    'Conduite après usage de stupéfiants',
    '**Présence de stupéfiant caractérisée par analyse sanguine ou salivaire.**',
    '*Art. L.235-1 / I du Code de la route* — délit — circonstance aggravante : usage cumulé alcool et stupéfiants (texte applicable).',
    `**ÉLÉMENT MATÉRIEL :** conducteur ou accompagnateur d’élève ; résultat positif d’analyse pour substance ou plante classée stupéfiant.

**ÉLÉMENT MORAL :** volonté de conduire en ayant fait usage de stupéfiants.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f03-fuite',
    'Accident et fuite',
    'Délit de fuite',
    '**Ne pas s’arrêter après un accident en vue d’échapper à sa responsabilité, y compris accident matériel.**',
    '*Art. 434-10 du Code pénal* et *L.231-1 du Code de la route* — à distinguer de l’homicide ou omission de secours (221-18, 223-6…).',
    `**ÉLÉMENT MATÉRIEL :** conducteur ou engin terrestre, fluvial ou maritime ; accident corporel ou matériel ; absence d’arrêt ; tentative d’échapper à responsabilité pénale ou civile.

**ÉLÉMENT MORAL :** conscience d’avoir causé ou occasionné l’accident ; volonté de se soustraire à la responsabilité.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f03-homicide-routier',
    'Violence routière',
    'Homicide routier',
    '**Mort sans intention de la donner, avec circumstance aggravante de « violence routière » (loi 2025-622).**',
    '*Art. 221-18 du Code pénal* — texte issu de la loi n° 2025-622 du 09/07/2025.',
    `**ÉLÉMENT MATÉRIEL :** conducteur de VTM ; au moins une circonstance légale de violence routière ; mort ; lien causal ; pas d’intention homicide.

**ÉLÉMENT MORAL :** absence d’intention homicide ; comportement fautif dans le cadre des circonstances qualifiantes.`,
    'N/A',
    'N/A',
  ),
  ...pair(
    'fc-f03-obtemp',
    'Contrôles routiers',
    'Refus d’obtempérer',
    '**Ne pas s’arrêter sur sommation régulière d’un agent habilité.**',
    '*Art. L.233-1* (simple) et *L.233-1-1* (mise en danger grave — aggravé) *du Code de la route*.',
    `**ÉLÉMENT MATÉRIEL :** conducteur ; sommation de s’arrêter par agent habilité et identifiable ; refus de s’arrêter.

**ÉLÉMENT MORAL :** conscience de la sommation ; volonté de ne pas obtempérer.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f03-refus-depist',
    'Contrôles routiers',
    'Refus de se soumettre aux vérifications (alcool / stupéfiants)',
    '**Refus des épreuves de dépistage ou analyses prévues par le C.R.**',
    '*Art. L.234-8* (alcool) et *L.235-3* (stupéfiants) *du Code de la route*.',
    `**ÉLÉMENT MATÉRIEL :** conducteur ou accompagnateur ; refus des vérifications (éthylomètre, prise de sang, analyses sanguines ou salivaires…).

**ÉLÉMENT MORAL :** refus délibéré en connaissance de cause.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f03-permis',
    'Titre et assurance',
    'Défaut de permis de conduire',
    '**Conduire sans le permis adapté ou malgré annulation, suspension, etc.**',
    '*Art. L.221-2 du Code de la route*.',
    `**ÉLÉMENT MATÉRIEL :** mise en circulation ou conduite ; absence de permis pour la catégorie ; ou permis annulé, invalidé, suspendu ou retenu.

**ÉLÉMENT MORAL :** volonté de conduire en connaissance de l’irrégularité du titre.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f03-assur',
    'Titre et assurance',
    'Défaut d’assurance',
    '**Circuler sans garantie RC obligatoire pour VTM ou remorque concernée.**',
    '*Art. L.324-2 du Code de la route*.',
    `**ÉLÉMENT MATÉRIEL :** mise en circulation d’un VTM ou remorque soumis à l’obligation ; absence de couverture RC.

**ÉLÉMENT MORAL :** conscience de ne pas être assuré.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f03-plaques',
    'Identité du véhicule',
    'Délits relatifs aux plaques et inscriptions',
    '**Fausses plaques, plaques d’un autre véhicule, absence de plaques…**',
    '*Arts. L. 317-2 / I, L. 317-3 / I, L. 317-4 / I et L. 317-4-1 / I du Code de la route* — gradation des peines selon hypothèses.',
    `**ÉLÉMENT MATÉRIEL :** fausses ou supposées (*L. 317-2 / I*) ; sans plaques requises et fausses déclarations (*L. 317-3 / I*) ; discordance qualité véhicule/utilisateur (*L. 317-4 / I*) ; numéro d’un autre véhicule en vue de poursuites contre un tiers (*L. 317-4-1 / I*).

**ÉLÉMENT MORAL :** conscience et volonté de ne pas respecter les règles d’immatriculation (SDCP).`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f03-vitesse',
    'Vitesse',
    'Grand excès de vitesse',
    '**Dépassement d’au moins 50 km/h de la vitesse autorisée (qualification délictuelle notamment par réitération de contravention).**',
    '*Art. L.413-1 du Code de la route*.',
    `**ÉLÉMENT MATÉRIEL :** conducteur ; dépassement ≥ 50 km/h ; éventuelle voie contraventionnelle en récidive légale.

**ÉLÉMENT MORAL :** volonté de dépasser la limitation.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f03-rodeo',
    'Comportements dangereux',
    'Rodéo motorisé',
    '**Manœuvres répétées et intentionnelles portant atteinte à la sécurité ou à la tranquillité publique.**',
    '*Art. L.236-1 du Code de la route* — ca : réunion ; récidive (texte).',
    `**ÉLÉMENT MATÉRIEL :** véhicule terrestre à moteur ; conduite répétant intentionnellement des manœuvres violant obligations de prudence/sécurité ; conditions d’atteinte à la sécurité des usagers ou trouble à la tranquillité publique.

**ÉLÉMENT MORAL :** volonté d’adopter cette conduite dangereuse de façon répétée.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f03-rodeo-org',
    'Comportements dangereux',
    'Incitation, organisation ou promotion de rodéos motorisés',
    '**Inciter ou structurer la commission de rodéos (réseaux sociaux, appels…).**',
    '*Art. L. 236-2 du Code de la route*.',
    `**ÉLÉMENT MATÉRIEL :** inciter, organiser ou promouvoir la commission d’un rodéo motorisé par tout moyen.

**ÉLÉMENT MORAL :** volonté d’inciter, d’organiser ou de promouvoir.`,
    'NON',
    'OUI',
  ),
];
