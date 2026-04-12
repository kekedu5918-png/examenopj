import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { TrackOnMount } from '@/components/analytics/TrackOnMount';
import type { LearningPathModule } from '@/components/learning/LearningPath';
import { LearningPath } from '@/components/learning/LearningPath';
import { getCalendarDaysUntilParisDate, getDaysUntilOpjWrittenExam } from '@/constants/exam-dates';
import { getOnboardingPlan } from '@/features/onboarding/actions/onboarding-actions';
import { AnalyticsEvents } from '@/lib/analytics/events';
import {
  getUserFullProgress,
  getUserStreakCurrent,
  getUserXpTotal,
  type ModuleFullProgress,
} from '@/lib/learningPath';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

export const metadata: Metadata = {
  title: 'Parcours OPJ — 7 modules',
  description:
    'Parcours progressif type learning path : garde à vue, auditions, perquisitions, acteurs, qualifications, cadres procéduraux, nullités et recours.',
  alternates: { canonical: '/parcours-opj' },
};

const XP_PER_LEVEL = 600;

const DB_LESSON_TYPE_TO_UI: Record<
  string,
  LearningPathModule['lessons'][number]['type']
> = {
  discover: 'discovery',
  practice: 'training',
  consolidate: 'consolidation',
  case: 'case',
  exam: 'exam',
};

function mapLessonType(raw: string): LearningPathModule['lessons'][number]['type'] {
  return DB_LESSON_TYPE_TO_UI[raw] ?? 'training';
}

/** Garantit une chaîne sérialisable (évite « Objects are not valid as a React child » si la DB renvoie autre chose). */
function safeText(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return fallback;
  return String(value);
}

function mapModuleFullProgressToLearningPath(modules: ModuleFullProgress[]): LearningPathModule[] {
  return modules.map((mod) => ({
    id: mod.moduleId,
    slug: safeText(mod.slug),
    title: safeText(mod.title),
    description: safeText(mod.description ?? ''),
    color: safeText(mod.color, '#64748b'),
    icon: safeText(mod.icon, '📘'),
    completionPercent: mod.completionPercent,
    lessons: mod.lessons.map((le) => ({
      lessonId: le.lessonId,
      title: safeText(le.title),
      href: safeText(le.href ?? '#', '#'),
      type: mapLessonType(typeof le.type === 'string' ? le.type : ''),
      estimatedMinutes: le.estimatedMinutes ?? 5,
      xpReward: le.xpReward ?? 10,
      status: le.status,
      lastScore: le.lastScore,
    })),
  }));
}

async function resolveDaysUntilExam(): Promise<number> {
  const onboarding = await getOnboardingPlan();
  const examDateStr = onboarding?.plan.exam_date;
  if (typeof examDateStr === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(examDateStr)) {
    const [y, m, d] = examDateStr.split('-').map(Number);
    return getCalendarDaysUntilParisDate(y, m, d);
  }
  return getDaysUntilOpjWrittenExam();
}

export default async function ParcoursOpjPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/parcours-opj');
  }

  const [modulesRaw, userXp, userStreak, daysUntilExam] = await Promise.all([
    getUserFullProgress(user.id),
    getUserXpTotal(user.id),
    getUserStreakCurrent(user.id),
    resolveDaysUntilExam(),
  ]);

  const modules = mapModuleFullProgressToLearningPath(modulesRaw);
  const userLevel = Math.floor(userXp / XP_PER_LEVEL) + 1;

  return (
    <>
      <TrackOnMount event={AnalyticsEvents.learningPathView} />
      <LearningPath
        modules={modules}
        userStreak={userStreak}
        userXp={userXp}
        userLevel={userLevel}
        lives={3}
        daysUntilExam={daysUntilExam}
      />
    </>
  );
}
