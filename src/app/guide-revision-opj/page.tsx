import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideBreadcrumbJsonLd } from '@/components/guide/GuideBreadcrumbJsonLd';
import { GuideEpreuvesAccordion } from '@/components/guide/GuideEpreuvesAccordion';
import { GuideFaqJsonLd } from '@/components/guide/GuideFaqJsonLd';
import { GlassCard } from '@/components/ui/GlassCard';
import { GUIDE_REVISION_FAQ } from '@/data/guide-revision-faq';

export const metadata: Metadata = {
  title: 'Guide de révision OPJ 2026',
  description:
    'Plan de bataille en 3 phases, chiffres clés de l’examen, épreuves, erreurs à éviter et FAQ. Liens vers fondamentaux, modules de cours, quiz et flashcards.',
  alternates: { canonical: '/guide-revision-opj' },
};

const toc = [
  { id: 'chiffres', label: 'L’examen en chiffres' },
  { id: 'epreuves', label: 'Les 3 épreuves' },
  { id: 'plan', label: 'Plan en 3 phases' },
  { id: 'erreurs', label: 'Erreurs fréquentes' },
  { id: 'outils', label: 'Les 5 outils' },
  { id: 'faq', label: 'FAQ' },
] as const;

const erreurs = [
  'Réviser le DPS sans jamais s’entraîner sur des thèmes complets',
  'Négliger la procédure pénale (F11-F15) — c’est 2 épreuves sur 3',
  'Ignorer les mises à jour législatives de 2025',
  'Ne pas connaître les phrases types par cœur → perte de temps en examen',
  'Confondre auteur / coauteur / complice dans la copie',
  'Oublier la formule PRQC pour l’élément légal',
] as const;

