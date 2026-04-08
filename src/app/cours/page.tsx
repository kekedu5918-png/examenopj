import type { Metadata } from 'next';
import Link from 'next/link';

import { CoursHubLogiqueCandidat } from '@/components/cours/CoursHubLogiqueCandidat';
import { CoursMethodeRevision } from '@/components/cours/CoursMethodeRevision';
import { CoursRevisionPath } from '@/components/cours/CoursRevisionPath';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/utils/cn';
import { openGraphForPage } from '@/utils/seo-metadata';

const coursTitle = 'Cours — Examen OPJ';
const coursDescription =
  'Méthode de révision (comprendre, fixer, appliquer, contrôler), priorités P0, fondamentaux et fil en 7 leçons — pour maximiser ce que vous retenez.';

export const metadata: Metadata = {
  title: coursTitle,
  description: coursDescription,
  alternates: { canonical: '/cours' },
  ...openGraphForPage('/cours', coursTitle, coursDescription),
};

const hubLinks = [
  {
    href: '/cours/modules',
    title: 'Fiches thématiques',
    desc: 'Une vue « priorité examen OPJ » ou l’index par domaine : vous choisissez.',
    accent: 'from-sky-500/15 to-transparent',
  },
  {
    href: '/infractions',
    title: 'Référentiel infractions',
    desc: 'Tableau et fiches : élément moral formulé comme dans le programme, à apprendre par cœur.',
    accent: 'from-rose-500/15 to-transparent',
  },
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
    title: 'Enquêtes type examen OPJ',
    desc: 'Sujet, articulation, PV et rapport : entraînement sur planches complètes.',
    accent: 'from-cyan-500/15 to-transparent',
  },
] as const;

export default function CoursHubPage() {
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
          subtitle='Pas besoin de suivre l’ordre F01–F15 pour bien réviser. Commencez par ce qui structure votre métier (fondamentaux + qualifications), enchaînez avec les thèmes que l’examen OPJ cible souvent (P0), puis le fil en 7 leçons ou le parcours candidat selon votre niveau.'
          className='relative mb-0 text-left md:max-w-3xl'
        />
      </div>

      <CoursMethodeRevision />

      <CoursHubLogiqueCandidat />

      <section className='mt-10' aria-labelledby='cours-poursuivre'>
        <h2 id='cours-poursuivre' className='sr-only'>
          Poursuivre
        </h2>
        <div className='flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:flex-row md:flex-wrap md:items-center md:justify-between'>
          <p className='max-w-xl text-sm text-gray-400'>
            Ensuite : un parcours en <strong className='font-medium text-gray-200'>7 leçons</strong> déjà enchaînées sur le
            site, ou le <strong className='font-medium text-gray-200'>parcours candidat</strong> si vous maîtrisez déjà le
            programme.
          </p>
          <div className='flex flex-wrap gap-2'>
            <Link
              href='#revision-fil'
              className='inline-flex rounded-xl border border-cyan-500/40 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/25'
            >
              Fil en 7 leçons
            </Link>
            <Link
              href='/parcours-candidat'
              className='inline-flex rounded-xl border border-gold-500/35 bg-gold-500/10 px-4 py-2 text-sm font-semibold text-gold-100 transition hover:bg-gold-500/20'
            >
              Parcours candidat
            </Link>
            <Link
              href='/entrainement'
              className='inline-flex rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/5'
            >
              Entraînement
            </Link>
          </div>
        </div>
      </section>

      <div className='mt-14'>
        <CoursRevisionPath />
      </div>

      <div className='mt-16'>
        <h2 className='mb-2 font-display text-xl font-bold text-white'>Autres accès</h2>
        <p className='mb-6 text-sm text-gray-500'>Outils complémentaires (hors ordre F01–F15).</p>
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
        <p className='mt-8 text-center text-sm text-gray-500'>
          Besoin du{' '}
          <Link href='/programme' className='text-cyan-400 underline-offset-2 hover:underline'>
            sommaire officiel du programme
          </Link>{' '}
          (titres F01–F15) ? Un seul lien : croisement avec votre documentation papier.
        </p>
      </div>
    </div>
  );
}
