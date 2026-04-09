import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpenCheck,
  Brain,
  CircleX,
  ClipboardList,
  FileText,
  LayoutList,
  Timer,
} from 'lucide-react';

import { GuideBreadcrumbJsonLd } from '@/components/guide/GuideBreadcrumbJsonLd';
import { GuideEpreuvesAccordion } from '@/components/guide/GuideEpreuvesAccordion';
import { GuideFaqJsonLd } from '@/components/guide/GuideFaqJsonLd';
import { StickyToc } from '@/components/ui/StickyToc';
import { GUIDE_REVISION_FAQ } from '@/data/guide-revision-faq';
import { openGraphForPage } from '@/utils/seo-metadata';

import { GuideIntroLead } from './guide-intro-lead';

const guideSeoTitle = 'Guide de révision OPJ 2026';
const guideSeoDescription =
  "Guide de révision OPJ 2026 : programme officiel, méthode par épreuve, planning 6 mois et erreurs à éviter pour les écrits et l'oral.";

export const metadata: Metadata = {
  title: guideSeoTitle,
  description: guideSeoDescription,
  alternates: { canonical: '/guide-revision-opj' },
  ...openGraphForPage('/guide-revision-opj', guideSeoTitle, guideSeoDescription),
};

const TOC_ITEMS = [
  { id: 'chiffres', label: "L'examen en chiffres" },
  { id: 'epreuves', label: 'Les 3 épreuves' },
  { id: 'plan', label: 'Plan en 3 phases' },
  { id: 'erreurs', label: 'Erreurs fréquentes' },
  { id: 'outils', label: 'Les 6 outils' },
  { id: 'faq', label: 'FAQ' },
];

const STAT_ITEMS = [
  { value: '3', label: 'épreuves écrites + 1 oral', sub: 'DPG/DPS, procédure, oral parquet', color: 'from-cyan-500/15 border-cyan-500/25 text-cyan-300' },
  { value: '15', label: 'thèmes de cours', sub: 'F01–F15 : du DPS à la procédure', color: 'from-violet-500/15 border-violet-500/25 text-violet-300' },
  { value: 'Coef 2', label: 'Épreuve 1 — DPG/DPS', sub: 'Pèse double dans le classement final', color: 'from-amber-500/15 border-amber-500/25 text-amber-300' },
  { value: '5/20', label: 'note éliminatoire', sub: 'Épreuve 1 : en dessous = éliminé', color: 'from-rose-500/15 border-rose-500/25 text-rose-300' },
];

const PHASE_DATA = [
  {
    num: '01',
    title: 'Cartographier',
    weeks: 'Sem. 1–4',
    color: 'border-cyan-500/40 bg-cyan-500/[0.06]',
    titleColor: 'text-cyan-300',
    points: [
      "Lire F09 et F10 en premier (éléments constitutifs + CA) : socle de l'épreuve 1",
      'Puis F01, F02, F03 : infractions les plus fréquentes',
      'Quiz court (10 questions) après chaque module thématique',
      'Ne pas chercher à tout retenir : repérer les zones opaques',
    ],
  },
  {
    num: '02',
    title: 'Approfondir',
    weeks: 'Sem. 5–8',
    color: 'border-amber-500/40 bg-amber-500/[0.06]',
    titleColor: 'text-amber-300',
    points: [
      'Flashcards quotidiennes (15 min/jour) sur les éléments constitutifs',
      'Épreuve 1 : thèmes chronométrés (3 h)',
      'Épreuve 2 : 3 articulations de procédure par semaine',
      'F11 à F15 : actes de procédure, GAV, mandats, nullités',
    ],
  },
  {
    num: '03',
    title: 'Consolider',
    weeks: 'Sem. 9–10',
    color: 'border-emerald-500/40 bg-emerald-500/[0.06]',
    titleColor: 'text-emerald-300',
    points: [
      'Sujets blancs complets dans les conditions réelles (3h chronométrées)',
      'Réviser les CA générales (art. 132-71 à 132-80) par cœur',
      'Oral : enregistrer son CR parquet, écouter, corriger',
      'Cahier de mise à jour : lois 2025 (narcotrafic, homicide routier, etc.)',
    ],
  },
];