export default function GuideRevisionOpjPage() {
  return (
    <>
      <GuideBreadcrumbJsonLd />
      <GuideFaqJsonLd />
      <article className='mx-auto max-w-3xl px-4 py-12 pb-24 md:py-16'>
        <header className='mb-10 border-b border-white/10 pb-8'>
          <p className='text-sm font-medium uppercase tracking-wider text-gold-400'>OPJ 2026</p>
          <h1 className='mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl'>
            Guide de révision OPJ 2026
          </h1>
          <p className='mt-4 text-lg leading-relaxed text-gray-400'>
            Un plan de bataille en 3 phases pour décrocher votre habilitation en juin 2026.{' '}
            <span className='text-gray-200'>69 jours</span>, 3 épreuves, une méthode.
          </p>
        </header>

        <nav
          aria-label='Sommaire du guide'
          className='mb-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6'
        >
          <p className='mb-3 text-sm font-semibold text-gray-300'>Sommaire</p>
          <ol className='list-decimal space-y-2 pl-5 text-sm text-cyan-300/90'>
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className='underline-offset-2 hover:text-cyan-200 hover:underline'>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className='space-y-14 text-gray-300'>
          <section id='chiffres' className='scroll-mt-24'>
            <h2 className='font-display text-2xl font-bold text-white'>L’examen en chiffres</h2>
            <div className='mt-6 grid gap-3 sm:grid-cols-2'>
              {[
                { t: '3 épreuves écrites + 1 oral', d: 'DPG/DPS, procédure, puis oral parquet.' },
                { t: '15 thèmes de cours (F01–F15)', d: 'Repères pédagogiques à compléter avec les codes.' },
                { t: 'Coefficient 2 — épreuve 1', d: 'DPG / DPS pèse double.' },
                { t: 'Note éliminatoire', d: 'Moins de 5/20 à l’épreuve 1.' },
                { t: 'Session', d: 'Juin 2026.' },
              ].map((c) => (
                <GlassCard key={c.t} padding='p-5' className='border-white/10'>
                  <p className='font-display font-semibold text-white'>{c.t}</p>
                  <p className='mt-2 text-sm text-gray-400'>{c.d}</p>
                </GlassCard>
              ))}
            </div>
          </section>

          <section id='epreuves' className='scroll-mt-24'>
            <h2 className='font-display text-2xl font-bold text-white'>Les 3 épreuves</h2>
            <p className='mt-4 text-sm text-gray-500'>Une section par épreuve — ouvrez ce dont vous avez besoin.</p>
            <div className='mt-6'>
              <GuideEpreuvesAccordion />
            </div>
          </section>

          <section id='plan' className='scroll-mt-24'>
            <h2 className='font-display text-2xl font-bold text-white'>Le plan en 3 phases</h2>
            <div className='mt-6 space-y-8 border-l-2 border-gold-500/40 pl-6'>
              <div>
                <p className='font-display text-lg font-semibold text-gold-200'>Phase 1 — Cartographier (semaines 1-4)</p>
                <p className='mt-2 text-sm font-medium text-gray-200'>Objectif : avoir parcouru une première fois tous les modules thématiques.</p>
                <ul className='mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed'>
                  <li>
                    Lire <strong className='text-gray-200'>F09 et F10 en premier</strong> (éléments constitutifs +
                    circonstances aggravantes) : socle de l’épreuve 1.
                  </li>
                  <li>
                    Puis <strong className='text-gray-200'>F01, F02, F03</strong> : infractions les plus fréquentes.
                  </li>
                  <li>Quiz court (10 questions) après chaque module thématique.</li>
                  <li>Ne pas chercher à tout retenir : repérer les zones opaques.</li>
                </ul>
              </div>
              <div>
                <p className='font-display text-lg font-semibold text-gold-200'>Phase 2 — Approfondir (semaines 5-8)</p>
                <p className='mt-2 text-sm font-medium text-gray-200'>
                  Objectif : maîtriser les infractions-clés et les phrases types.
                </p>
                <ul className='mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed'>
                  <li>Flashcards quotidiennes (15 min/jour) sur les éléments constitutifs.</li>
                  <li>Épreuve 1 : thèmes chronométrés (3 h).</li>
                  <li>Épreuve 2 : 3 articulations de procédure par semaine.</li>
                  <li>
                    <strong className='text-gray-200'>F11 à F15</strong> : actes de procédure, GAV, mandats.
                  </li>
                </ul>
              </div>
              <div>
                <p className='font-display text-lg font-semibold text-gold-200'>Phase 3 — Consolider (semaines 9-10)</p>
                <p className='mt-2 text-sm font-medium text-gray-200'>Objectif : être prêt le jour J.</p>
                <ul className='mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed'>
                  <li>Sujets blancs complets dans les conditions réelles.</li>
                  <li>Réviser les CA générales (art. 132-71 à 132-80) par cœur.</li>
                  <li>Oral : enregistrer son CR parquet, écouter, corriger.</li>
                  <li>
                    Cahier de mise à jour : lois 2025 (narcotrafic, homicide routier, définition du viol, etc.).
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section id='erreurs' className='scroll-mt-24'>
            <h2 className='font-display text-2xl font-bold text-white'>Erreurs fréquentes à éviter</h2>
            <ul className='mt-4 space-y-3'>
              {erreurs.map((e) => (
                <li
                  key={e}
                  className='flex gap-3 rounded-xl border border-red-500/15 bg-red-500/[0.06] px-4 py-3 text-sm leading-relaxed'
                >
                  <span aria-hidden>❌</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id='outils' className='scroll-mt-24'>
            <h2 className='font-display text-2xl font-bold text-white'>Les 5 outils</h2>
            <div className='mt-6 grid gap-4 sm:grid-cols-2'>
              <Link
                href='/fondamentaux'
                className='rounded-2xl border border-white/15 bg-white/[0.04] p-6 transition hover:border-cyan-500/40 hover:bg-white/[0.06]'
              >
                <p className='text-xs font-semibold uppercase tracking-wide text-cyan-400'>1</p>
                <p className='mt-2 font-display text-lg font-semibold text-white'>Fondamentaux</p>
                <p className='mt-2 text-sm text-gray-400'>Notions clés synthétisées.</p>
              </Link>
              <Link
                href='/epreuves/epreuve-1'
                className='rounded-2xl border border-white/15 bg-white/[0.04] p-6 transition hover:border-cyan-500/40 hover:bg-white/[0.06]'
              >
                <p className='text-xs font-semibold uppercase tracking-wide text-cyan-400'>2</p>
                <p className='mt-2 font-display text-lg font-semibold text-white'>Épreuves</p>
                <p className='mt-2 text-sm text-gray-400'>Méthode + phrases types.</p>
              </Link>
              <Link
                href='/cours/modules'
                className='rounded-2xl border border-white/15 bg-white/[0.04] p-6 transition hover:border-cyan-500/40 hover:bg-white/[0.06]'
              >
                <p className='text-xs font-semibold uppercase tracking-wide text-cyan-400'>3</p>
                <p className='mt-2 font-display text-lg font-semibold text-white'>Modules de cours</p>
                <p className='mt-2 text-sm text-gray-400'>Fiches synthétiques F01–F15 à compléter.</p>
              </Link>
              <Link
                href='/entrainement/quiz'
                className='rounded-2xl border border-white/15 bg-white/[0.04] p-6 transition hover:border-cyan-500/40 hover:bg-white/[0.06]'
              >
                <p className='text-xs font-semibold uppercase tracking-wide text-cyan-400'>4</p>
                <p className='mt-2 font-display text-lg font-semibold text-white'>Quiz</p>
                <p className='mt-2 text-sm text-gray-400'>Auto-évaluation après chaque lecture.</p>
              </Link>
              <Link
                href='/entrainement/flashcards'
                className='rounded-2xl border border-white/15 bg-white/[0.04] p-6 transition hover:border-cyan-500/40 hover:bg-white/[0.06] sm:col-span-2'
              >
                <p className='text-xs font-semibold uppercase tracking-wide text-cyan-400'>5</p>
                <p className='mt-2 font-display text-lg font-semibold text-white'>Flashcards</p>
                <p className='mt-2 text-sm text-gray-400'>Mémorisation quotidienne.</p>
              </Link>
            </div>
          </section>

          <section id='faq' className='scroll-mt-24'>
            <h2 className='font-display text-2xl font-bold text-white'>FAQ</h2>
            <dl className='mt-6 space-y-8'>
              {GUIDE_REVISION_FAQ.map((item) => (
                <div key={item.question} className='border-b border-white/10 pb-8 last:border-0'>
                  <dt className='font-display text-lg font-semibold text-white'>{item.question}</dt>
                  <dd className='mt-3 leading-relaxed text-gray-400'>{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <footer className='mt-16 border-t border-white/10 pt-10'>
          <p className='text-center text-sm text-gray-500'>
            Enchaîner avec{' '}
            <Link href='/infractions' className='text-cyan-400 hover:underline'>
              le référentiel infractions
            </Link>{' '}
            ou{' '}
            <Link href='/entrainement/recapitulatif' className='text-cyan-400 hover:underline'>
              le tableau récapitulatif
            </Link>
            .
          </p>
        </footer>
      </article>
    </>
  );
}
