import type { Metadata } from 'next';
import Link from 'next/link';

import { ContentReviewStrip } from '@/components/content/ContentReviewStrip';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { PVCoursMe1Section } from '@/components/pv/pv-cours-me1-section';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import {
  PV_FIN_GAV_VERBATIM_MODELE,
  PV_NOTIFICATION_GAV_VERBATIM_MODELE,
} from '@/data/pv-me1-verbatim-phase-a';
import { PV_PAGE_SAMPLES } from '@/data/pv-page-catalog';
import { cn } from '@/utils/cn';

export const metadata: Metadata = {
  title: 'Modèles de procès-verbaux — Examen OPJ',
  description:
    'ME1 (épreuve 2) : PV blanc deux colonnes pour s’entraîner, modèles verbatim, plainte Ex. 4/5, exercices à trous optionnels — aligné fascicule officiel.',
};

const categories = [
  'Saisines',
  'Garde à vue (placement, notification, prolongation, fin)',
  'Avis obligatoires (parquet, famille, avocat, médecin)',
  'Interpellations',
  'Constatations et transport',
  'Perquisitions et fouilles',
  'Auditions (victime, témoin, suspect libre, GAV, confrontation)',
  'Réquisitions',
  'Scellés',
  'Clôture et transmission',
] as const;

const phaseACount = PV_PAGE_SAMPLES.filter((s) => s.phase === 'A').length;
const phaseBCount = PV_PAGE_SAMPLES.filter((s) => s.phase === 'B').length;