const ERREURS = [
  "Réviser le DPS sans jamais s'entraîner sur des thèmes complets",
  "Négliger la procédure pénale (F11-F15) — c'est 2 épreuves sur 3",
  'Ignorer les mises à jour législatives de 2025',
  'Ne pas connaître les phrases types par cœur → perte de temps en examen',
  'Confondre auteur / coauteur / complice dans la copie',
  "Oublier la formule PRQC pour l'élément légal",
];

const OUTILS = [
  { num: 1, href: '/fondamentaux', title: 'Fondamentaux', desc: 'Synthèses courtes sur les notions clés procédure et pénal.', icon: BookOpenCheck, color: 'border-violet-500/30 hover:border-violet-500/50 hover:bg-violet-500/[0.05]', numColor: 'text-violet-400' },
  { num: 2, href: '/epreuves/epreuve-1', title: 'Épreuves', desc: "Méthode + phrases types pour l'écrit et l'oral.", icon: FileText, color: 'border-cyan-500/30 hover:border-cyan-500/50 hover:bg-cyan-500/[0.05]', numColor: 'text-cyan-400' },
  { num: 3, href: '/cours/modules', title: 'Modules de cours', desc: 'Fiches synthétiques F01–F15 à compléter avec les codes.', icon: LayoutList, color: 'border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/[0.05]', numColor: 'text-blue-400' },
  { num: 4, href: '/quiz', title: 'Quiz', desc: 'Auto-évaluation immédiate après chaque lecture de fiche.', icon: Brain, color: 'border-amber-500/30 hover:border-amber-500/50 hover:bg-amber-500/[0.05]', numColor: 'text-amber-400' },
  { num: 5, href: '/flashcards', title: 'Flashcards', desc: 'Mémorisation quotidienne (15 min) sur les éléments constitutifs.', icon: Timer, color: 'border-gold-500/30 hover:border-gold-500/50 hover:bg-gold-500/[0.05]', numColor: 'text-gold-400' },
  { num: 6, href: '/cours/pv', title: 'Procès-verbaux ME1', desc: "Modèles, mentions et textes à trous pour l'épreuve 2.", icon: ClipboardList, color: 'border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-500/[0.05]', numColor: 'text-emerald-400' },
];

