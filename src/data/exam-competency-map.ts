/**
 * Grille examen OPJ : épreuves × compétences × fascicules (F01–F15).
 * Données statiques — alimente Cours, modules, entraînement et sujets blancs.
 */

import { SUJETS_BLANCS } from '@/data/sujets-blancs';
import type { SujetBlanc } from '@/data/sujets-blancs-types';

export type ExamNumber = 1 | 2 | 3;

export type RevisionPriority = 'P0' | 'P1';

export type ExamCompetency = {
  id: string;
  label: string;
  /** Ce que le jury / correcteur vérifie. */
  description: string;
};

/** Compétences attendues par épreuve (référence méthodologique). */
export const COMPETENCIES_BY_EXAM: Record<ExamNumber, ExamCompetency[]> = {
  1: [
    {
      id: 'e1-qualif',
      label: 'Qualification juridique',
      description:
        'Identifier les infractions pertinentes, distinguer qualifications voisines et citer le programme (titres et éléments constitutifs).',
    },
    {
      id: 'e1-prqc',
      label: 'Structuration PRQC',
      description:
        'Plan clair : élément légal, matériel, moral ; transitions et hiérarchie des arguments (dissertation ou cas).',
    },
    {
      id: 'e1-programme',
      label: 'Respect du programme',
      description:
        'Mobiliser uniquement les thèmes et formulations attendus ; éviter le droit généraliste hors barème.',
    },
    {
      id: 'e1-concours',
      label: 'Concours et peines',
      description:
        'Articuler concours d’infractions, peines encourues et compétence matérielle lorsque le sujet l’exige.',
    },
  ],
  2: [
    {
      id: 'e2-cadre',
      label: 'Cadre procédural',
      description:
        'Placer chaque acte au bon moment (flagrance, préliminaire, instruction) et au bon visa.',
    },
    {
      id: 'e2-articulation',
      label: 'Articulation qualification / actes',
      description:
        'Enchaîner du fait à la qualification puis aux mesures cohérentes (auditions, perquisitions, GAV…).',
    },
    {
      id: 'e2-pv',
      label: 'Rédaction PV & mentions',
      description:
        'Respect des mentions légales, clarté des constats et distinction fait constaté / analyse juridique.',
    },
    {
      id: 'e2-cartouches',
      label: 'Réponses aux questions',
      description:
        'Répondre strictement à la consigne ; cartouches complètes sans dérive hors dossier.',
    },
  ],
  3: [
    {
      id: 'e3-synthese',
      label: 'Synthèse orale',
      description:
        'Présenter les faits et enjeux de manière ordonnée, en temps limité, sans fiche illisible.',
    },
    {
      id: 'e3-technique',
      label: 'Maîtrise technique',
      description:
        'Réponses précises sur qualification, procédure et rédaction ; pas d’approximation sur les textes.',
    },
    {
      id: 'e3-posture',
      label: 'Posture professionnelle',
      description:
        'Calibrage du propos, écoute des questions du jury, distinction rôle OPJ / magistrat.',
    },
  ],
};

export const EXAM_SHORT_LABEL: Record<ExamNumber, string> = {
  1: 'Épreuve 1 — DPS',
  2: 'Épreuve 2 — Procédure',
  3: 'Épreuve 3 — Oral',
};

export type FasciculeExamProfile = {
  fasciculeId: string;
  /** Dernière ligne droite : P0 = prioriser absolument avant l’examen OPJ. */
  priority: RevisionPriority;
  /** Où le thème pèse le plus pour l’écrit et l’oral. */
  primaryEpreuves: ExamNumber[];
  /** Pondération indicative 1–3 pour l’affichage. */
  epreuveWeight: Record<ExamNumber, 1 | 2 | 3>;
  /** Identifiants parmi COMPETENCIES_BY_EXAM (toutes épreuves confondues). */
  competencyIds: string[];
};

const ALL_E1 = COMPETENCIES_BY_EXAM[1].map((c) => c.id);
const ALL_E2 = COMPETENCIES_BY_EXAM[2].map((c) => c.id);

