import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { StreakData } from '@/features/gamification/controllers/get-gamification-data';
import { cn } from '@/utils/cn';

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function StreakCard({ streak }: { streak: StreakData }) {
  const hasStudiedToday = streak.lastSessionDate === todayIsoDate();
  const progressToNext = streak.nextMilestone
    ? Math.min(100, Math.round((streak.currentStreak / streak.nextMilestone.days) * 100))
    : 100;

  return (
    <Card className='border border-orange-500/30 bg-slate-900'>
      <CardHeader className='pb-2'>
        <CardTitle className='flex items-center gap-2 text-slate-100'>
          🔥 Streak quotidien
          {hasStudiedToday && (
            <span className='rounded-full bg-emerald-700/40 px-2 py-0.5 text-xs font-normal text-emerald-300'>
              ✓ Étudié aujourd&apos;hui
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Compteur principal */}
        <div className='flex items-end gap-2'>
          <span className='text-5xl font-black text-orange-400 leading-none'>{streak.currentStreak}</span>
          <span className='mb-1 text-slate-400 text-sm'>jour{streak.currentStreak > 1 ? 's' : ''} consécutif{streak.currentStreak > 1 ? 's' : ''}</span>
        </div>

        {/* Badge actuel */}
        {streak.currentMilestoneBadge && (
          <p className='text-xs text-slate-400'>
            Milestone actuel : <span className='font-semibold text-amber-300'>{streak.currentMilestoneBadge}</span>
          </p>
        )}

        {/* Barre de progression vers prochain milestone */}
        {streak.nextMilestone && (
          <div>
            <div className='mb-1 flex justify-between text-xs text-slate-400'>
              <span>Jour {streak.currentStreak}/{streak.nextMilestone.days} pour {streak.nextMilestone.icon} {streak.nextMilestone.badge}</span>
              <span>{progressToNext}%</span>
            </div>
            <div className='h-2 w-full overflow-hidden rounded-full bg-slate-800'>
              <div
                className='h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all'
                style={{ width: `${progressToNext}%` }}
              />
            </div>
          </div>
        )}

        {/* Record */}
        {streak.longestStreak > 0 && (
          <p className='text-xs text-slate-500'>
            Record : <span className='text-slate-300 font-medium'>{streak.longestStreak} jours</span>
          </p>
        )}

        {/* Rappel */}
        {!hasStudiedToday && streak.currentStreak > 0 && (
          <p className='rounded-lg bg-amber-900/30 px-3 py-2 text-xs text-amber-200'>
            💡 Une session même courte (5 min) maintient votre streak !
          </p>
        )}
      </CardContent>
    </Card>
  );
}
