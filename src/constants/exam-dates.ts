const OPJ_WRITTEN_EXAM_UTC_MS = Date.UTC(2026, 5, 11);

/** « Aujourd’hui » civil à Paris (évite SSR UTC ≠ navigateur → mismatch #425). */
function parisCalendarStartUtcMs(d: Date): number {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(d);
  const y = Number(parts.find((p) => p.type === 'year')?.value);
  const m = Number(parts.find((p) => p.type === 'month')?.value);
  const day = Number(parts.find((p) => p.type === 'day')?.value);
  return Date.UTC(y, m - 1, day);
}

export function getDaysUntilOpjWrittenExam(now: Date = new Date()): number {
  const start = parisCalendarStartUtcMs(now);
  return Math.max(0, Math.ceil((OPJ_WRITTEN_EXAM_UTC_MS - start) / 86_400_000));
}

const MS_DAY = 86_400_000;

/** Nombre de jours (calendrier Paris) entre « aujourd’hui » et une date cible Y-M-D (fin excluse style « jours restants »). */
export function getCalendarDaysUntilParisDate(
  targetYear: number,
  targetMonth1: number,
  targetDay: number,
  now: Date = new Date(),
): number {
  const start = parisCalendarStartUtcMs(now);
  const end = Date.UTC(targetYear, targetMonth1 - 1, targetDay);
  return Math.max(0, Math.ceil((end - start) / MS_DAY));
}

export type ParisYmd = { y: number; m: number; d: number };

export function getParisCalendarYmd(now: Date = new Date()): ParisYmd {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  return {
    y: Number(parts.find((p) => p.type === 'year')?.value),
    m: Number(parts.find((p) => p.type === 'month')?.value),
    d: Number(parts.find((p) => p.type === 'day')?.value),
  };
}

function ymdToKey(ymd: ParisYmd): number {
  return ymd.y * 10_000 + ymd.m * 100 + ymd.d;
}

/**
 * Jours avant la prochaine date parmi plusieurs sessions, calendrier Paris.
 * `null` si toutes les dates sont passées avant aujourd’hui.
 */
export function getDaysUntilNextParisSession(
  sessions: readonly ParisYmd[],
  now: Date = new Date(),
): number | null {
  const today = getParisCalendarYmd(now);
  const tKey = ymdToKey(today);
  const sorted = [...sessions].sort((a, b) => ymdToKey(a) - ymdToKey(b));
  const next = sorted.find((s) => ymdToKey(s) >= tKey);
  if (!next) return null;
  return getCalendarDaysUntilParisDate(next.y, next.m, next.d, now);
}
