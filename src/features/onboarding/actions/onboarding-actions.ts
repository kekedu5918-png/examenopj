'use server';

import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

import type { DiagnosticAnswer, DiagnosticLevel, DiagnosticResult, FormationPhase, PersonalizedPlan } from '../types';

const EXAM_DATE = new Date('2026-06-11');

function getDaysUntilExam(): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((EXAM_DATE.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
}

function calculateDiagnosticLevel(answers: DiagnosticAnswer[]): {
  level: DiagnosticLevel;
  score: number;
  score_percent: number;
} {
  const score = answers.filter((a) => a.correct).length;

  if (score === 5) return { level: 'Expert', score, score_percent: 100 };
  if (score >= 3) return { level: 'Intermédiaire', score, score_percent: Math.round((score / 5) * 100) };
  if (score >= 1) return { level: 'Débutant', score, score_percent: Math.round((score / 5) * 100) };
  return { level: 'Novice', score, score_percent: 0 };
}

function generatePlan(
  formationPhase: FormationPhase,
  weaknesses: string[],
  level: DiagnosticLevel,
): PersonalizedPlan {
  const daysUntilExam = getDaysUntilExam();
  const totalWeeks = Math.min(10, Math.max(4, Math.floor(daysUntilExam / 7)));
  const examDateStr = EXAM_DATE.toISOString().slice(0, 10);

  const isHighMastery = level === 'Expert';
  const isLowMastery = level === 'Novice' || level === 'Débutant';
  const isLate = formationPhase === 'late';

  const phases = [];

  // Phase 1 : Fondamentaux (sauf Expert ou J-28)
  if (!isHighMastery && !isLate) {
    const phase1Topics = [];
    if (weaknesses.includes('infractions')) {
      phase1Topics.push({ id: 'fondamentaux_infractions', name: 'Fondamentaux Infractions (vol, recel, violences)' });
    }
    if (weaknesses.includes('procedure')) {
      phase1Topics.push({ id: 'fondamentaux_procedure', name: 'Fondamentaux Procédure (GAV, perquisition)' });
    }
    if (weaknesses.includes('oral')) {
      phase1Topics.push({ id: 'oral_intro', name: 'Introduction à l\'oral (techniques, posture)' });
    }
    if (phase1Topics.length === 0) {
      phase1Topics.push({ id: 'revision_generale', name: 'Révision générale des fondamentaux' });
    }

    phases.push({
      phase_number: 1,
      name: 'Consolidation',
      duration_weeks: isLowMastery ? 3 : 2,
      daily_time_minutes: 30,
      topics: phase1Topics,
    });
  }

  // Phase 2 : Révision intensive
  const phase2Weeks = isHighMastery ? 5 : isLate ? 2 : isLowMastery ? 3 : 3;
  phases.push({
    phase_number: isHighMastery || isLate ? 1 : 2,
    name: 'Révision Intensive',
    duration_weeks: phase2Weeks,
    daily_time_minutes: 45,
    topics: [
      { id: 'infractions', name: '55 Infractions', items_per_week: isLowMastery ? 5 : 8 },
      { id: 'enquetes', name: 'Enquêtes types', frequency: '1 par semaine' },
      { id: 'pv', name: 'Rédaction PV', frequency: '2 fois par semaine' },
    ],
  });

  // Phase 3 : Examen blanc
  phases.push({
    phase_number: phases.length + 1,
    name: 'Examen Blanc & Oral',
    duration_weeks: isLate ? 2 : 2,
    daily_time_minutes: 60,
    topics: [
      { id: 'sujets_blancs', name: 'Sujets blancs complets (Épreuves 1, 2, 3)', count: 2 },
      { id: 'oral_prep', name: 'Préparation Oral', sessions: '3 simulations orales' },
    ],
  });

  return { total_weeks: totalWeeks, exam_date: examDateStr, phases };
}

function buildStrengthsFeedback(answers: DiagnosticAnswer[]): { strengths: string[]; weaknesses_feedback: string[] } {
  const strengths: string[] = [];
  const weaknesses_feedback: string[] = [];

  const byQ = Object.fromEntries(answers.map((a) => [a.question_id, a]));

  if (byQ['q1']?.correct) strengths.push('Vous maîtrisez les éléments constitutifs du vol');
  else weaknesses_feedback.push('Éléments du vol à revoir (Q1)');

  if (byQ['q2']?.correct) strengths.push('Vous distinguez vol et recel');
  else weaknesses_feedback.push('Distinction vol/recel à consolider (Q2)');

  if (byQ['q3']?.correct) strengths.push('La GAV de droit commun est claire pour vous');
  else weaknesses_feedback.push('Procédure GAV à approfondir (Q3)');

  if (byQ['q4']?.correct) strengths.push('Vous connaissez les articles de procédure');
  else weaknesses_feedback.push('Articles références de procédure à mémoriser (Q4)');

  if (byQ['q5']?.correct) strengths.push('Vous savez qualifier les infractions en pratique');
  else weaknesses_feedback.push('Qualification pratique à travailler (Q5)');

  return { strengths, weaknesses_feedback };
}

export async function initializeOnboarding(): Promise<{ ok: boolean; alreadyCompleted: boolean }> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { ok: false, alreadyCompleted: false };

  const { data: existing } = await (supabase as any)
    .from('onboarding_progress')
    .select('completed')
    .eq('user_id', user.id)
    .maybeSingle();

  if (existing?.completed) return { ok: true, alreadyCompleted: true };

  if (!existing) {
    await (supabase as any).from('onboarding_progress').insert({ user_id: user.id, stage: 1 });
  }

  return { ok: true, alreadyCompleted: false };
}

