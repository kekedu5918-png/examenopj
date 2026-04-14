'use server';

import { revalidatePath } from 'next/cache';

import { completeLesson } from '@/lib/learningPath';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

export type CompleteLessonActionState = { ok: boolean; error?: string };

/**
 * Enregistre le score d’une étape du parcours OPJ (0–100). Met à jour XP et streak `learning_path`.
 */
export async function completeLessonAction(
  _prev: CompleteLessonActionState,
  formData: FormData,
): Promise<CompleteLessonActionState> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, error: 'Non connecté' };
  }

  const lessonId = String(formData.get('lessonId') ?? '').trim();
  const scoreRaw = Number(formData.get('score'));
  if (!lessonId) {
    return { ok: false, error: 'Leçon manquante' };
  }
  if (!Number.isFinite(scoreRaw) || scoreRaw < 0 || scoreRaw > 100) {
    return { ok: false, error: 'Score entre 0 et 100' };
  }

  const result = await completeLesson(user.id, lessonId, Math.round(scoreRaw));
  if (!result.success) {
    return { ok: false, error: 'Enregistrement impossible' };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/parcours');
  revalidatePath('/dashboard/progression');
  return { ok: true };
}
