/**
 * Recherche dans les contenus statiques (Markdown public + banque QCM TS).
 * Complémentaire de `searchLearningContent` (qui interroge Supabase).
 *
 * Pourquoi ? Le candidat tape "garde à vue" → doit immédiatement tomber sur
 * la fiche `/fondamentaux/garde-a-vue` et les QCM correspondants, sans qu'on
 * dépende d'un index Supabase qui n'inclut pas ces contenus.
 */
import { ENQUETES } from '@/data/enquetes-data';
import { quizQuestions } from '@/data/quiz-questions';
import { listMarkdownBasenames, readMarkdownFile, slugFromBasename } from '@/lib/content/markdown';

export type LocalSearchHit = {
  type: 'fiche' | 'quiz' | 'enquete';
  title: string;
  /** Extrait textuel autour du match (déjà nettoyé). */
  excerpt: string;
  href: string;
  /** Tag éditorial (procédure, DPS, DPG…) si disponible. */
  tag?: string;
};

export type LocalSearchResult = {
  fiches: LocalSearchHit[];
  quizzes: LocalSearchHit[];
  enquetes: LocalSearchHit[];
  total: number;
};

const EMPTY: LocalSearchResult = { fiches: [], quizzes: [], enquetes: [], total: 0 };

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildExcerpt(text: string, query: string, length = 140): string {
  const normalized = normalize(text);
  const idx = normalized.indexOf(normalize(query));
  if (idx < 0) return text.slice(0, length).trim();
  const start = Math.max(0, idx - 40);
  const end = Math.min(text.length, start + length);
  const prefix = start > 0 ? '… ' : '';
  const suffix = end < text.length ? ' …' : '';
  return prefix + text.slice(start, end).trim() + suffix;
}

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~|-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function searchMarkdownFiches(qNorm: string): Promise<LocalSearchHit[]> {
  let basenames: string[] = [];
  try {
    basenames = await listMarkdownBasenames('cours');
  } catch {
    return [];
  }

  const hits: LocalSearchHit[] = [];
  for (const basename of basenames) {
    let parsed: Awaited<ReturnType<typeof readMarkdownFile>>;
    try {
      parsed = await readMarkdownFile(`cours/${basename}.md`);
    } catch {
      continue;
    }
    const slug = slugFromBasename(basename);
    const title = typeof parsed.data.title === 'string' ? parsed.data.title : slug;
    const tagsRaw = parsed.data.tags;
    const tag = Array.isArray(tagsRaw) && typeof tagsRaw[0] === 'string' ? (tagsRaw[0] as string) : undefined;
    const body = stripMarkdown(parsed.content);
    const haystack = normalize(`${title} ${body}`);
    if (!haystack.includes(qNorm)) continue;

    hits.push({
      type: 'fiche',
      title,
      excerpt: buildExcerpt(body || title, qNorm),
      href: `/fondamentaux/${slug}`,
      tag,
    });
  }
  return hits;
}

function searchQuizzes(qNorm: string): LocalSearchHit[] {
  const hits: LocalSearchHit[] = [];
  for (const q of quizQuestions) {
    const haystack = normalize(`${q.question} ${q.options.join(' ')} ${q.explication ?? ''} ${q.article ?? ''}`);
    if (!haystack.includes(qNorm)) continue;
    hits.push({
      type: 'quiz',
      title: q.question,
      excerpt: q.explication ? buildExcerpt(q.explication, qNorm) : `Réponse : ${q.options[q.correctIndex] ?? '?'}`,
      href: `/entrainement/quiz?fascicule=${q.fascicule}`,
      tag: q.article ?? q.domaine,
    });
    if (hits.length >= 30) break;
  }
  return hits;
}

function searchEnquetes(qNorm: string): LocalSearchHit[] {
  const hits: LocalSearchHit[] = [];
  for (const e of ENQUETES) {
    const haystack = normalize(`${e.titre} ${e.resume} ${e.qualification} ${e.themeCourt}`);
    if (!haystack.includes(qNorm)) continue;
    hits.push({
      type: 'enquete',
      title: e.titre,
      excerpt: buildExcerpt(e.resume, qNorm),
      href: `/enquetes/${e.id}`,
      tag: e.themeCourt,
    });
  }
  return hits;
}

/**
 * Recherche locale (markdown + QCM TS + enquêtes).
 * Renvoie au maximum 20 résultats par catégorie.
 */
export async function searchLocalContent(query: string): Promise<LocalSearchResult> {
  const qNorm = normalize(query);
  if (qNorm.length < 2) return EMPTY;

  const [fiches, quizzes, enquetes] = await Promise.all([
    searchMarkdownFiches(qNorm),
    Promise.resolve(searchQuizzes(qNorm)),
    Promise.resolve(searchEnquetes(qNorm)),
  ]);

  const truncate = <T,>(arr: T[]) => arr.slice(0, 20);
  const out = {
    fiches: truncate(fiches),
    quizzes: truncate(quizzes),
    enquetes: truncate(enquetes),
    total: 0,
  };
  out.total = out.fiches.length + out.quizzes.length + out.enquetes.length;
  return out;
}
