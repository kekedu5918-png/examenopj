export type BadgeId =
  | 'first_quiz'
  | 'perfect_week'
  | 'discipline'
  | 'unstoppable'
  | 'legendary'
  | 'bibliotheque'
  | 'questions_100'
  | 'complet';

export const BADGE_DEFINITIONS: Record<BadgeId, { name: string; icon: string; description: string }> = {
  first_quiz: { name: 'Premier Quiz', icon: '🎯', description: 'Premier quiz complété !' },
  perfect_week: { name: 'Perfect Week', icon: '⭐', description: '7 jours consécutifs d\'étude' },
  discipline: { name: 'Discipline', icon: '🔥', description: '30 jours consécutifs d\'étude' },
  unstoppable: { name: 'Inarrêtable', icon: '💪', description: '60 jours consécutifs d\'étude' },
  legendary: { name: 'Légendaire', icon: '👑', description: '100 jours consécutifs d\'étude' },
  bibliotheque: { name: 'Bibliothèque', icon: '📚', description: '20 quiz complétés' },
  questions_100: { name: '100 Questions', icon: '🚀', description: '100 questions répondues' },
  complet: { name: 'Complet', icon: '💯', description: 'Score parfait sur un thème' },
};
