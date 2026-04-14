import { ENQUETES } from '@/data/enquetes-data';
import type { EnqueteMeta } from '@/data/enquetes-types';

/** Hub fondamentaux (les anciennes URLs « modules » fusionnées). */
export function courseModuleHref(_moduleId: string): string {
  return '/fondamentaux';
}

/** Enquêtes dont au moins un lien pédagogique pointe vers ce module. */
export function getEnquetesLinkedToModule(moduleId: string): EnqueteMeta[] {
  const target = courseModuleHref(moduleId.toLowerCase());
  const list = ENQUETES.filter((e) => e.liensModules?.some((l) => l.href === target));
  return [...list].sort((a, b) => a.code.localeCompare(b.code, 'fr'));
}