export default function ModelesPVPage() {
  return (
    <InteriorPageShell maxWidth='6xl' glow='emerald' pad='default'>
      <SectionTitle
        badge='ÉPREUVE 2'
        badgeClassName='bg-emerald-500/20 text-emerald-200'
        title='Procès-verbaux — Modèles et mentions obligatoires'
        subtitle='Structure par rubrique : cartouche, articles, mentions et erreurs fréquentes (nullités possibles)'
        size='display'
        titleGradient
        titleAs='h1'
        className='mb-8'
      />

      <ContentReviewStrip className='mb-8' />

      <nav
        aria-label='Accès rapide sur la page PV'
        className='mb-8 flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-navy-950/50 px-4 py-3'
      >
        <span className='w-full text-[10px] font-bold uppercase tracking-wider text-gray-500 sm:mr-1 sm:w-auto sm:self-center'>
          Accès rapide
        </span>
        <Link
          href='#me1-pv'
          className='rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200 hover:bg-emerald-500/20'
        >
          ME1 — modèles &amp; exercices
        </Link>
        <Link
          href='#me1-pv-extraits'
          className='rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-200/90 hover:bg-amber-500/20'
        >
          Extraits ME1 (verbatim)
        </Link>
        <Link
          href='#pv-exercice-notification-gav'
          className='rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-gray-300 hover:border-white/20'
        >
          À trous — notification GAV
        </Link>
        <Link
          href='#pv-exercice-fin-gav'
          className='rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-gray-300 hover:border-white/20'
        >
          À trous — fin de GAV
        </Link>
        <Link
          href='#pv-exercice-enquete-voisinage'
          className='rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-gray-300 hover:border-white/20'
        >
          À trous — voisinage
        </Link>
        <Link
          href='#pv-exercice-audition-temoin'
          className='rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-gray-300 hover:border-white/20'
        >
          À trous — témoin
        </Link>
        <Link
          href='#pv-fiche-plainte'
          className='rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-gray-300 hover:border-white/20'
        >
          Fiche plainte
        </Link>
      </nav>

      <GlassCard className='mb-10 p-6' padding=''>
        <h2 className='text-sm font-semibold uppercase tracking-wide text-gray-400'>Programme PV (rappel)</h2>
        <ul className='mt-3 flex flex-wrap gap-2'>
          {categories.map((c) => (
            <li key={c}>
              <span className='inline-block rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300'>
                {c}
              </span>
            </li>
          ))}
        </ul>
        <p className='mt-4 text-sm text-gray-500'>
          Chaque PV comporte un <strong className='text-gray-300'>cartouche</strong> (identification du service, affaire,
          date et lieu) et des <strong className='text-gray-300'>mentions légales</strong> renvoyant au C.P.P. Pour l’
          <strong className='text-gray-300'>épreuve 2</strong>, se référer au fascicule ME1 : mise en page en{' '}
          <strong className='text-gray-300'>deux colonnes</strong> (coordonnées du service à gauche, filet, bloc principal à
          droite), rattachement aux rubriques N°, <strong className='font-mono text-gray-300'>AFFAIRE</strong>,{' '}
          <strong className='font-mono text-gray-300'>OBJET</strong>.{' '}
          <Link href='#me1-pv' className='font-medium text-emerald-400/90 underline-offset-2 hover:underline'>
            Aller directement aux modèles ME1 et aux exercices
          </Link>
          .
        </p>

        <div className='mt-6 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.06] p-4 text-sm text-gray-300'>
          <p className='font-semibold text-cyan-200'>Inventaire de production (ME1)</p>
          <ul className='mt-2 list-inside list-disc space-y-1 text-gray-400'>
            <li>
              <strong className='text-gray-200'>Phase A — priorité examen</strong> ({phaseACount} fiches) : plainte,
              notification et fin de GAV, enquête de voisinage (exercices + extraits verbatim sous la rubrique ME1).
            </li>
            <li>
              <strong className='text-gray-200'>Phase B — couverture programme</strong> ({phaseBCount} fiches) : autres
              audits et PV ; plusieurs fiches disposent déjà d’exercices à trous (témoin, interpellation, présentation à
              témoin).
            </li>
            <li>
              <strong className='text-gray-200'>Contrôle qualité</strong> : chaque retranscription finale doit être
              collationnée avec le PDF ME1 et Légifrance (date de relecture à noter sur la fiche concernée).
            </li>
          </ul>
        </div>
      </GlassCard>

      <GlassCard className='mb-10 p-6' padding=''>
        <h2 className='text-sm font-semibold uppercase tracking-wide text-gray-400'>Retranscriptions phase A (rappels)</h2>
        <div className='mt-4 grid gap-4 md:grid-cols-2'>
          <div className='rounded-xl border border-white/10 bg-navy-950/50 p-4'>
            <p className='text-xs font-bold uppercase tracking-wide text-emerald-400/90'>Notification de GAV</p>
            <p className='mt-2 whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-gray-400'>
              {PV_NOTIFICATION_GAV_VERBATIM_MODELE}
            </p>
          </div>
          <div className='rounded-xl border border-white/10 bg-navy-950/50 p-4'>
            <p className='text-xs font-bold uppercase tracking-wide text-emerald-400/90'>Fin de GAV</p>
            <p className='mt-2 whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-gray-400'>
              {PV_FIN_GAV_VERBATIM_MODELE}
            </p>
          </div>
        </div>
      </GlassCard>

      <PVCoursMe1Section />

      <div className='space-y-6'>
        {PV_PAGE_SAMPLES.map((s) => (
          <article
            key={s.slug}
            id={`pv-fiche-${s.slug}`}
            className='scroll-mt-24 rounded-2xl border border-white/10 bg-navy-950/50 p-6'
          >
            <div className='flex flex-wrap items-start justify-between gap-3'>
              <h2 className='font-display text-lg font-bold text-white'>{s.title}</h2>
              <span
                className={cn(
                  'shrink-0 rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
                  s.phase === 'A'
                    ? 'border-emerald-500/35 bg-emerald-500/15 text-emerald-100'
                    : 'border-slate-500/35 bg-slate-600/20 text-slate-200',
                )}
              >
                Phase {s.phase}
              </span>
            </div>
            <p className='mt-2 text-xs text-amber-200/80'>{s.articles.join(' · ')}</p>
            <h3 className='mt-4 text-xs font-bold uppercase tracking-wide text-emerald-400/90'>Mentions / structure</h3>
            <p className='mt-2 text-sm text-gray-300'>{s.mentions}</p>
            <h3 className='mt-4 text-xs font-bold uppercase tracking-wide text-rose-400/90'>Erreurs fréquentes</h3>
            <p className='mt-2 text-sm text-gray-400'>{s.erreurs}</p>
            <div className='mt-4 border-t border-white/10 pt-4'>
              {s.exercise.status === 'live' && s.exercise.href ? (
                <Link
                  href={s.exercise.href}
                  className='inline-flex items-center rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/25'
                >
                  {s.exercise.label} →
                </Link>
              ) : (
                <span className='inline-flex rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-500'>
                  {s.exercise.label}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      <p className='mt-12 text-center text-sm text-gray-500'>
        <Link href='/epreuves/epreuve-2' className='text-emerald-400/90 underline-offset-2 hover:underline'>
          ← Retour à l’épreuve 2 — Procédure
        </Link>
      </p>
    </InteriorPageShell>
  );
}
