import type { Metadata } from 'next';
import Link from 'next/link';

import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { DOMAIN_LABELS, fasciculesList } from '@/data/fascicules-list';
import type { Domain } from '@/data/fascicules-types';
import { cn } from '@/utils/cn';

export const metadata: Metadata = {
  title: 'Cours — Examen OPJ',
  description:
    'Parcours pédagogique : fiches de synthèse F01–F15, fondamentaux, guide de révision et outils de rédaction pour le concours OPJ.',
};

function moduleDomainKey(m: (typeof fasciculesList)[number]): Domain {
  if (m.domaine === 'DPS') return 'DPS';
  if (m.domaine === 'DPG') return 'DPG';
  return 'PROCEDURE';
}

const DOMAIN_BADGE: Record<Domain, string> = {
  DPS: 'border-red-400/30 bg-red-500/10 text-red-200',
  DPG: 'border-violet-400/30 bg-violet-500/10 text-violet-200',
  PROCEDURE: 'border-blue-400/30 bg-blue-500/10 text-blue-200',
};

const hubLinks = [
  {
    href: '/cours/modules',
    title: 'Fiches F01–F15',
    desc: 'Synthèses structurées par thème : droit pénal spécial, général et procédure.',
    accent: 'from-cyan-500/15 to-transparent',
  },
  { href: '/fondamentaux', title: 'Fondamentaux', desc: 'GAV, contrôles, mandats, OPJ/APJ, juridictions.', accent: 'from-violet-500/15 to-transparent' },
  {
    href: '/guide-revision-opj',
    title: 'Guide de révision',
    desc: 'Méthode, calendrier et priorités jusqu’au jour de l’examen.',
    accent: 'from-amber-500/15 to-transparent',
  },
  {
    href: '/cours/pv',
    title: 'Modèles de PV',
    desc: 'Mentions, cartouches et exemples de procès-verbaux pour l’épreuve 3.',
    accent: 'from-emerald-500/15 to-transparent',
  },
  {
    href: '/cours/enquetes',
    title: 'Enquêtes type concours',
    desc: 'Sujet, articulation, PV et rapport : entraînement sur planches complètes.',
    accent: 'from-rose-500/15 to-transparent',
  },
] as const;

export default function CoursHubPage() {
  const ordered = [...fasciculesList].sort((a, b) => a.numero - b.numero);

  return (
    <div className='container pb-24 pt-10 md:pt-14'>
      <div className='relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-navy-900/80 via-navy-950 to-navy-950 p-8 md:p-12'>
        <div
          className='pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl'
          aria-hidden
        />
        <div
          className='pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-gold-400/5 blur-3xl'
          aria-hidden
        />
        <SectionTitle
          badge='PARCOURS'
          badgeClassName='bg-violet-500/25 text-violet-200'
          title='Cours'
          subtitle='Fiches de synthèse, fondamentaux et outils pour une préparation complète — sans dépendre de supports institutionnels tiers.'
          className='relative mb-0 text-left md:max-w-2xl'
        />
        <div className='relative mt-8 flex flex-wrap gap-3'>
          <Link
            href='/cours/modules'
            className='inline-flex items-center rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-cyan-400'
          >
            Ouvrir les fiches F01–F15
          </Link>
          <Link
            href='/entrainement'
            className='inline-flex items-center rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-gray-200 transition hover:bg-white/5'
          >
            Entraînement
          </Link>
        </div>
      </div>

      <div className='mt-14'>
        <h2 className='mb-2 font-display text-xl font-bold text-white'>Accès rapides</h2>
        <p className='mb-6 text-sm text-gray-500'>Navigation entre les grands blocs du site.</p>
        <ul className='grid gap-5 md:grid-cols-2'>
          {hubLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className='block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50'>
                <GlassCard
                  hover
                  padding='p-6'
                  className={cn('h-full border-white/10 bg-gradient-to-br transition hover:border-cyan-500/25', l.accent)}
                >
                  <h3 className='font-display text-lg font-bold text-white'>{l.title}</h3>
                  <p className='mt-2 text-sm text-gray-400'>{l.desc}</p>
                  <p className='mt-4 text-sm font-medium text-cyan-300'>Ouvrir →</p>
                </GlassCard>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='mt-16'>
        <h2 className='mb-2 font-display text-xl font-bold text-white'>Programme thématique</h2>
        <p className='mb-6 max-w-2xl text-sm text-gray-500'>
          Les {ordered.length} titres de référence du programme, avec une fiche de synthèse détaillée pour chaque module.
        </p>
        <ul className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {ordered.map((m) => {
            const d = moduleDomainKey(m);
            return (
              <li key={m.id}>
                <Link
                  href={`/cours/modules/${m.id}`}
                  className='group flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-white/20 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/60'
                >
                  <span
                    className={cn(
                      'w-fit rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide',
                      DOMAIN_BADGE[d],
                    )}
                  >
                    {DOMAIN_LABELS[d]}
                  </span>
                  <span className='mt-2 text-xs font-bold text-gray-500'>F{String(m.numero).padStart(2, '0')}</span>
                  <span className='mt-1 font-display text-sm font-semibold leading-snug text-white group-hover:text-cyan-100'>
                    {m.titre}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
