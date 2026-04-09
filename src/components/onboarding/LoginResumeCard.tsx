import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { LoginResumeData } from '@/features/onboarding/controllers/get-login-resume';
import { cn } from '@/utils/cn';

export function LoginResumeCard({ resume }: { resume: LoginResumeData }) {
  if (!resume.showResume) return null;

  return (
    <Card className='border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 shadow-xl'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-slate-50'>
          {resume.userName ? `👋 Bienvenue retour, ${resume.userName} !` : '👋 Bienvenue retour !'}
        </CardTitle>
        {resume.progress.lastSession && resume.progress.lastSession.daysAgo > 0 && (
          <p className='text-sm text-slate-400'>
            Vous n'aviez pas étudié depuis {resume.progress.lastSession.daysAgo} jour
            {resume.progress.lastSession.daysAgo > 1 ? 's' : ''}.
            Continuons où vous aviez laissé.
          </p>
        )}
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* Progression globale */}
        <div className='rounded-xl border border-slate-700 bg-slate-800/50 p-4'>
          <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400'>Votre progression</p>
          <div className='mb-2 flex items-center gap-3'>
            <span className='text-2xl font-black text-cyan-400'>{resume.progress.percentage}%</span>
            <span className='text-sm text-slate-300'>
              ({resume.progress.itemsMastered}/{resume.progress.totalItems} maîtrisées)
            </span>
          </div>
          <div className='h-2 w-full overflow-hidden rounded-full bg-slate-700'>
            <div
              className='h-full rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all'
              style={{ width: `${resume.progress.percentage}%` }}
            />
          </div>
          {resume.progress.lastSession && (
            <p className='mt-2 text-xs text-slate-400'>
              Dernière session : {resume.progress.lastSession.content}
              {' '}— {resume.progress.lastSession.score}
            </p>
          )}
        </div>

        {/* Streak warning */}
        {resume.streak.willBreak && resume.streak.current > 0 && (
          <div className='rounded-xl border border-orange-500/30 bg-orange-900/20 p-3'>
            <p className='text-sm font-semibold text-orange-300'>
              🔥 Vous aviez {resume.streak.current} jour{resume.streak.current > 1 ? 's' : ''} de streak !
            </p>
            <p className='mt-0.5 text-xs text-orange-200/80'>
              Une session aujourd'hui sauvegarde votre chaîne.
            </p>
          </div>
        )}

        {/* Recommandations */}
        <div>
          <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400'>
            Aujourd'hui, on recommande
          </p>
          <div className='space-y-2'>
            {resume.recommendations.map((rec) => (
              <Button
                key={rec.priority}
                asChild
                variant='outline'
                className={cn(
                  'flex h-auto w-full items-start justify-start gap-3 border-slate-700 bg-slate-800/40 px-4 py-3 text-left hover:bg-slate-700/50',
                  rec.priority === 1 && 'border-cyan-500/40 bg-cyan-900/15',
                )}
              >
                <Link href={rec.href}>
                  <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-slate-200'>
                    {rec.priority}
                  </span>
                  <div className='min-w-0 flex-1'>
                    <p className='text-sm font-medium text-slate-100'>{rec.title}</p>
                    <p className='text-xs text-slate-400'>{rec.reason}</p>
                  </div>
                  {rec.timeMinutes > 0 && (
                    <span className='shrink-0 text-xs text-slate-500'>{rec.timeMinutes} min</span>
                  )}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Actions rapides */}
        <div className='flex gap-2'>
          <Button asChild className='flex-1 bg-cyan-600 hover:bg-cyan-700'>
            <Link href={resume.recommendations[0]?.href ?? '/quiz'}>Commencer</Link>
          </Button>
          <Button asChild variant='outline' className='border-slate-700 text-slate-300'>
            <Link href='/dashboard/progression'>Voir progression</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
