import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { SupabaseClient } from '@supabase/supabase-js';

/** Seuil global pour enchaîner les leçons (aligné sur `isLessonUnlocked`, spec 5B). */
export const UNLOCK_MIN_SCORE_PCT = 80;

/** UUID standard (versions 1–5), sans dépendance. */
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidUuid(id: string): boolean {
  return UUID_RE.test(id.trim());
}

/**
 * Forme minimale du schéma `learning_path` pour typer le client sans `any`
 * (les types générés globaux ne couvrent pas encore ce schéma).
 * @see docs/TECH_DEBT.md — génération Supabase multi-schéma
 */
export type LearningPathDatabase = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
  learning_path: {
    Tables: {
      modules: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          color: string;
          icon: string;
          order_index: number;
        };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      };
      lessons: {
        Row: {
          id: string;
          module_id: string;
          slug: string;
          client_key: string | null;
          title: string;
          type: string;
          order_index: number;
          xp_reward: number;
          min_score_unlock: number;
          estimated_minutes: number;
          href: string | null;
        };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          score: number;
          attempts: number;
          completed_at: string | null;
          needs_review_at: string | null;
          updated_at: string;
        };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      };
      xp_events: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          reason: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          amount: number;
          reason: string;
        };
        Update: Record<string, unknown>;
        Relationships: [];
      };
      user_streaks: {
        Row: {
          user_id: string;
          current_streak: number;
          longest_streak: number;
          last_activity_date: string | null;
          streak_freeze_available: number;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          current_streak: number;
          longest_streak: number;
          last_activity_date: string | null;
          streak_freeze_available: number;
          updated_at: string;
        };
        Update: {
          current_streak?: number;
          longest_streak?: number;
          last_activity_date?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

async function getLearningPathClient(): Promise<SupabaseClient<LearningPathDatabase>> {
  const client = await createSupabaseServerClient();
  return client as unknown as SupabaseClient<LearningPathDatabase>;
}

export type LessonProgressStatus = 'locked' | 'unlocked' | 'completed' | 'needs_review';

export type LessonProgressItem = {
  lessonId: string;
  clientKey: string | null;
  slug: string;
  title: string;
  orderIndex: number;
  type: string;
  href: string | null;
  minScoreUnlock: number;
  xpReward: number;
  estimatedMinutes: number;
  status: LessonProgressStatus;
  /** Dernier score enregistré (0–100), ou `null` si aucune tentative. */
  lastScore: number | null;
  attempts: number | null;
  needsReviewAt: string | null;
  completedAt: string | null;
};

export type ModuleFullProgress = {
  moduleId: string;
  slug: string;
  title: string;
  description: string | null;
  color: string;
  icon: string;
  orderIndex: number;
  /** 0–100, arrondi : leçons avec score ≥ `min_score_unlock` / total leçons. */
  completionPercent: number;
  lessons: LessonProgressItem[];
};

export type NextLessonPick = {
  moduleTitle: string;
  lessonTitle: string;
  href: string;
  kind: 'needs_review' | 'continue';
};

/**
 * Prochaine étape recommandée pour le dashboard : révision espacée prioritaire,
 * sinon première leçon déverrouillée non complétée (avec `href`).
 */
export function pickNextLessonFromProgress(modules: ModuleFullProgress[]): NextLessonPick | null {
  for (const mod of modules) {
    for (const le of mod.lessons) {
      if (le.status === 'needs_review' && le.href) {
        return {
          moduleTitle: mod.title,
          lessonTitle: le.title,
          href: le.href,
          kind: 'needs_review',
        };
      }
    }
  }
  for (const mod of modules) {
    for (const le of mod.lessons) {
      if (le.status === 'unlocked' && le.href) {
        return {
          moduleTitle: mod.title,
          lessonTitle: le.title,
          href: le.href,
          kind: 'continue',
        };
      }
    }
  }
  return null;
}

type LessonRow = {
  id: string;
  module_id: string;
  slug: string;
  client_key: string | null;
  title: string;
  type: string;
  order_index: number;
  xp_reward: number;
  min_score_unlock: number;
  estimated_minutes: number;
  href: string | null;
};

type ProgressRow = {
  lesson_id: string;
  score: number;
  attempts: number;
  completed_at: string | null;
  needs_review_at: string | null;
};

function resolveLessonStatus(args: {
  unlocked: boolean;
  score: number | null;
  minScoreUnlock: number;
  needsReviewAt: string | null;
}): LessonProgressStatus {
  const { unlocked, score, minScoreUnlock, needsReviewAt } = args;
  if (!unlocked) return 'locked';

  const now = Date.now();
  if (needsReviewAt && new Date(needsReviewAt).getTime() <= now) {
    return 'needs_review';
  }

  if (score !== null && score >= minScoreUnlock) {
    return 'completed';
  }

  return 'unlocked';
}

/**
 * Charge les 7 modules OPJ avec progression : % de complétion, leçons + statuts, dernier score.
 * Déverrouillage **par module** : 1re leçon toujours accessible ; suivante si la précédente a ≥ 80 %.
 */
/** Total XP cumulé (`learning_path.xp_events`) pour l’utilisateur. */
export async function getUserXpTotal(userId: string): Promise<number> {
  if (!isValidUuid(userId)) {
    return 0;
  }

  const supabase = await getLearningPathClient();
  const { data, error } = await supabase
    .schema('learning_path')
    .from('xp_events')
    .select('amount')
    .eq('user_id', userId);

  if (error) {
    throw new Error(`learning_path.xp_events: ${error.message}`);
  }

  let sum = 0;
  for (const row of data ?? []) {
    sum += row.amount;
  }
  return sum;
}

/** Série courante (`learning_path.user_streaks`), ou 0 si aucune ligne. */
export async function getUserStreakCurrent(userId: string): Promise<number> {
  if (!isValidUuid(userId)) {
    return 0;
  }

  const supabase = await getLearningPathClient();
  const { data, error } = await supabase
    .schema('learning_path')
    .from('user_streaks')
    .select('current_streak')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    throw new Error(`learning_path.user_streaks: ${error.message}`);
  }

  return data?.current_streak ?? 0;
}

export async function getUserFullProgress(userId: string): Promise<ModuleFullProgress[]> {
  const supabase = await getLearningPathClient();
  const db = supabase.schema('learning_path');

  const [{ data: modules, error: mErr }, { data: lessons, error: lErr }, { data: progress, error: pErr }] =
    await Promise.all([
      db.from('modules').select('id, slug, title, description, color, icon, order_index').order('order_index'),
      db.from('lessons').select(
        'id, module_id, slug, client_key, title, type, order_index, xp_reward, min_score_unlock, estimated_minutes, href',
      ),
      db.from('user_progress').select('lesson_id, score, attempts, completed_at, needs_review_at').eq('user_id', userId),
    ]);

  if (mErr) throw new Error(`learning_path.modules: ${mErr.message}`);
  if (lErr) throw new Error(`learning_path.lessons: ${lErr.message}`);
  if (pErr) throw new Error(`learning_path.user_progress: ${pErr.message}`);

  const moduleRows = modules ?? [];
  const lessonRows = lessons ?? [];
  const progressRows = progress ?? [];

  const byLessonId = new Map<string, ProgressRow>();
  for (const row of progressRows) {
    byLessonId.set(row.lesson_id, row);
  }

  const lessonsByModule = new Map<string, LessonRow[]>();
  for (const le of lessonRows) {
    const list = lessonsByModule.get(le.module_id) ?? [];
    list.push(le);
    lessonsByModule.set(le.module_id, list);
  }
  for (const [, list] of lessonsByModule) {
    list.sort((a, b) => a.order_index - b.order_index);
  }

  return moduleRows.map((mod) => {
    const modLessons = lessonsByModule.get(mod.id) ?? [];
    const items: LessonProgressItem[] = [];

    let completedCount = 0;

    for (let i = 0; i < modLessons.length; i++) {
      const le = modLessons[i];
      const prev = i > 0 ? modLessons[i - 1] : null;
      const prevProg = prev ? byLessonId.get(prev.id) : undefined;
      const prevScore = prevProg?.score ?? null;

      const firstInModule = i === 0;
      const unlocked =
        firstInModule || (prevScore !== null && prevScore >= UNLOCK_MIN_SCORE_PCT);

      const prog = byLessonId.get(le.id);
      const lastScore = prog !== undefined ? prog.score : null;
      const minScoreUnlock = le.min_score_unlock;

      if (lastScore !== null && lastScore >= minScoreUnlock) {
        completedCount += 1;
      }

      const status = resolveLessonStatus({
        unlocked,
        score: lastScore,
        minScoreUnlock,
        needsReviewAt: prog?.needs_review_at ?? null,
      });

      items.push({
        lessonId: le.id,
        clientKey: le.client_key,
        slug: le.slug,
        title: le.title,
        orderIndex: le.order_index,
        type: le.type,
        href: le.href,
        minScoreUnlock,
        xpReward: le.xp_reward,
        estimatedMinutes: le.estimated_minutes,
        status,
        lastScore,
        attempts: prog?.attempts ?? null,
        needsReviewAt: prog?.needs_review_at ?? null,
        completedAt: prog?.completed_at ?? null,
      });
    }

    const total = modLessons.length;
    const completionPercent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

    return {
      moduleId: mod.id,
      slug: mod.slug,
      title: mod.title,
      description: mod.description,
      color: mod.color,
      icon: mod.icon,
      orderIndex: mod.order_index,
      completionPercent,
      lessons: items,
    };
  });
}

/**
 * Indique si une leçon est accessible : 1re leçon du module → `true` sans lire `user_progress`.
 * Sinon : la leçon précédente (même module, `order_index` strictement inférieur, plus proche)
 * doit avoir un score ≥ {@link UNLOCK_MIN_SCORE_PCT}.
 * Requêtes ciblées uniquement (pas de chargement global de progression).
 */
export async function isLessonUnlocked(userId: string, lessonId: string): Promise<boolean> {
  if (!isValidUuid(userId) || !isValidUuid(lessonId)) {
    return false;
  }

  const supabase = await getLearningPathClient();
  const db = supabase.schema('learning_path');

  const { data: current, error: errCurrent } = await db
    .from('lessons')
    .select('module_id, order_index')
    .eq('id', lessonId)
    .maybeSingle();

  if (errCurrent || !current) {
    return false;
  }

  const { data: previous, error: errPrev } = await db
    .from('lessons')
    .select('id')
    .eq('module_id', current.module_id)
    .lt('order_index', current.order_index)
    .order('order_index', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (errPrev) {
    return false;
  }

  if (!previous) {
    return true;
  }

  const { data: prog, error: errProg } = await db
    .from('user_progress')
    .select('score')
    .eq('user_id', userId)
    .eq('lesson_id', previous.id)
    .maybeSingle();

  if (errProg || !prog) {
    return false;
  }

  return prog.score >= UNLOCK_MIN_SCORE_PCT;
}

export type CompleteLessonSuccess = {
  success: true;
  xpGained: number;
  newStreak: number;
  needsReviewAt: Date;
  isPersonalBest: boolean;
};

export type CompleteLessonFailure = { success: false };

export type CompleteLessonResult = CompleteLessonSuccess | CompleteLessonFailure;

function todayUtcDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayUtcDateString(): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

/** Règle produit : +1j / +3j / +7j selon le score (à partir de maintenant, UTC). */
function computeNeedsReviewAt(score: number, from: Date): Date {
  const ms = from.getTime();
  const addDays = (days: number) => {
    const out = new Date(ms);
    out.setUTCDate(out.getUTCDate() + days);
    return out;
  };
  if (score >= 90) return addDays(7);
  if (score >= 70) return addDays(3);
  return addDays(1);
}

type XpBand = { amount: 20; reason: 'perfect_score' } | { amount: 10; reason: 'lesson_complete' } | { amount: 5; reason: 'lesson_attempt' };

function xpForScore(score: number): XpBand {
  if (score >= 90) return { amount: 20, reason: 'perfect_score' };
  if (score >= 70) return { amount: 10, reason: 'lesson_complete' };
  return { amount: 5, reason: 'lesson_attempt' };
}

/**
 * Enregistre une tentative de leçon : progression, XP, streak (ordre A → B → C).
 * Aucune exception : erreurs → `{ success: false }`.
 */
export async function completeLesson(
  userId: string,
  lessonId: string,
  score: number,
): Promise<CompleteLessonResult> {
  if (!isValidUuid(userId) || !isValidUuid(lessonId)) {
    return { success: false };
  }
  if (!Number.isFinite(score) || score < 0 || score > 100) {
    return { success: false };
  }

  const supabase = await getLearningPathClient();
  const db = supabase.schema('learning_path');
  const now = new Date();
  const nowIso = now.toISOString();

  // ---------------------------------------------------------------------------
  // ÉTAPE A — user_progress
  // ---------------------------------------------------------------------------
  const { data: existing, error: errSelect } = await db
    .from('user_progress')
    .select('id, score, attempts')
    .eq('user_id', userId)
    .eq('lesson_id', lessonId)
    .maybeSingle();

  if (errSelect) {
    return { success: false };
  }

  const previousScore = existing?.score;
  const previousAttempts = existing?.attempts ?? 0;
  const newAttempts = previousAttempts + 1;
  const needsReviewAt = computeNeedsReviewAt(score, now);
  const needsReviewIso = needsReviewAt.toISOString();

  const isPersonalBest = existing === null || score > existing.score;

  if (existing) {
    const { error: errUp } = await db
      .from('user_progress')
      .update({
        score,
        attempts: newAttempts,
        completed_at: nowIso,
        needs_review_at: needsReviewIso,
        updated_at: nowIso,
      })
      .eq('user_id', userId)
      .eq('lesson_id', lessonId);

    if (errUp) {
      return { success: false };
    }
  } else {
    const { error: errIn } = await db.from('user_progress').insert({
      user_id: userId,
      lesson_id: lessonId,
      score,
      attempts: newAttempts,
      completed_at: nowIso,
      needs_review_at: needsReviewIso,
      updated_at: nowIso,
    });

    if (errIn) {
      return { success: false };
    }
  }

  // ---------------------------------------------------------------------------
  // ÉTAPE B — xp_events (pas d’XP si 2e+ tentative et régression de score)
  // ---------------------------------------------------------------------------
  const regression = newAttempts > 1 && previousScore !== undefined && score < previousScore;
  let xpGained = 0;

  if (!regression) {
    const { amount, reason } = xpForScore(score);
    xpGained = amount;
    const { error: errXp } = await db.from('xp_events').insert({
      user_id: userId,
      amount,
      reason,
    });
    if (errXp) {
      return { success: false };
    }
  }

  // ---------------------------------------------------------------------------
  // ÉTAPE C — user_streaks
  // ---------------------------------------------------------------------------
  const todayStr = todayUtcDateString();
  const yesterdayStr = yesterdayUtcDateString();

  const { data: streakRow, error: errStreakRead } = await db
    .from('user_streaks')
    .select('current_streak, longest_streak, last_activity_date, streak_freeze_available')
    .eq('user_id', userId)
    .maybeSingle();

  if (errStreakRead) {
    return { success: false };
  }

  let newStreak: number;
  const last = streakRow?.last_activity_date ?? null;

  if (last === null) {
    newStreak = 1;
  } else if (last === todayStr) {
    newStreak = streakRow?.current_streak ?? 1;
  } else if (last === yesterdayStr) {
    newStreak = (streakRow?.current_streak ?? 0) + 1;
  } else {
    newStreak = 1;
  }

  const prevLongest = streakRow?.longest_streak ?? 0;
  const newLongest = Math.max(prevLongest, newStreak);

  if (streakRow) {
    const { error: errStreakUp } = await db
      .from('user_streaks')
      .update({
        current_streak: newStreak,
        longest_streak: newLongest,
        last_activity_date: todayStr,
        updated_at: nowIso,
      })
      .eq('user_id', userId);

    if (errStreakUp) {
      return { success: false };
    }
  } else {
    const { error: errStreakIn } = await db.from('user_streaks').insert({
      user_id: userId,
      current_streak: newStreak,
      longest_streak: newLongest,
      last_activity_date: todayStr,
      streak_freeze_available: 1,
      updated_at: nowIso,
    });

    if (errStreakIn) {
      return { success: false };
    }
  }

  return {
    success: true,
    xpGained,
    newStreak,
    needsReviewAt,
    isPersonalBest,
  };
}

/** Résout l’UUID d’une leçon par `client_key` (pont quiz / intégrations). */
export async function getLessonIdByClientKey(clientKey: string): Promise<string | null> {
  const key = clientKey.trim();
  if (!key) return null;

  const supabase = await getLearningPathClient();
  const db = supabase.schema('learning_path');

  const { data, error } = await db.from('lessons').select('id').eq('client_key', key).maybeSingle();

  if (error || !data) {
    return null;
  }

  return data.id;
}

export type ReviewLesson = {
  lessonId: string;
  title: string;
  href: string;
  moduleId: string;
  moduleName: string;
  lastScore: number;
  needsReviewAt: Date;
  attempts: number;
};

/**
 * Leçons à réviser aujourd’hui : `needs_review_at <= maintenant`, tri urgent → moins urgent, max 20.
 */
export async function getTodayReviews(userId: string): Promise<ReviewLesson[]> {
  if (!isValidUuid(userId)) {
    return [];
  }

  const supabase = await getLearningPathClient();
  const db = supabase.schema('learning_path');
  const nowIso = new Date().toISOString();

  const { data: progressRows, error: errProg } = await db
    .from('user_progress')
    .select('lesson_id, score, attempts, needs_review_at')
    .eq('user_id', userId)
    .not('needs_review_at', 'is', null)
    .lte('needs_review_at', nowIso)
    .order('needs_review_at', { ascending: true })
    .limit(20);

  if (errProg || !progressRows?.length) {
    return [];
  }

  type ProgressPick = {
    lesson_id: string;
    score: number;
    attempts: number;
    needs_review_at: string;
  };

  const ordered = progressRows as ProgressPick[];
  const lessonIds = [...new Set(ordered.map((r) => r.lesson_id))];

  const { data: lessonRows, error: errLessons } = await db
    .from('lessons')
    .select('id, title, href, module_id')
    .in('id', lessonIds);

  if (errLessons) {
    return [];
  }

  if (!lessonRows?.length) {
    return [];
  }

  type LessonPick = {
    id: string;
    title: string;
    href: string | null;
    module_id: string;
  };

  const lessons = lessonRows as LessonPick[];
  const moduleIds = [...new Set(lessons.map((l) => l.module_id))];

  const { data: moduleRows, error: errMods } = await db
    .from('modules')
    .select('id, title')
    .in('id', moduleIds);

  if (errMods) {
    return [];
  }

  type ModulePick = { id: string; title: string };
  const modules = (moduleRows ?? []) as ModulePick[];

  const lessonById = new Map(lessons.map((l) => [l.id, l]));
  const moduleTitleById = new Map(modules.map((m) => [m.id, m.title]));

  const out: ReviewLesson[] = [];
  for (const p of ordered) {
    const le = lessonById.get(p.lesson_id);
    if (!le) continue;

    out.push({
      lessonId: le.id,
      title: le.title,
      href: le.href ?? '',
      moduleId: le.module_id,
      moduleName: moduleTitleById.get(le.module_id) ?? '',
      lastScore: p.score,
      needsReviewAt: new Date(p.needs_review_at),
      attempts: p.attempts,
    });
  }

  return out;
}
