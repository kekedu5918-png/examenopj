import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

import { CoursRevisionPath } from '@/components/cours/CoursRevisionPath';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { DOMAIN_LABELS, fasciculesList } from '@/data/fascicules-list';
import type { Domain } from '@/data/fascicules-types';
import { cn } from '@/utils/cn';
import { openGraphForPage } from '@/utils/seo-metadata';

const coursTitle = 'Cours — Examen OPJ';
const coursDescription =
  'Par où commencer : fil de révision aligné sur les trois épreuves, fiches F01–F15, fondamentaux et lien avec sujets blancs.';

export const metadata: Metadata = {
  title: coursTitle,
  description: coursDescription,
  alternates: { canonical: '/cours' },
  ...openGraphForPage('/cours', coursTitle, coursDescription),
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
    href: '/programme',
    title: 'Programme (sommaire)',
    desc: 'Les 15 thèmes officiels : structure, domaines DPS / DPG / procédure et liens vers l’entraînement.',
    accent: 'from-cyan-500/15 to-transparent',
  },
  {
    href: '/cours/modules',
    title: 'Fiches par thème',
    desc: 'Synthèses structurées : droit pénal spécial, général et procédure.',
    accent: 'from-sky-500/15 to-transparent',
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
    title: 'Procès-verbaux ME1',
    desc: 'Deux colonnes, mentions légales, modèles verbatim et textes à trous pour l’épreuve 2.',
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
          subtitle='Alignés sur le programme officiel et sur les trois épreuves — chaque fiche indique où le thème pèse (DPS, procédure, oral) et vers quels entraînements / sujets blancs aller.'
          className='relative mb-0 text-left md:max-w-2xl'
        />
      </div>

      <section className='mt-12' aria-labelledby='cours-commencer'>
        <h2 id='cours-commencer' className='font-display text-xl font-bold text-white md:text-2xl'>
          Commencer ici
        </h2>
        <p className='mt-2 max-w-2xl text-sm text-gray-400'>
          Choisissez une entrée : le fil en 7 leçons si vous débutez sur le site ; le parcours chronologique candidat si vous
          avez déjà parcouru le programme officiel.
        </p>
        <div className='mt-6 grid gap-4 md:grid-cols-2'>
          <Link
            href='#revision-fil'
            className='group block rounded-2xl border border-cyan-500/35 bg-gradient-to-br from-cyan-500/15 to-transparent p-6 transition hover:border-cyan-400/55 focus-visible:outline focus-visible:ring-2 focus-visible:ring-cyan-500/50'
          >
            <p className='text-xs font-bold uppercase tracking-widest text-cyan-300/90'>Je découvre</p>
            <p className='mt-2 font-display text-lg font-bold text-white group-hover:text-cyan-100'>
              Fil de révision — 7 leçons
            </p>
            <p className='mt-2 text-sm text-gray-400'>
              Ordre pédagogique (procédure d’abord, puis thèmes lourds, puis épreuve 2). Descendez à la section suivante.
            </p>
            <span className='mt-4 inline-flex text-sm font-semibold text-cyan-300'>Défiler vers le fil ↓</span>
          </Link>
          <Link
            href='/parcours-candidat'
            className='group block rounded-2xl border border-gold-500/30 bg-gradient-to-br from-gold-500/10 to-transparent p-6 transition hover:border-gold-400/50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-gold-500/40'
          >
            <p className='text-xs font-bold uppercase tracking-widest text-gold-200/90'>J’ai déjà lu le programme</p>
            <p className='mt-2 font-display text-lg font-bold text-white group-hover:text-gold-100'>
              Parcours candidat (phases + checklist)
            </p>
            <p className='mt-2 text-sm text-gray-400'>
              Semaines type, lien explicite Épreuve 1 / 2 / 3, sujets blancs en phase finale.
            </p>
            <span className='mt-4 inline-flex text-sm font-semibold text-gold-200'>Ouvrir le parcours →</span>
          </Link>
        </div>
        <div className='mt-4 flex flex-wrap gap-3'>
          <Link
            href='/cours/modules#lecons-synthese'
            className='inline-flex items-center rounded-xl border border-cyan-500/35 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/15'
          >
            9 chapitres synthétisés
          </Link>
          <Link
            href='/programme'
            className='inline-flex items-center rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/5'
          >
            Sommaire officiel F01–F15
          </Link>
          <Link
            href='/entrainement'
            className='inline-flex items-center rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/5'
          >
            Entraînement par épreuve
          </Link>
          <Link
            href='/sujets-blancs'
            className='inline-flex items-center rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/5'
          >
            Sujets blancs complets
          </Link>
        </div>
      </section>

      <div className='mt-16'>
        <CoursRevisionPath />
      </div>

      <div className='mt-16'>
        <h2 className='mb-2 font-display text-xl font-bold text-white'>Accès rapides</h2>
        <p className='mb-6 text-sm text-gray-500'>Raccourcis vers les outils du site (quiz, flashcards, fondamentaux).</p>
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

      <div className='mt-20 border-t border-white/10 pt-16'>
        <details className='group rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-6'>
          <summary className='flex cursor-pointer list-none items-center justify-between gap-3 font-display text-lg font-bold text-white marker:content-none [&::-webkit-details-marker]:hidden'>
            <span>Index officiel du programme (F01–F15)</span>
            <ChevronDown className='h-5 w-5 shrink-0 text-gray-400 transition group-open:rotate-180' aria-hidden />
          </summary>
          <p className='mt-3 max-w-2xl text-sm text-gray-500'>
            Référence par numéro de fascicule : ouvrez une fiche pour la grille concours (épreuves, entraînements, sujets
            blancs liés).
          </p>
          <ul className='mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
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
        </details>
      </div>
    </div>
  );
}
