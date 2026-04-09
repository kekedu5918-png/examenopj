import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import type { CategoryProgressData } from '@/features/gamification/controllers/get-gamification-data';

const URGENCY_STYLES = {
  critical: {
    bar: 'bg-rose-500',
    badge: 'bg-rose-900/40 text-rose-300',
    label: '🔴 Urgent — À revoir',
    border: 'border-rose-500/30',
  },
  high: {
    bar: 'bg-orange-500',
    badge: 'bg-orange-900/40 text-orange-300',
    label: '⚠️ À prioritiser',
    border: 'border-orange-500/20',
  },
  medium: {
    bar: 'bg-amber-400',
    badge: 'bg-amber-900/30 text-amber-300',
    label: '📈 À consolider',
    border: 'border-amber-500/20',
  },
  low: {
    bar: 'bg-emerald-500',
    badge: 'bg-emerald-900/30 text-emerald-300',
    label: '✅ En bonne voie',
    border: 'border-emerald-500/20',
  },
};

function CategoryItem({ cat }: { cat: CategoryProgressData }) {
  const style = URGENCY_STYLES[cat.urgency];

  return (
    <div className={cn('rounded-xl border bg-slate-800/40 p-4', style.border)}>
      <div className='mb-2 flex items-start justify-between gap-2'>
        <p className='text-sm font-semibold text-slate-100'>F{String(cat.fasciculeNum).padStart(2, '0')} — {cat.name}</p>
        <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-xs font-medium', style.badge)}>
          {cat.averagePercent}%
        </span>
      </div>

      <div className='mb-2 h-2 w-full overflow-hidden rounded-full bg-slate-700'>
        <div
          className={cn('h-full rounded-full transition-all', style.bar)}
          style={{ width: `${cat.averagePercent}%` }}
        />
      </div>

      <div className='flex items-center justify-between'>
        <p className='text-xs text-slate-400'>{style.label}</p>
        <p className='text-xs text-slate-500'>{cat.totalAttempts} session{cat.totalAttempts > 1 ? 's' : ''}</p>
      </div>

      {(cat.urgency === 'critical' || cat.urgency === 'high') && (
        <Button asChild size='sm' variant='outline' className='mt-2 h-7 border-slate-600 text-xs text-slate-300'>
          <Link href={`/quiz?mode=module&f=${cat.fasciculeNum}`}>Session ciblée →</Link>
        </Button>
      )}
    </div>
  );
}

export function CategoryProgress({
  categories,
  totalAttempts,
}: {
  categories: CategoryProgressData[];
  totalAttempts: number;
}) {
  if (categories.length === 0) {
    return (
      <Card className='border border-blue-500/20 bg-slate-900'>
        <CardHeader>
          <CardTitle className='text-slate-100'>📊 Maîtrise par thème</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-slate-400'>
            Complétez des quiz par fascicule pour voir votre progression par thème.
          </p>
          <Button asChild className='mt-3 bg-cyan-600 hover:bg-cyan-700' size='sm'>
            <Link href='/quiz'>Démarrer un quiz →</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const sorted = [...categories].sort((a, b) => a.averagePercent - b.averagePercent);
  const urgent = sorted.filter((c) => c.urgency === 'critical' || c.urgency === 'high');
  const others = sorted.filter((c) => c.urgency !== 'critical' && c.urgency !== 'high');

  return (
    <Card className='border border-blue-500/20 bg-slate-900'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-slate-100'>
          📊 Maîtrise par thème
          <span className='ml-2 text-sm font-normal text-slate-400'>({categories.length} thème{categories.length > 1 ? 's' : ''} pratiqués)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        {urgent.length > 0 && (
          <div>
            <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-rose-400'>Prioritaires</p>
            <div className='space-y-2'>
              {urgent.map((c) => <CategoryItem key={c.fasciculeNum} cat={c} />)}
            </div>
          </div>
        )}
        {others.length > 0 && (
          <div>
            {urgent.length > 0 && (
              <p className='mb-2 mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400'>Autres thèmes</p>
            )}
            <div className='space-y-2'>
              {others.map((c) => <CategoryItem key={c.fasciculeNum} cat={c} />)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