export async function checkOnboardingCompleted(): Promise<boolean> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return true; // pas d'utilisateur → pas d'onboarding à afficher

  const { data } = await (supabase as any)
    .from('onboarding_progress')
    .select('completed')
    .eq('user_id', user.id)
    .maybeSingle();

  return data?.completed === true;
}

export async function saveOnboardingStage(
  stage: number,
  data: {
    formation_phase?: FormationPhase;
    strengths?: string[];
    weaknesses?: string[];
  },
): Promise<{ ok: boolean }> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { ok: false };

  const update: Record<string, unknown> = { stage: stage + 1 };
  if (data.formation_phase) update.formation_phase = data.formation_phase;
  if (data.strengths !== undefined) update.strengths = data.strengths;
  if (data.weaknesses !== undefined) update.weaknesses = data.weaknesses;

  const { error } = await (supabase as any)
    .from('onboarding_progress')
    .upsert({ user_id: user.id, ...update }, { onConflict: 'user_id' });

  if (error) {
    console.error('[saveOnboardingStage]', error);
    return { ok: false };
  }

  return { ok: true };
}

export async function completeDiagnostic(
  formationPhase: FormationPhase,
  weaknesses: string[],
  answers: DiagnosticAnswer[],
): Promise<{ ok: boolean; result?: DiagnosticResult }> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { ok: false };

  const levelData = calculateDiagnosticLevel(answers);
  const plan = generatePlan(formationPhase, weaknesses, levelData.level);
  const feedback = buildStrengthsFeedback(answers);

  const result: DiagnosticResult = {
    level: levelData.level,
    score: levelData.score,
    score_percent: levelData.score_percent,
    strengths: feedback.strengths,
    weaknesses_feedback: feedback.weaknesses_feedback,
    plan,
  };

  const { error } = await (supabase as any)
    .from('onboarding_progress')
    .upsert(
      {
        user_id: user.id,
        formation_phase: formationPhase,
        weaknesses,
        diagnostic_answers: answers,
        diagnostic_level: levelData.level,
        diagnostic_score: levelData.score,
        generated_plan: plan as unknown as Record<string, unknown>,
        stage: 5,
        completed: true,
        completed_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    );

  if (error) {
    console.error('[completeDiagnostic]', error);
    return { ok: false };
  }

  return { ok: true, result };
}

export async function getOnboardingPlan(): Promise<DiagnosticResult | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await (supabase as any)
    .from('onboarding_progress')
    .select('diagnostic_level, diagnostic_score, generated_plan, strengths, weaknesses')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!data?.diagnostic_level) return null;

  return {
    level: data.diagnostic_level,
    score: data.diagnostic_score ?? 0,
    score_percent: Math.round(((data.diagnostic_score ?? 0) / 5) * 100),
    strengths: [],
    weaknesses_feedback: [],
    plan: (data.generated_plan as unknown as PersonalizedPlan) ?? {
      total_weeks: 7,
      exam_date: '2026-06-11',
      phases: [],
    },
  };
}
