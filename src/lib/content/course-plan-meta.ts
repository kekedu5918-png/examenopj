/**
 * Métadonnées dérivées du frontmatter V3 (`plan[]`) pour le hub fondamentaux.
 */

/** Fascicules SDCP F08–F15 (tags `F08` … `F15`). */
const FASCICULE_TAG_RE = /^F(0[89]|1[0-5])$/;

export function extractFasciculeTag(tags: string[]): string | undefined {
  return tags.find((t) => FASCICULE_TAG_RE.test(t));
}

/** Somme des durées « X min » dans `plan[].duree`. */
export function estimateReadingMinutesFromPlan(data: Record<string, unknown>): number | undefined {
  const plan = data.plan;
  if (!Array.isArray(plan) || plan.length === 0) return undefined;
  let total = 0;
  let found = false;
  for (const entry of plan) {
    if (!entry || typeof entry !== 'object') continue;
    const d = (entry as { duree?: unknown }).duree;
    if (typeof d !== 'string') continue;
    const m = d.match(/(\d+)\s*min/i);
    if (m) {
      total += parseInt(m[1], 10);
      found = true;
    }
  }
  return found ? Math.max(5, total) : undefined;
}
