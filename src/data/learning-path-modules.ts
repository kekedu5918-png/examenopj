/**
 * Parcours pédagogique — 7 modules OPJ (structure type Duolingo).
 * Les `href` pointent vers le contenu existant du site ; la progression peut être synchronisée avec `user_node_progress` (Supabase).
 */

export type LearningNodeKind = 'discovery' | 'training' | 'consolidation' | 'case' | 'exam';

export type LearningNodeDef = {
  id: string;
  title: string;
  kind: LearningNodeKind;
  href: string;
  minScorePct: number;
};

export type LearningModuleDef = {
  id: string;
  title: string;
  shortLabel: string;
  color: string;
  ring: string;
  nodes: LearningNodeDef[];
};

export const LEARNING_PATH_MODULES: LearningModuleDef[] = [
  {
    id: 'gav',
    title: 'La garde à vue',
    shortLabel: 'GAV',
    color: 'from-blue-600/20 to-blue-950/40',
    ring: 'ring-blue-500/35',
    nodes: [
      { id: 'gav-1', title: 'Découverte — cadre légal', kind: 'discovery', href: '/fondamentaux/garde-a-vue', minScorePct: 80 },
      { id: 'gav-2', title: 'QCM guidé', kind: 'training', href: '/quiz', minScorePct: 80 },
      { id: 'gav-3', title: 'Consolidation', kind: 'consolidation', href: '/flashcards', minScorePct: 80 },
      { id: 'gav-4', title: 'Cas pratique', kind: 'case', href: '/cours/enquetes', minScorePct: 80 },
      { id: 'gav-5', title: 'Mini-examen', kind: 'exam', href: '/quiz', minScorePct: 80 },
    ],
  },
  {
    id: 'audition',
    title: "L'audition et l'interrogatoire",
    shortLabel: 'Auditions',
    color: 'from-violet-600/20 to-violet-950/40',
    ring: 'ring-violet-500/35',
    nodes: [
      { id: 'aud-1', title: 'Découverte — fiche audition', kind: 'discovery', href: '/fondamentaux/audition', minScorePct: 80 },
      { id: 'aud-2', title: 'QCM guidé', kind: 'training', href: '/quiz', minScorePct: 80 },
      { id: 'aud-3', title: 'Consolidation', kind: 'consolidation', href: '/flashcards', minScorePct: 80 },
      { id: 'aud-4', title: 'Cas pratique', kind: 'case', href: '/cours/enquetes/alpha', minScorePct: 80 },
      { id: 'aud-5', title: 'Mini-examen', kind: 'exam', href: '/entrainement/articulation', minScorePct: 80 },
    ],
  },
  {
    id: 'perquisitions',
    title: 'Perquisitions et saisies',
    shortLabel: 'Perquisitions',
    color: 'from-rose-600/20 to-rose-950/40',
    ring: 'ring-rose-500/35',
    nodes: [
      { id: 'per-1', title: 'Découverte — perquisition', kind: 'discovery', href: '/fondamentaux/perquisition', minScorePct: 80 },
      { id: 'per-2', title: 'QCM guidé', kind: 'training', href: '/quiz', minScorePct: 80 },
      { id: 'per-3', title: 'Consolidation', kind: 'consolidation', href: '/flashcards', minScorePct: 80 },
      { id: 'per-4', title: 'Cas pratique', kind: 'case', href: '/cours/enquetes', minScorePct: 80 },
      { id: 'per-5', title: 'Mini-examen', kind: 'exam', href: '/quiz', minScorePct: 80 },
    ],
  },
  {
    id: 'acteurs',
    title: 'Acteurs judiciaires',
    shortLabel: 'Acteurs',
    color: 'from-amber-500/20 to-amber-950/40',
    ring: 'ring-amber-500/35',
    nodes: [
      { id: 'act-1', title: 'Découverte — OPJ / APJ / APJA', kind: 'discovery', href: '/fondamentaux/opj-apj-apja', minScorePct: 80 },
      { id: 'act-2', title: 'QCM guidé', kind: 'training', href: '/quiz', minScorePct: 80 },
      { id: 'act-3', title: 'Consolidation', kind: 'consolidation', href: '/flashcards', minScorePct: 80 },
      { id: 'act-4', title: 'Cas pratique', kind: 'case', href: '/epreuves/epreuve-2', minScorePct: 80 },
      { id: 'act-5', title: 'Mini-examen', kind: 'exam', href: '/quiz', minScorePct: 80 },
    ],
  },
  {
    id: 'infractions',
    title: 'Infractions et qualifications',
    shortLabel: 'Qualifs',
    color: 'from-emerald-600/20 to-emerald-950/40',
    ring: 'ring-emerald-500/35',
    nodes: [
      { id: 'inf-1', title: 'Découverte — référentiel', kind: 'discovery', href: '/infractions', minScorePct: 80 },
      { id: 'inf-2', title: 'QCM guidé', kind: 'training', href: '/quiz', minScorePct: 80 },
      { id: 'inf-3', title: 'Flashcards', kind: 'consolidation', href: '/flashcards', minScorePct: 80 },
      { id: 'inf-4', title: 'Cas pratique', kind: 'case', href: '/cours/modules', minScorePct: 80 },
      { id: 'inf-5', title: 'Mini-examen', kind: 'exam', href: '/quiz', minScorePct: 80 },
    ],
  },
  {
    /** Même slug que `learning_path.modules` en base (`procedure`). */
    id: 'procedure',
    title: 'Flagrance et préliminaire',
    shortLabel: 'Cadres',
    color: 'from-cyan-600/20 to-cyan-950/40',
    ring: 'ring-cyan-500/35',
    nodes: [
      { id: 'fla-1', title: 'Découverte — cadres d’enquête', kind: 'discovery', href: '/fondamentaux/cadres-enquete', minScorePct: 80 },
      { id: 'fla-2', title: 'QCM guidé', kind: 'training', href: '/quiz', minScorePct: 80 },
      { id: 'fla-3', title: 'Consolidation', kind: 'consolidation', href: '/flashcards', minScorePct: 80 },
      { id: 'fla-4', title: 'Enquêtes Alpha→Charlie', kind: 'case', href: '/cours/enquetes', minScorePct: 80 },
      { id: 'fla-5', title: 'Mini-examen', kind: 'exam', href: '/sujets-blancs', minScorePct: 80 },
    ],
  },
  {
    id: 'nullites',
    title: 'Nullités et recours',
    shortLabel: 'Recours',
    color: 'from-slate-500/20 to-slate-950/40',
    ring: 'ring-slate-400/35',
    nodes: [
      { id: 'nul-1', title: 'Découverte — nullités', kind: 'discovery', href: '/fondamentaux/nullites', minScorePct: 80 },
      { id: 'nul-2', title: 'QCM guidé', kind: 'training', href: '/quiz', minScorePct: 80 },
      { id: 'nul-3', title: 'Consolidation', kind: 'consolidation', href: '/flashcards', minScorePct: 80 },
      { id: 'nul-4', title: 'Cas pratique', kind: 'case', href: '/epreuves/epreuve-3', minScorePct: 80 },
      { id: 'nul-5', title: 'Mini-examen', kind: 'exam', href: '/quiz', minScorePct: 80 },
    ],
  },
];

