import { ENQUETES } from '@/data/enquetes-data';
import type { EnqueteMeta } from '@/data/enquetes-types';

/** URL canonique d’un module de cours (ex. f02 → `/cours/modules/f02`). */
export function courseModuleHref(moduleId: string): string {
  return `/cours/modules/${moduleId}`;
}

/** Enquêtes dont au moins un lien pédagogique pointe vers ce module. */
export function getEnquetesLinkedToModule(moduleId: string): EnqueteMeta[] {
  const target = courseModuleHref(moduleId.toLowerCase());
  const list = ENQUETES.filter((e) => e.liensModules?.some((l) => l.href === target));
  return [...list].sort((a, b) => a.code.localeCompare(b.code, 'fr'));
}
