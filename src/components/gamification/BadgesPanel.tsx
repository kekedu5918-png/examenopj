import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import type { BadgeData } from '@/features/gamification/controllers/get-gamification-data';

function BadgeItem({ badge }: { badge: BadgeData }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition-all',
        badge.earned
          ? 'border-amber-500/50 bg-amber-900/20'
          : 'border-slate-700 bg-slate-800/40 opacity-60',
      )}
    >
      <span className={cn('text-2xl', !badge.earned && 'grayscale')}>{badge.icon}</span>
      <p className={cn('text-xs font-semibold', badge.earned ? 'text-amber-200' : 'text-slate-400')}>
        {badge.name}
      </p>
      {badge.earned ? (
        <p className='text-[10px] text-slate-500'>
          {badge.earnedAt ? new Date(badge.earnedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : 'Gagné'}
        </p>
      ) : (
        <div className='w-full'>
          <div className='mb-0.5 flex justify-between text-[10px] text-slate-500'>
            <span>{badge.progress}</span>
            <span>{badge.target}</span>
          </div>
          <div className='h-1 w-full overflow-hidden rounded-full bg-slate-700'>
            <div
              className='h-full rounded-full bg-cyan-600 transition-all'
              style={{ width: `${badge.progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function BadgesPanel({ badges }: { badges: BadgeData[] }) {
  const earned = badges.filter((b) => b.earned);
  const inProgress = badges.filter((b) => !b.earned);

  return (
    <Card className='border border-amber-500/20 bg-slate-900'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-slate-100'>🏆 Badges</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {earned.length > 0 && (
          <div>
            <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400'>
              Déverrouillés ({earned.length})
            </p>
            <div className='grid grid-cols-3 gap-2 sm:grid-cols-4'>
              {earned.map((b) => (
                <BadgeItem key={b.id} badge={b} />
              ))}
            </div>
          </div>
        )}

        {inProgress.length > 0 && (
          <div>
            <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500'>
              En cours ({inProgress.length})
            </p>
            <div className='grid grid-cols-3 gap-2 sm:grid-cols-4'>
              {inProgress.map((b) => (
                <BadgeItem key={b.id} badge={b} />
              ))}
            </div>
          </div>
        )}

        {earned.length === 0 && inProgress.length === 0 && (
          <p className='text-sm text-slate-400'>
            Complétez votre premier quiz pour débloquer des badges !
          </p>
        )}
      </CardContent>
    </Card>
  );
}