const STORAGE_KEY = 'examenopj-learning-path-v1';

export type NodeProgressLocal = Record<string, { scorePct: number; at: string }>;

export function loadLearningPathProgress(): NodeProgressLocal {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as NodeProgressLocal;
  } catch {
    return {};
  }
}

export function saveNodeProgress(nodeId: string, scorePct: number): void {
  if (typeof window === 'undefined') return;
  const prev = loadLearningPathProgress();
  prev[nodeId] = { scorePct, at: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prev));
  window.dispatchEvent(new CustomEvent('examenopj:learning-path'));
}

/** Fusionne les scores du compte (Supabase) dans le local : garde le max par nœud. */
export function mergeRemoteIntoLocalStorage(remoteScoresByClientKey: Record<string, number>): void {
  if (typeof window === 'undefined') return;
  const prev = loadLearningPathProgress();
  let changed = false;
  for (const [id, score] of Object.entries(remoteScoresByClientKey)) {
    const cur = prev[id]?.scorePct ?? 0;
    if (score > cur) {
      prev[id] = { scorePct: score, at: new Date().toISOString() };
      changed = true;
    }
  }
  if (changed) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prev));
    window.dispatchEvent(new CustomEvent('examenopj:learning-path'));
  }
}

/** Déverrouillage global : le nœud i nécessite le précédent à ≥ minScorePct (tous modules confondus). */
export function isNodeUnlockedByFlatIndex(flatIndex: number): boolean {
  if (flatIndex <= 0) return true;
  const flat = flattenNodesInOrder();
  const prev = flat[flatIndex - 1];
  if (!prev) return false;
  const p = loadLearningPathProgress()[prev.id];
  return !!p && p.scorePct >= prev.minScorePct;
}

export function flattenNodesInOrder(): LearningNodeDef[] {
  return LEARNING_PATH_MODULES.flatMap((m) => m.nodes);
}

export function globalProgressPercent(): number {
  const flat = flattenNodesInOrder();
  if (flat.length === 0) return 0;
  const prog = loadLearningPathProgress();
  const done = flat.filter((n) => prog[n.id]?.scorePct >= n.minScorePct).length;
  return Math.round((done / flat.length) * 100);
}
