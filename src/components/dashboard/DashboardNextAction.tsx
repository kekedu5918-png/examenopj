'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import type { LoginResumeData } from '@/features/onboarding/controllers/get-login-resume';
import { cn } from '@/utils/cn';

/** Aligné sur `Awaited<ReturnType<typeof getLoginResumeData>>` (type exporté `LoginResumeData`). */
export interface DashboardNextActionProps {
  loginResume: LoginResumeData | null;
  streak: number;
  todayReviews: number;
  userName: string | null;
}

/**
 * Repère une « prochaine leçon » via les recommandations dont le lien cible le parcours ou les fondamentaux.
 * À affiner si `getLoginResumeData` expose plus tard un champ dédié.
 */
function findParcoursContinue(resume: LoginResumeData | null): { title: string; href: string } | null {
  if (!resume) return null;
  const rec = resume.recommendations.find(
    (r) => r.href.includes('/parcours-opj') || r.href.includes('/fondamentaux'),
  );
  if (!rec) return null;
  return { title: rec.title, href: rec.href };
}

export function DashboardNextAction({
  loginResume,
  streak,
  todayReviews,
  userName,
}: DashboardNextActionProps) {
  const reduceMotion = useReducedMotion();
  const parcours = findParcoursContinue(loginResume);

  let actionLine: string;
  let actionHref: string;
  let actionLabel: string;

  if (parcours) {
    actionLine = `Continuer : ${parcours.title}`;
    actionHref = parcours.href;
    actionLabel = 'Reprendre →';
  } else if (todayReviews > 0) {
    actionLine = `🔄 ${todayReviews} révision${todayReviews > 1 ? 's' : ''} espacée${todayReviews > 1 ? 's' : ''} à faire`;
    actionHref = '/parcours-opj';
    actionLabel = 'Réviser →';
  } else {
    actionLine = '✅ Tout est à jour ! Explorez les épreuves →';
    actionHref = '/epreuves';
    actionLabel = 'Voir les épreuves →';
  }

  return (
    <motion.div
      className='w-full'
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          'relative z-[1] overflow-hidden rounded-2xl border p-6 shadow-lg',
          'border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 via-background to-blue-600/15',
          'dark:border-cyan-500/25 dark:from-cyan-500/15 dark:via-slate-950 dark:to-blue-950/40',
        )}
      >
        <div className='relative z-[1] space-y-4'>
          <header>
            <h2 className='text-xl font-semibold tracking-tight text-foreground'>
              {userName ? `Bonjour ${userName} 👋` : 'Bonjour 👋'}
            </h2>
            {streak > 0 ? (
              <p className='mt-1 text-sm font-medium text-orange-600 dark:text-orange-400'>
                🔥 {streak} jour{streak > 1 ? 's' : ''} de série
              </p>
            ) : null}
          </header>

          <div>
            <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Prochaine action</p>
            <p className='mt-1 text-base font-medium text-foreground'>{actionLine}</p>
          </div>

          <Button
            asChild
            className='bg-cyan-600 text-white hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700'
          >
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
