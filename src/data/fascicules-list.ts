// Source : fichiers SDCP public/cours-texte/ — Version 01/12/2025

import { fasciculesChunk01 } from './fascicules-chunk-01';
import { fasciculesChunk02 } from './fascicules-chunk-02';
import { fasciculesChunk03 } from './fascicules-chunk-03';
import { fasciculesChunk04 } from './fascicules-chunk-04';
import type { Domain, Fascicule, FasciculeChapter } from './fascicules-types';

export type { Domain, Fascicule, FasciculeChapter } from './fascicules-types';

export const FASCICULES: Fascicule[] = [
  ...fasciculesChunk01,
  ...fasciculesChunk02,
  ...fasciculesChunk03,
  ...fasciculesChunk04,
];

export const getFasciculeById = (id: string): Fascicule | undefined => FASCICULES.find((f) => f.id === id);

export const getFasciculesByDomain = (domain: Domain): Fascicule[] =>
  FASCICULES.filter((f) => f.domain === domain);

export const DOMAIN_LABELS: Record<Domain, string> = {
  DPS: 'Droit pénal spécial',
  DPG: 'Droit pénal général',
  PROCEDURE: 'Procédure pénale',
};

/** Couleur sémantique (UI) */
export const DOMAIN_COLORS: Record<Domain, string> = {
  DPS: 'red',
  DPG: 'violet',
  PROCEDURE: 'blue',
};

export const TOTAL_PAGES = FASCICULES.reduce((sum, f) => sum + f.pages, 0);

// ─── Compatibilité avec le code existant (quiz, flashcards, etc.) ───

export type FasciculeMetadata = {
  numero: number;
  titre: string;
  domaine: 'DPS' | 'DPG' | 'Procédure pénale';
  domaineLabel: string;
  pages: number;
  nbInfractions: number;
  chapitres: string[];
  description: string;
  /** Identifiant route `/fascicules/f01` */
  id: string;
  txtFile: string;
};

function domainToLegacy(d: Domain): FasciculeMetadata['domaine'] {
  if (d === 'PROCEDURE') return 'Procédure pénale';
  return d;
}

export const fasciculesList: FasciculeMetadata[] = FASCICULES.map((f) => ({
  numero: f.num,
  titre: f.title,
  domaine: domainToLegacy(f.domain),
  domaineLabel: DOMAIN_LABELS[f.domain],
  pages: f.pages,
  nbInfractions: f.infractions?.length ?? 0,
  description: f.subtitle,
  chapitres: f.chapters.map((c) => c.title),
  id: f.id,
  txtFile: f.txtFile,
}));

export const cahierMiseAJour = {
  titre: 'Cahier de mise à jour',
  periode: 'Juillet 2025 → Décembre 2025',
  textes: [
    'Loi n° 2023-1059 du 20/11/2023 — Orientation du ministère de la justice 2023-2027',
    'Loi n° 2025-532 du 13/06/2025 — Sortir la France du piège du narcotrafic',
    "Loi n° 2025-622 du 09/07/2025 — Création de l'homicide routier et lutte contre la violence routière",
    'Loi n° 2025-623 du 09/07/2025 — Sécurité des professionnels de santé',
    'Loi n° 2025-796 du 11/08/2025 — Maintien en rétention des personnes condamnées (récidive)',
    'Loi n° 2025-1057 du 06/11/2025 — Définition pénale du viol et des agressions sexuelles',
    'Décret n° 2025-894 du 05/09/2025 — Réglementation des armes blanches',
    'Arrêté du 04/07/2025 — Liste des armes classées catégorie D',
    'Cass. crim., 19/11/2025, n° 25-81.397',
    'Circulaire interministérielle CRIM 2025-17/G3-22/07/2025 — Biens mobiliers saisis',
  ],
} as const;

export function fasciculeDetailPath(id: string): string {
  return `/fascicules/${id}`;
}
