import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';

export const TRIAL_DAYS = 7;

/** Questions comptées par session de quiz (réponses soumises). */
export const FREEMIUM_QUIZ_QUESTIONS_PER_DAY = 5;

/** Flashcards : une “prise en compte” = réponse (Je sais / À revoir / Je ne sais pas). */
export const FREEMIUM_FLASHCARDS_PER_DAY = 5;

export type ContentAccessSnapshot = {
  tier: 'full' | 'freemium';
  /** Plafond journalier ; `null` = illimité (Premium ou semaine d’essai). */
  maxQuizQuestionsPerDay: number | null;
  maxFlashcardsPerDay: number | null;
};

function msDays(d: number) {
  return d * 86400000;
}

/**
 * Accès contenu : abonnement Stripe actif / essai → tout débloqué.
 * Sinon période de grâce 7 jours après création du compte (inscription), puis freemium.
 */
export async function getContentAccess(): Promise<ContentAccessSnapshot> {
  const subscription = await getSubscription();
  if (subscription) {
    return { tier: 'full', maxQuizQuestionsPerDay: null, maxFlashcardsPerDay: null };
  }

  const session = await getSession();
  const createdAt = session?.user?.created_at;
  if (createdAt) {
    const created = new Date(createdAt);
    if (!Number.isNaN(created.getTime()) && Date.now() - created.getTime() < msDays(TRIAL_DAYS)) {
      return { tier: 'full', maxQuizQuestionsPerDay: null, maxFlashcardsPerDay: null };
    }
  }

  return {
    tier: 'freemium',
    maxQuizQuestionsPerDay: FREEMIUM_QUIZ_QUESTIONS_PER_DAY,
    maxFlashcardsPerDay: FREEMIUM_FLASHCARDS_PER_DAY,
  };
}
