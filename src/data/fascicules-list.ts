/**
 * Métadonnées des modules thématiques du programme OPJ (titres de référence + structure pédagogique).
 * Le contenu détaillé est proposé sous forme de synthèses rédactionnelles sur /cours/modules/[id], pas de reproduction de supports tiers.
 */

import type { Domain } from '@/data/fascicules-types';

export type { Domain } from '@/data/fascicules-types';

export type FasciculeMetadata = {
  numero: number;
  titre: string;
  domaine: 'DPS' | 'DPG' | 'Procédure pénale';
  domaineLabel: string;
  id: string;
  /** Accroche courte pour la page module (synthèse à enrichir). */
  accroche: string;
};

export const DOMAIN_LABELS: Record<Domain, string> = {
  DPS: 'Droit pénal spécial',
  DPG: 'Droit pénal général',
  PROCEDURE: 'Procédure pénale',
};

export const DOMAIN_COLORS: Record<Domain, string> = {
  DPS: 'red',
  DPG: 'violet',
  PROCEDURE: 'blue',
};

const RAW: { id: string; num: number; title: string; subtitle: string; domain: Domain }[] = [
  {
    id: 'f01',
    num: 1,
    title: 'Les crimes et délits contre les personnes',
    subtitle: 'Synthèse : atteintes à la vie, à l’intégrité, agressions sexuelles, mise en danger et infractions voisines — à consolider avec le Code pénal et votre formation.',
    domain: 'DPS',
  },
  {
    id: 'f02',
    num: 2,
    title: 'Les crimes et délits contre les biens',
    subtitle: 'Synthèse : vol, escroquerie, abus de confiance, recel, destructions et infractions numériques — articulation des éléments constitutifs.',
    domain: 'DPS',
  },
  {
    id: 'f03',
    num: 3,
    title: 'Les infractions à la circulation routière',
    subtitle: 'Synthèse : homicides et blessures involontaires, délit de fuite, conduite sous influence, rodéo — repères pénales et procédure.',
    domain: 'DPS',
  },
  {
    id: 'f04',
    num: 4,
    title: "Les crimes et délits contre la nation, l'État et la paix publique",
    subtitle: 'Synthèse : atteintes aux institutions, fonctionnaires, administration de la justice, faux et associations de malfaiteurs.',
    domain: 'DPS',
  },
  {
    id: 'f05',
    num: 5,
    title: "L'usage et le trafic de stupéfiants",
    subtitle: 'Synthèse : usages illicites, provocation, figures de trafic et blanchiment — qualification et cadres d’enquête.',
    domain: 'DPS',
  },
  {
    id: 'f06',
    num: 6,
    title: 'Les atteintes aux mineurs et à la famille',
    subtitle: 'Synthèse : autorité parentale, abandon, violences et atteintes à la personne des mineurs.',
    domain: 'DPS',
  },
  {
    id: 'f07',
    num: 7,
    title: 'Les infractions aux régimes des armes et munitions',
    subtitle: 'Synthèse : classifications, détention, port, transport et infractions associées.',
    domain: 'DPS',
  },
  {
    id: 'f08',
    num: 8,
    title: 'Les libertés publiques',
    subtitle: 'Synthèse : sources, CEDH, encadrement des contrôles et atteintes en pratique opérationnelle.',
    domain: 'DPS',
  },
  {
    id: 'f09',
    num: 9,
    title: 'De la loi pénale, de la responsabilité pénale',
    subtitle: 'Synthèse : classification des infractions, éléments constitutifs, complicité, causes d’irresponsabilité.',
    domain: 'DPG',
  },
  {
    id: 'f10',
    num: 10,
    title: 'La sanction',
    subtitle: 'Synthèse : peines, concours d’infractions, récidive, circonstances aggravantes.',
    domain: 'DPG',
  },
  {
    id: 'f11',
    num: 11,
    title: 'Les cadres juridiques et les actes de la mission de police judiciaire',
    subtitle: 'Synthèse : enquêtes, auditions, gardes à vue, perquisitions et actes courants — repères CPP.',
    domain: 'PROCEDURE',
  },
  {
    id: 'f12',
    num: 12,
    title: "L'instruction préparatoire, les mandats de justice, le contrôle judiciaire, la détention provisoire",
    subtitle: 'Synthèse : instruction, mandats, contrôle judiciaire et exécution provisoire des peines (aperçu).',
    domain: 'PROCEDURE',
  },
  {
    id: 'f13',
    num: 13,
    title: 'Les juridictions de jugement, l’exécution des décisions de justice',
    subtitle: 'Synthèse : compétences pénales, phases de jugement et principes d’exécution.',
    domain: 'PROCEDURE',
  },
  {
    id: 'f14',
    num: 14,
    title: 'Action publique, action civile, police judiciaire',
    subtitle: 'Synthèse : parquet, OPJ / APJ, habilitation, contrôle de la mission et articulation avec les parties.',
    domain: 'PROCEDURE',
  },
  {
    id: 'f15',
    num: 15,
    title: 'La nullité des actes de procédure',
    subtitle: 'Synthèse : nullités textuelles et substantielles, grief et effets.',
    domain: 'PROCEDURE',
  },
];

function domainToLegacy(d: Domain): FasciculeMetadata['domaine'] {
  if (d === 'PROCEDURE') return 'Procédure pénale';
  return d;
}

export const fasciculesList: FasciculeMetadata[] = RAW.map((f) => ({
  numero: f.num,
  titre: f.title,
  domaine: domainToLegacy(f.domain),
  domaineLabel: DOMAIN_LABELS[f.domain],
  id: f.id,
  accroche: f.subtitle,
}));

export const COURSE_MODULE_IDS = RAW.map((r) => r.id);

export function getCourseModuleById(id: string): FasciculeMetadata | undefined {
  return fasciculesList.find((m) => m.id === id);
}

/** @deprecated Utiliser `courseModulePath`. */
export function fasciculeDetailPath(id: string): string {
  return courseModulePath(id);
}

export function courseModulePath(id: string): string {
  return `/cours/modules/${id}`;
}

/** Points d’attention législatifs et jurisprudentiels — liste indicative à mettre à jour sans lier à un support tiers. */
export const legislativeHighlights = {
  titre: 'Actualités du droit à intégrer',
  periode: 'À actualiser régulièrement',
  textes: [
    'Veiller à recouper tout texte avec les codes officiels (Légifrance).',
    'Intégrer les lois de procédure et les réponses ministérielles publiées en vigueur.',
    'Suivre la jurisprudence de la Cour de cassation sur vos thématiques métier.',
  ],
} as const;

/** Compatibilité pages existantes : même contenu que `legislativeHighlights`. */
export const cahierMiseAJour = legislativeHighlights;