export default function GuideRevisionOpjPage() {
  return (
    <>
      <GuideBreadcrumbJsonLd />
      <GuideFaqJsonLd />

      {/* Layout 2 colonnes : StickyToc + article */}
      <div className='mx-auto flex max-w-5xl gap-8 px-4 py-12 pb-24 md:py-16'>

        {/* StickyToc sidebar */}
        <StickyToc items={TOC_ITEMS} title='Sommaire' className='w-48 shrink-0' />

        {/* Contenu principal */}
        <article className='min-w-0 flex-1'>
          <header className='mb-10 border-b border-white/10 pb-8'>
            <p className='text-sm font-medium uppercase tracking-wider text-gold-400'>OPJ 2026</p>
            <h1 className='mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl'>
              Guide de révision OPJ 2026
            </h1>
            <GuideIntroLead />
          </header>

          <div className='space-y-14 text-gray-300'>

            {/* ─── Chiffres ─── */}
            <section id='chiffres' className='scroll-mt-24'>
              <h2 className='font-display text-2xl font-bold text-white'>L&apos;examen en chiffres</h2>
              <div className='mt-6 grid gap-3 sm:grid-cols-2'>
                {STAT_ITEMS.map((s) => {
                  const textColorClass = s.color.split(' ').find((c) => c.startsWith('text-')) ?? 'text-white';
                  return (
                    <div
                      key={s.label}
                      className={`rounded-2xl border bg-gradient-to-br to-transparent p-5 ${s.color}`}
                    >
                      <p className={`font-display text-3xl font-black ${textColorClass}`}>
                        {s.value}
                      </p>
                      <p className='mt-1 font-semibold text-white'>{s.label}</p>
                      <p className='mt-1 text-sm text-gray-400'>{s.sub}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ─── Épreuves ─── */}
            <section id='epreuves' className='scroll-mt-24'>
              <h2 className='font-display text-2xl font-bold text-white'>Les 3 épreuves</h2>
              <p className='mt-4 text-sm text-gray-500'>Une section par épreuve — ouvrez ce dont vous avez besoin.</p>
              <div className='mt-6'>
                <GuideEpreuvesAccordion />
              </div>
            </section>

            {/* ─── Plan 3 phases ─── */}
            <section id='plan' className='scroll-mt-24'>
              <h2 className='font-display text-2xl font-bold text-white'>Le plan en 3 phases</h2>
              <div className='mt-8 grid gap-4 md:grid-cols-3'>
                {PHASE_DATA.map((phase) => (
                  <div key={phase.num} className={`flex flex-col rounded-2xl border p-5 ${phase.color}`}>
                    <div className='mb-3 flex items-center gap-3'>
                      <span className='font-display text-4xl font-black text-white/20'>{phase.num}</span>
                      <div>
                        <p className={`font-display text-base font-bold ${phase.titleColor}`}>{phase.title}</p>
                        <p className='text-xs text-gray-500'>{phase.weeks}</p>
                      </div>
                    </div>
                    <ul className='space-y-2'>
                      {phase.points.map((pt, i) => (
                        <li key={i} className='flex gap-2 text-sm text-gray-400'>
                          <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/20' aria-hidden />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── Erreurs fréquentes ─── */}
            <section id='erreurs' className='scroll-mt-24'>
              <h2 className='font-display text-2xl font-bold text-white'>Erreurs fréquentes à éviter</h2>
              <ul className='mt-6 space-y-3'>
                {ERREURS.map((e) => (
                  <li
                    key={e}
                    className='flex gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/[0.07] px-4 py-3.5 text-sm leading-relaxed'
                  >
                    <CircleX className='mt-0.5 h-5 w-5 shrink-0 text-rose-400' aria-hidden />
                    <span className='text-rose-100'>{e}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* ─── Les 6 outils ─── */}
            <section id='outils' className='scroll-mt-24'>
              <h2 className='font-display text-2xl font-bold text-white'>Les 6 outils</h2>
              <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {OUTILS.map((outil) => {
                  const Icon = outil.icon;
                  return (
                    <Link
                      key={outil.href}
                      href={outil.href}
                      className={`group flex flex-col rounded-2xl border bg-white/[0.03] p-5 transition ${outil.color}`}
                    >
                      <div className='flex items-center gap-3'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] transition group-hover:scale-105'>
                          <Icon className={`h-5 w-5 ${outil.numColor}`} strokeWidth={1.75} />
                        </div>
                        <span className={`text-xs font-bold ${outil.numColor}`}>
                          {String(outil.num).padStart(2, '0')}
                        </span>
                      </div>
                      <p className='mt-3 font-display text-base font-semibold text-white'>{outil.title}</p>
                      <p className='mt-1.5 text-sm text-gray-400'>{outil.desc}</p>
                      <span className='mt-auto pt-3 text-xs font-medium text-cyan-400 opacity-0 transition group-hover:opacity-100'>
                        Ouvrir →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* ─── FAQ ─── */}
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

          <footer className='mt-16 flex flex-wrap justify-center gap-3 border-t border-white/10 pt-10'>
            <Link href='/infractions' className='rounded-lg border border-white/15 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/40'>
              Référentiel infractions →
            </Link>
            <Link href='/entrainement/recapitulatif' className='rounded-lg border border-white/15 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/40'>
              Tableau récapitulatif →
            </Link>
            <Link href='/parcours-candidat' className='rounded-lg border border-white/15 px-4 py-2 text-sm text-gold-300 transition hover:border-gold-500/40'>
              Parcours candidat 26 semaines →
            </Link>
          </footer>
        </article>
      </div>
    </>
  );
}
