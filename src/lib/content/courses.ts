import { listMarkdownBasenames, readMarkdownFile, slugFromBasename } from '@/lib/content/markdown';

export type CourseSummary = {
  slug: string;
  title: string;
  tags: string[];
  /** I–VI si présent dans le frontmatter */
  partieLabel?: string;
  /** 1–6 pour filtrage (dérivé de `partie` ou d’un entier) */
  partieIndex?: number;
  chapitre?: number;
  loi2025?: boolean;
};

const PARTIE_ROMAIN_TO_INDEX: Readonly<Record<string, number>> = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
};

const PARTIE_INDEX_TO_ROMAIN: ReadonlyArray<string> = ['I', 'II', 'III', 'IV', 'V', 'VI'];

function parseChapitre(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) return Math.trunc(value);
  if (typeof value === 'string' && /^\d+$/.test(value.trim())) return Math.trunc(Number(value));
  return undefined;
}

function parsePartieIndex(data: Record<string, unknown>): number | undefined {
  const raw = data.partie;
  if (typeof raw === 'number' && raw >= 1 && raw <= 6 && Number.isInteger(raw)) return raw;
  if (typeof raw === 'string') {
    const t = raw.trim();
    if (/^[1-6]$/.test(t)) return Number(t);
    const u = t.toUpperCase();
    if (u in PARTIE_ROMAIN_TO_INDEX) return PARTIE_ROMAIN_TO_INDEX[u];
  }
  return undefined;
}

function parseLoi2025(data: Record<string, unknown>): boolean | undefined {
  const v = data.loi2025;
  if (v === true) return true;
  if (v === false) return false;
  if (v === 'true' || v === 'True') return true;
  if (v === 'false' || v === 'False') return false;
  return undefined;
}

export async function getCourseSummaries(): Promise<CourseSummary[]> {
  const basenames = await listMarkdownBasenames('cours');
  const out: CourseSummary[] = [];
  for (const base of basenames) {
    const { data: raw } = await readMarkdownFile(`cours/${base}.md`);
    const data = raw as Record<string, unknown>;
    const title = typeof data.title === 'string' ? data.title : base.replace(/-/g, ' ');
    const tags = Array.isArray(data.tags)
      ? data.tags.filter((t): t is string => typeof t === 'string')
      : [];
    const chapitre = parseChapitre(data.chapitre);
    const partieIndex = parsePartieIndex(data);
    const pl = data.partie;
    const partieLabel =
      typeof pl === 'string'
        ? pl
        : typeof pl === 'number' && Number.isInteger(pl) && pl >= 1 && pl <= 6
          ? PARTIE_INDEX_TO_ROMAIN[pl - 1]
          : undefined;
    const loi2025 = parseLoi2025(data);

    out.push({
      slug: slugFromBasename(base),
      title,
      tags,
      partieLabel,
      partieIndex,
      chapitre,
      loi2025,
    });
  }
  return out.sort((a, b) => {
    const ca = a.chapitre ?? 9999;
    const cb = b.chapitre ?? 9999;
    if (ca !== cb) return ca - cb;
    return a.title.localeCompare(b.title, 'fr');
  });
}

export async function resolveCourseBasename(slug: string): Promise<string | null> {
  const basenames = await listMarkdownBasenames('cours');
  for (const b of basenames) {
    if (slugFromBasename(b) === slug.toLowerCase()) return b;
  }
  return null;
}
