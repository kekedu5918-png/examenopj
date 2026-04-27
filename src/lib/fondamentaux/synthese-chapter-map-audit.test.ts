import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';

type AnnexeRow = { ch: number; slug: string; partie: string };
type MapModule = {
  SLUG_TO_SYNTHESE_CHAPTER: Record<string, number | number[]>;
  SYNTHESE_ENRICH_SKIP_SLUGS: Set<string>;
  normalizeSyntheseChapters: (spec: number | number[] | undefined | null) => number[];
};

async function loadAnnexeAndMap(): Promise<{
  FONDAMENTAUX_CHAPITRES: AnnexeRow[];
  mapMod: MapModule;
}> {
  const root = process.cwd();
  const annexeHref = pathToFileURL(path.join(root, 'scripts/lib/fondamentaux-annexe-b.mjs')).href;
  const mapHref = pathToFileURL(path.join(root, 'scripts/lib/fondamentaux-synthese-chapter-map.mjs')).href;
  const [annexe, mapMod] = await Promise.all([
    import(annexeHref) as Promise<{ FONDAMENTAUX_CHAPITRES: AnnexeRow[] }>,
    import(mapHref) as Promise<MapModule>,
  ]);
  return { FONDAMENTAUX_CHAPITRES: annexe.FONDAMENTAUX_CHAPITRES, mapMod };
}

describe('Carte slug → chapitre synthèse (audit)', () => {
  it('chaque slug annexe B est soit exclu de l’enrich auto, soit mappé vers 1–46', async () => {
    const { FONDAMENTAUX_CHAPITRES, mapMod } = await loadAnnexeAndMap();
    const { SLUG_TO_SYNTHESE_CHAPTER, SYNTHESE_ENRICH_SKIP_SLUGS, normalizeSyntheseChapters } = mapMod;

    for (const row of FONDAMENTAUX_CHAPITRES) {
      if (SYNTHESE_ENRICH_SKIP_SLUGS.has(row.slug)) continue;

      const spec = SLUG_TO_SYNTHESE_CHAPTER[row.slug];
      expect(spec, `map manquante pour ${row.slug}`).toBeDefined();
      const nums = normalizeSyntheseChapters(spec!);
      expect(nums.length, `map vide pour ${row.slug}`).toBeGreaterThan(0);
      for (const n of nums) {
        expect(n).toBeGreaterThanOrEqual(1);
        expect(n).toBeLessThanOrEqual(46);
      }
    }
  });

  it('normalizeSyntheseChapters accepte nombre ou tableau', async () => {
    const { mapMod } = await loadAnnexeAndMap();
    expect(mapMod.normalizeSyntheseChapters(11)).toEqual([11]);
    expect(mapMod.normalizeSyntheseChapters([34, 35])).toEqual([34, 35]);
    expect(mapMod.normalizeSyntheseChapters(null)).toEqual([]);
  });
});
