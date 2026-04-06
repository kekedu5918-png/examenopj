import { isUserInSignupTrialPeriod } from '@/features/access/trial-window';
import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';

export { TRIAL_DAYS } from '@/features/access/trial-window';

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

/**
 * Accès contenu : abonnement Stripe actif → tout débloqué.
 * Sinon 7 jours complets dès l’inscription (date `auth.users`), puis freemium.
 */
export async function getContentAccess(): Promise<ContentAccessSnapshot> {
  const subscription = await getSubscription();
  if (subscription) {
    return { tier: 'full', maxQuizQuestionsPerDay: null, maxFlashcardsPerDay: null };
  }

  const session = await getSession();
  if (isUserInSignupTrialPeriod(session?.user?.created_at)) {
    return { tier: 'full', maxQuizQuestionsPerDay: null, maxFlashcardsPerDay: null };
  }

  return {
    tier: 'freemium',
    maxQuizQuestionsPerDay: FREEMIUM_QUIZ_QUESTIONS_PER_DAY,
    maxFlashcardsPerDay: FREEMIUM_FLASHCARDS_PER_DAY,
  };
}
