/**
 * Grandes parties du sommaire typique des fascicules F01–F15 du programme (repère pédagogique).
 * Basé sur la structure usuelle des supports officiels et sur le sommaire détaillé des fascicules texte (titres de chapitres, pas le corps juridique).
 * Ne se substitue pas au fascicule ni à Légifrance — sert à recouper la fiche « Fondamentaux » avec l’arborescence officielle.
 */
export type FasciculeReperesSommaire = {
  /** Phrase de méthode affichée au-dessus de la liste. */
  intro?: string;
  /** Titres ou blocs majeurs du sommaire (niveau chapitre / grande partie). */
  parties: string[];
};

export const FASCICULE_REPERES_SOMMAIRE: Record<string, FasciculeReperesSommaire> = {
  f01: {
    intro: 'Atteintes aux personnes : qualification des infractions contre la personne physique.',
    parties: [
      'Infractions contre la vie et l’intégrité physique',
      'Violences volontaires et formes aggravées',
      'Agressions et atteintes sexuelles',
      'Enlèvement, séquestration, menaces',
      'Atteintes à la dignité et infractions connexes (mise en danger, etc.)',
    ],
  },
  f02: {
    intro: 'Infractions patrimoniales : éléments constitutifs, modes opératoires et peines.',
    parties: [
      'Vol et démembrement (effraction, violence, aggression, échelle)',
      'Abus de confiance, escroquerie et infractions assimilées',
      'Recel et blanchiment (repères pénales)',
      'Destruction, dégradations et atteintes aux données / systèmes',
      'Infractions numériques liées aux biens',
    ],
  },
  f03: {
    intro: 'Délits routiers : cadre légal et articulation avec la procédure.',
    parties: [
      'Homicides et blessures involontaires par véhicule',
      'Délit de fuite et refus de se soumettre aux vérifications',
      'Conduite sous l’emprise de substances',
      'Graves infractions routières (excès de vitesse, rodéo, récidive)',
      'Compétence et suites pénales',
    ],
  },
  f04: {
    intro: 'Atteintes à l’ordre public et aux institutions.',
    parties: [
      'Atteintes aux institutions et à la sécurité nationale (repères)',
      'Outrages et atteintes aux personnes dépositaires de l’autorité publique',
      'Atteintes à l’administration de la justice et au vote',
      'Faux et usage, corruption et trafic d’influence (grandes familles)',
      'Associations de malfaiteurs et infractions connexes',
    ],
  },
  f05: {
    intro: 'Stupéfiants : usage, détention, trafic et infractions périphériques.',
    parties: [
      'Usage et provocation à l’usage illicite',
      'Détention, transport, offre ou cession',
      'Trafic et circonstances aggravantes',
      'Blanchiment et infractions associées',
      'Techniques d’enquête et suites (repères procéduraux)',
    ],
  },
  f06: {
    intro: 'Famille et mineurs : protection, autorité parentale et infractions spécifiques.',
    parties: [
      'Autorité parentale et obligations à l’égard des mineurs',
      'Abandon d’enfant et mise en danger',
      'Violences et maltraitances sur mineurs',
      'Atteintes à la personne et intégrité des mineurs (y compris contexte CJPM)',
      'Mesures de protection et articulation pénale / civile (aperçu)',
    ],
  },
  f07: {
    intro: 'Régime des armes : catégories, détention et infractions.',
    parties: [
      'Classification des armes et munitions',
      'Détention, acquisition et conditions de port',
      'Infractions au régime (port, transport, acquisition illicite)',
      'Armes à feu et armes blanches en droit pénal spécial',
      'Compétence et saisies (repères)',
    ],
  },
  f08: {
    intro: 'Libertés publiques : fondement, limitations et contrôle au regard de la CEDH.',
    parties: [
      'Sources et principes ( Constitution, CEDH, jurisprudence )',
      'Liberté d’aller et venir, domicile et vie privée',
      'Contrôles d’identité et fouilles (cadres)',
      'Interceptions et données numériques (repères)',
      'Libertés d’expression et de réunion (grandes bornes)',
    ],
  },
  f09: {
    intro: 'Droit pénal général : loi pénale, fait incrimé et personnalité de l’infraction.',
    parties: [
      'Loi pénale dans le temps et dans l’espace',
      'Classification des infractions et éléments constitutifs',
      'Auteur, co-auteur, complicité',
      'Tentative et consommation',
      'Circonstances, causes d’irresponsabilité et personnes morales (repères)',
    ],
  },
  f10: {
    intro: 'Sanction : peines, concours d’infractions et mesures.',
    parties: [
      'Peines principales et complémentaires',
      'Concours d’infractions et qualification unique / multiple',
      'Récidive et sanctions renforcées',
      'Circonstances atténuantes et aggravantes',
      'Mesures de sûreté et effacement / réhabilitation (aperçu)',
    ],
  },
  f11: {
    intro:
      'Cadres d’enquête et actes opérationnels : du déclenchement des enquêtes aux actes coercitifs (sommaire type fascicule n°11).',
    parties: [
      'Enquête préliminaire, flagrance, enquête de flagrance délictuelle, commission rogatoire (grandes lignes)',
      'Auditions, confrontations, expertises et scellés',
      'Perquisitions, fouilles, saisies, mandat de recherche',
      'Garde à vue et retenue (régimes distincts)',
      'Réquisitions (dont 99-3, 99-4 / 99-5), géolocalisation et ICE (repères CPP)',
      'Enquêtes spéciales : criminalité organisée (706-73 et suivants), infiltrations, techniques spéciales',
      'Art. 74, 74-1, 74-2 et 80-4 CPP : cadavre, mort suspecte, disparitions, personnes grièvement blessées, fuites',
    ],
  },
  f12: {
    intro: 'Instruction, mandats et liberté : phase préparatoire devant le juge d’instruction.',
    parties: [
      'Ouverture et déroulement de l’instruction',
      'Mandats de justice (dépôt, amener, comparution, recherche)',
      'Contrôle judiciaire et placement sous surveillance électronique',
      'Détention provisoire et prolongations',
      'Chambre de l’instruction et recours (aperçu)',
    ],
  },
  f13: {
    intro: 'Jugement et exécution : juridictions, procès et application des peines.',
    parties: [
      'Organisation des juridictions pénales et compétences',
      'Mise en état, audience, jugement et appel',
      'Exécution des peines privatives de liberté et alternatives',
      'Peines non emprisonnables et mesures alternatives',
      'Victime, partie civile et exécution des obligations (repères)',
    ],
  },
  f14: {
    intro: 'Mise en mouvement et pilotage de l’action publique ; statut et mission de la police judiciaire.',
    parties: [
      'Principes de l’action publique et de l’action civile',
      'Parquet : direction et affectations',
      'OPJ / APJ : habilitation, contrôle hiérarchique et déontologie',
      'Plaintes, classements et suites procédurales',
      'Relations avec la partie civile et les juridictions (repères)',
    ],
  },
  f15: {
    intro: 'Nullités : causes, grief et effets sur la régularité des actes.',
    parties: [
      'Nullités textuelles et nullités substantielles',
      'Mise en cause de la nullité et charge de la preuve du grief',
      'Effet annulant, atténuant ou inefficace',
      'Nullités particulières (interceptions, GAV, garde à vue, auditions)',
      'Conséquences sur la recevabilité des preuves et le procès',
    ],
  },
};

export function getReperesSommaireForModuleId(fasciculeId: string | undefined): FasciculeReperesSommaire | null {
  if (!fasciculeId) return null;
  return FASCICULE_REPERES_SOMMAIRE[fasciculeId] ?? null;
}

export function quizHrefForFasciculeId(fasciculeId: string): string {
  return `/quiz?mode=module&f=${encodeURIComponent(fasciculeId)}`;
}
