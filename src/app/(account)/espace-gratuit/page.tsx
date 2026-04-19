import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileSearch,
  Flame,
  ListChecks,
  Lock,
  Search,
  Sparkles,
  Trophy,
} from 'lucide-react';

import { AccountDashboardSection } from '@/components/account/AccountDashboardSection';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { Button } from '@/components/ui/button';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { FREEMIUM_FLASHCARDS_PER_DAY, FREEMIUM_QUIZ_QUESTIONS_PER_DAY } from '@/features/access/get-content-access';
import { getSession } from '@/features/account/controllers/get-session';
import { hasPremiumAccess } from '@/features/account/controllers/has-premium-access';

export const metadata: Metadata = {
  title: 'Mon espace gratuit — Examen OPJ',
  description: "Hub gratuit ExamenOPJ : accès aux fondamentaux, quiz quotidien, flashcards et progression personnelle.",
  robots: { index: false, follow: false },
};

/**
 * Hub freemium : accessible aux utilisateurs connectés non-premium.
 * Évite la redirection brutale `/dashboard → /pricing` après expiration de l'essai 7j.
 * L'upsell Premium est contextualisé (jamais bloquant).
 */
export default async function FreemiumDashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const premium = await hasPremiumAccess();
  if (premium) redirect('/dashboard');

  const userName =
    (session.user.user_metadata as { full_name?: string } | null)?.full_name?.trim() ||
    session.user.email?.split('@')[0] ||
    null;

  return (
    <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.dashboard ?? 'blue'} pad='default'>
      <AccountDashboardSection spacing='relaxed'>
        <header className='space-y-2'>
          <div className='inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-300'>
            <Sparkles className='h-3.5 w-3.5' aria-hidden />
            Espace gratuit
          </div>
          <h1 className='text-3xl font-bold text-ds-text-primary dark:text-slate-50'>
            {userName ? `Bonjour ${userName},` : 'Bonjour,'} continuons votre préparation
          </h1>
          <p className='max-w-3xl text-ds-text-muted dark:text-slate-300'>
            Vous avez accès gratuitement aux fondamentaux, à un quiz quotidien et aux flashcards.
            Passez Premium pour débloquer les enquêtes, l&apos;articulation des PV, le rapport de
            synthèse et les épreuves blanches.
          </p>
        </header>

        <div className='grid gap-3 sm:grid-cols-3'>
          <FreemiumStat
            icon={<ListChecks className='h-4 w-4' aria-hidden />}
            label='Quiz / jour'
            value={FREEMIUM_QUIZ_QUESTIONS_PER_DAY.toString()}
          />
          <FreemiumStat
            icon={<BookOpen className='h-4 w-4' aria-hidden />}
            label='Flashcards / jour'
            value={FREEMIUM_FLASHCARDS_PER_DAY.toString()}
          />
          <FreemiumStat
            icon={<Flame className='h-4 w-4' aria-hidden />}
            label='Série de révisions'
            value='Illimitée'
          />
        </div>

        <div className='space-y-3'>
          <h2 className='text-lg font-semibold text-ds-text-primary dark:text-slate-100'>
            Accès libre — démarrez tout de suite
          </h2>
          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {FREE_LINKS.map((link) => (
              <FreemiumCard key={link.href} {...link} />
            ))}
          </div>
        </div>

        <div className='space-y-3'>
          <h2 className='text-lg font-semibold text-ds-text-primary dark:text-slate-100'>
            Premium — pour aller au bout de la préparation
          </h2>
          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {PREMIUM_LINKS.map((link) => (
              <PremiumTeaser key={link.label} {...link} />
            ))}
          </div>
          <Button
            asChild
            className='bg-gradient-to-r from-blue-600 to-violet-600 font-semibold text-white hover:opacity-90'
          >
            <Link href='/pricing' className='inline-flex items-center gap-2'>
              <Trophy className='h-4 w-4' aria-hidden />
              Voir l&apos;abonnement Premium
              <ArrowRight className='h-4 w-4' aria-hidden />
            </Link>
          </Button>
        </div>
      </AccountDashboardSection>
    </InteriorPageShell>
  );
}

function FreemiumStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className='flex items-center gap-3 rounded-lg border border-ds-border bg-ds-bg-elevated p-3 dark:border-slate-800 dark:bg-slate-900/70'>
      <div className='flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300'>
        {icon}
      </div>
      <div className='min-w-0 flex-1'>
        <p className='text-xs font-medium uppercase tracking-wider text-ds-text-muted'>{label}</p>
        <p className='text-base font-bold text-ds-text-primary dark:text-slate-50'>{value}</p>
      </div>
    </div>
  );
}

const FREE_LINKS = [
  {
    href: '/fondamentaux',
    title: 'Fondamentaux',
    description: "Toutes les fiches procédure, GAV, perquisition, contrôle d'identité.",
    Icon: BookOpen,
  },
  {
    href: '/entrainement/quiz',
    title: 'Quiz du jour',
    description: `${FREEMIUM_QUIZ_QUESTIONS_PER_DAY} questions par jour pour entretenir vos automatismes.`,
    Icon: Sparkles,
  },
  {
    href: '/entrainement/flashcards',
    title: 'Flashcards',
    description: `${FREEMIUM_FLASHCARDS_PER_DAY} cartes par jour, articles CPP / CP les plus importants.`,
    Icon: ListChecks,
  },
  {
    href: '/infractions',
    title: 'Référentiel infractions',
    description: '55 infractions à maîtriser — éléments légal, matériel, moral.',
    Icon: FileSearch,
  },
  {
    href: '/entrainement',
    title: 'Hub entraînement',
    description: 'Quiz, flashcards, articulation, rédaction PV — tout au même endroit.',
    Icon: Search,
  },
  {
    href: '/account',
    title: 'Mon compte',
    description: 'Préférences, e-mails de rappel, abonnement.',
    Icon: CheckCircle2,
  },
] as const;

function FreemiumCard({
  href,
  title,
  description,
  Icon,
}: {
  href: string;
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      href={href}
      className='group relative flex h-full flex-col gap-2 rounded-lg border border-ds-border bg-ds-bg-elevated p-4 transition-colors hover:border-blue-400/60 hover:bg-blue-50/40 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/5'
    >
      <div className='flex items-center gap-2 text-blue-600 dark:text-blue-400'>
        <Icon className='h-4 w-4' />
        <p className='text-sm font-semibold text-ds-text-primary group-hover:text-blue-700 dark:text-slate-100 dark:group-hover:text-blue-300'>
          {title}
        </p>
      </div>
      <p className='text-xs leading-relaxed text-ds-text-muted dark:text-slate-400'>{description}</p>
      <ArrowRight
        className='absolute right-3 top-3 h-4 w-4 text-ds-text-muted opacity-0 transition-opacity group-hover:opacity-100'
        aria-hidden
      />
    </Link>
  );
}

const PREMIUM_LINKS = [
  {
    label: 'Enquêtes pédagogiques',
    description: '10 scénarios complets (Alpha → Patrimoniale) avec articulation guidée.',
  },
  {
    label: 'Rédaction de PV',
    description: '7 sujets ME1 corrigés + atelier guidé avec gabarit officiel.',
  },
  {
    label: 'Rapport de synthèse',
    description: 'Atelier complet avec correction IA pas à pas.',
  },
  {
    label: 'Quiz illimités',
    description: `Aucun plafond — actuellement ${FREEMIUM_QUIZ_QUESTIONS_PER_DAY} questions/jour en gratuit.`,
  },
  {
    label: 'Parcours guidé',
    description: "Modules à débloquer pas à pas, jusqu'à l'épreuve blanche.",
  },
  {
    label: 'Suivi statistique avancé',
    description: 'Streak serveur, badges, taux de maîtrise par thème.',
  },
] as const;

function PremiumTeaser({ label, description }: { label: string; description: string }) {
  return (
    <div className='flex h-full flex-col gap-2 rounded-lg border border-amber-300/50 bg-amber-50/50 p-4 dark:border-amber-500/30 dark:bg-amber-500/5'>
      <div className='flex items-center gap-2 text-amber-700 dark:text-amber-300'>
        <Lock className='h-4 w-4' />
        <p className='text-sm font-semibold'>{label}</p>
      </div>
      <p className='text-xs leading-relaxed text-ds-text-muted dark:text-slate-400'>{description}</p>
    </div>
  );
}