/** Profil par fascicule : aligné programme officiel et logique d’épreuve. */
export const FASCICULE_EXAM_PROFILE: Record<string, FasciculeExamProfile> = {
  f01: {
    fasciculeId: 'f01',
    priority: 'P0',
    primaryEpreuves: [1, 2],
    epreuveWeight: { 1: 3, 2: 2, 3: 2 },
    competencyIds: ['e1-qualif', 'e1-prqc', 'e1-programme', 'e2-articulation', 'e2-pv'],
  },
  f02: {
    fasciculeId: 'f02',
    priority: 'P0',
    primaryEpreuves: [1, 2],
    epreuveWeight: { 1: 3, 2: 2, 3: 2 },
    competencyIds: ['e1-qualif', 'e1-concours', 'e2-articulation', 'e2-pv'],
  },
  f03: {
    fasciculeId: 'f03',
    priority: 'P1',
    primaryEpreuves: [1, 2],
    epreuveWeight: { 1: 3, 2: 2, 3: 1 },
    competencyIds: ['e1-qualif', 'e1-prqc', 'e2-cadre', 'e2-pv'],
  },
  f04: {
    fasciculeId: 'f04',
    priority: 'P1',
    primaryEpreuves: [1, 2],
    epreuveWeight: { 1: 3, 2: 2, 3: 2 },
    competencyIds: ['e1-qualif', 'e1-programme', 'e2-articulation', 'e2-cartouches'],
  },
  f05: {
    fasciculeId: 'f05',
    priority: 'P0',
    primaryEpreuves: [1, 2],
    epreuveWeight: { 1: 3, 2: 2, 3: 2 },
    competencyIds: ['e1-qualif', 'e1-concours', 'e2-articulation', 'e2-pv'],
  },
  f06: {
    fasciculeId: 'f06',
    priority: 'P0',
    primaryEpreuves: [1, 2],
    epreuveWeight: { 1: 3, 2: 2, 3: 2 },
    competencyIds: ['e1-qualif', 'e1-prqc', 'e2-articulation', 'e3-technique'],
  },
  f07: {
    fasciculeId: 'f07',
    priority: 'P1',
    primaryEpreuves: [1, 2],
    epreuveWeight: { 1: 2, 2: 2, 3: 1 },
    competencyIds: ['e1-qualif', 'e2-pv', 'e2-cartouches'],
  },
  f08: {
    fasciculeId: 'f08',
    priority: 'P1',
    primaryEpreuves: [1, 2],
    epreuveWeight: { 1: 3, 2: 2, 3: 2 },
    competencyIds: ['e1-qualif', 'e1-programme', 'e2-articulation', 'e2-cartouches'],
  },
  f09: {
    fasciculeId: 'f09',
    priority: 'P0',
    primaryEpreuves: [1],
    epreuveWeight: { 1: 3, 2: 2, 3: 2 },
    competencyIds: ['e1-qualif', 'e1-prqc', 'e1-concours', 'e2-articulation'],
  },
  f10: {
    fasciculeId: 'f10',
    priority: 'P0',
    primaryEpreuves: [1],
    epreuveWeight: { 1: 3, 2: 2, 3: 2 },
    competencyIds: ['e1-qualif', 'e1-concours', 'e1-programme', 'e2-cartouches'],
  },
  f11: {
    fasciculeId: 'f11',
    priority: 'P0',
    primaryEpreuves: [2, 1],
    epreuveWeight: { 1: 2, 2: 3, 3: 2 },
    competencyIds: ['e2-cadre', 'e2-articulation', 'e2-pv', 'e1-programme'],
  },
  f12: {
    fasciculeId: 'f12',
    priority: 'P0',
    primaryEpreuves: [2, 3],
    epreuveWeight: { 1: 1, 2: 3, 3: 3 },
    competencyIds: ['e2-cadre', 'e2-articulation', 'e2-cartouches', 'e3-synthese', 'e3-technique'],
  },
  f13: {
    fasciculeId: 'f13',
    priority: 'P1',
    primaryEpreuves: [2, 1],
    epreuveWeight: { 1: 2, 2: 3, 3: 2 },
    competencyIds: ['e2-cadre', 'e2-cartouches', 'e1-qualif'],
  },
  f14: {
    fasciculeId: 'f14',
    priority: 'P0',
    primaryEpreuves: [2, 3],
    epreuveWeight: { 1: 2, 2: 3, 3: 3 },
    competencyIds: ['e2-cadre', 'e2-articulation', 'e2-pv', 'e3-posture', 'e3-technique'],
  },
  f15: {
    fasciculeId: 'f15',
    priority: 'P0',
    primaryEpreuves: [2],
    epreuveWeight: { 1: 1, 2: 3, 3: 2 },
    competencyIds: ['e2-cadre', 'e2-pv', 'e2-cartouches', 'e1-programme'],
  },
};

export function getFasciculeExamProfile(fasciculeId: string): FasciculeExamProfile {
  return (
    FASCICULE_EXAM_PROFILE[fasciculeId] ?? {
      fasciculeId,
      priority: 'P1',
      primaryEpreuves: [1, 2],
      epreuveWeight: { 1: 2, 2: 2, 3: 2 },
      competencyIds: [...ALL_E1.slice(0, 2), ...ALL_E2.slice(0, 2)],
    }
  );
}

export function getCompetencyById(id: string): ExamCompetency | undefined {
  for (const exam of [1, 2, 3] as const) {
    const found = COMPETENCIES_BY_EXAM[exam].find((c) => c.id === id);
    if (found) return found;
  }
  return undefined;
}

/** Attendus à l’examen (puces) — complété par les fiches module quand `examenAttendus` est renseigné. */
export function getDefaultExamenAttendus(fasciculeId: string): string[] {
  const p = getFasciculeExamProfile(fasciculeId);
  const lines: string[] = [];
  if (p.primaryEpreuves.includes(1)) {
    lines.push('À l’écrit DPS : démontrer les éléments constitutifs avec titres du programme et structure PRQC claire.');
  }
  if (p.primaryEpreuves.includes(2)) {
    lines.push('À l’épreuve procédure : enchaîner faits, qualification retenue et actes utiles dans le bon cadre (EP/CR…).');
  }
  if (p.primaryEpreuves.includes(3) || p.epreuveWeight[3] >= 2) {
    lines.push('À l’oral : synthétiser sans catalogue, répondre précisément aux questions sur qualification et procédure.');
  }
  if (p.priority === 'P0') {
    lines.push('Thème prioritaire fin de préparation : prévoir une révision ciblée quiz + flashcards + un passage articulation ou PV.');
  }
  return lines;
}

export function getSujetsBlancsForFascicule(fasciculeId: string): SujetBlanc[] {
  return SUJETS_BLANCS.filter((s) => s.themesFascicules?.includes(fasciculeId));
}
