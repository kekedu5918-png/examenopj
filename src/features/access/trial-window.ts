/** Durée d’accès « tout débloqué » après inscription (sans abonnement Stripe). */
export const TRIAL_DAYS = 7;

/**
 * Affiche le bandeau de rappel quand il reste au plus ce nombre de jours (inclus)
 * avant la fin de l’essai (ex. 2 → rappel à J-2 et J-1).
 */
export const TRIAL_REMINDER_WITHIN_DAYS = 2;

const MS_PER_DAY = 86400000;

function msDays(d: number) {
  return d * MS_PER_DAY;
}

/** Fin de la période d’essai (7 jours après création du compte Auth). */
export function getTrialEndsAt(createdAt: string): Date | null {
  const created = new Date(createdAt);
  if (Number.isNaN(created.getTime())) return null;
  return new Date(created.getTime() + msDays(TRIAL_DAYS));
}

/** L’utilisateur est encore dans les 7 jours gratuits complets (hors abonnement). */
export function isUserInSignupTrialPeriod(createdAt: string | null | undefined): boolean {
  if (!createdAt) return false;
  const ends = getTrialEndsAt(createdAt);
  if (!ends) return false;
  return Date.now() < ends.getTime();
}

/**
 * Données pour le rappel « fin d’essai proche » (premium Stripe exclu : géré par l’appelant).
 * `null` si pas dans la fenêtre de rappel ou essai déjà terminé.
 */
export function getTrialEndingReminder(
  createdAt: string | null | undefined
): { daysLeft: number; endsAtIso: string } | null {
  if (!createdAt) return null;
  const ends = getTrialEndsAt(createdAt);
  if (!ends) return null;
  const msLeft = ends.getTime() - Date.now();
  if (msLeft <= 0) return null;
  const daysLeft = Math.ceil(msLeft / MS_PER_DAY);
  if (daysLeft > TRIAL_REMINDER_WITHIN_DAYS) return null;
  return { daysLeft, endsAtIso: ends.toISOString() };
}
