import { describe, expect, it } from 'vitest';

import { COURS_REVISION_FIL } from '@/data/cours-revision-fil';
import { ENQUETES } from '@/data/enquetes-data';
import { REVISION_THEMES } from '@/data/revision-themes';
import { getCoursPathForFascicule, getSecondaryCoursPathsForFascicule } from '@/lib/content/fascicule-cours-map';
import { listMarkdownBasenames, slugFromBasename } from '@/lib/content/markdown';

/** Anciens slugs sans fiche dans le corpus 46 (ne doivent plus apparaître en liens directs). */
const ORPHAN_SLUGS = new Set([
  'cadres-enquete',
  'crimes-biens',
  'crimes-personnes',
  'fouille-vehicule',
  'instruction-mandats',
  'libertes-publiques',
  'loi-penale-responsabilite',
  'saisies-scelles',
]);

function slugFromFondamentauxHref(href: string): string | null {
  if (!href.startsWith('/fondamentaux/')) return null;
  const rest = href.slice('/fondamentaux/'.length).split('/')[0];
  return rest || null;
}

describe('2F.2 — deep-links fondamentaux', () => {
  it('chaque lien /fondamentaux/:slug pointe vers un .md cours existant', async () => {
    const basenames = await listMarkdownBasenames('cours');
    const slugs = new Set(basenames.map((b) => slugFromBasename(b)));

    const hrefs: string[] = [];

    for (const e of ENQUETES) {
      for (const l of e.liensModules ?? []) {
        const s = slugFromFondamentauxHref(l.href);
        if (s) hrefs.push(l.href);
      }
    }
    for (const t of REVISION_THEMES) {
      for (const et of t.etapes) {
        for (const l of et.liens) {
          const s = slugFromFondamentauxHref(l.href);
          if (s) hrefs.push(l.href);
        }
      }
    }
    for (const step of COURS_REVISION_FIL) {
      for (const l of step.liens) {
        const s = slugFromFondamentauxHref(l.href);
        if (s) hrefs.push(l.href);
      }
    }

    for (const href of hrefs) {
      const slug = slugFromFondamentauxHref(href);
      if (!slug) continue;
      expect(slugs.has(slug), `lien mort : ${href}`).toBe(true);
      expect(ORPHAN_SLUGS.has(slug), `slug orphelin résiduel : ${href}`).toBe(false);
    }
  });

  it('fascicule-cours-map : chemins primaires et secondaires sans orphelin', () => {
    for (let n = 1; n <= 15; n += 1) {
      const p = getCoursPathForFascicule(n);
      if (p) {
        const slug = slugFromFondamentauxHref(p);
        expect(slug && ORPHAN_SLUGS.has(slug), `primaire fasc. ${n}: ${p}`).toBe(false);
      }
      for (const sec of getSecondaryCoursPathsForFascicule(n)) {
        const slug = slugFromFondamentauxHref(sec);
        expect(slug && ORPHAN_SLUGS.has(slug), `secondaire fasc. ${n}: ${sec}`).toBe(false);
      }
    }
  });
});
