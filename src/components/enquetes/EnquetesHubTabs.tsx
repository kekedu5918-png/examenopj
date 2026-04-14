'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  LayoutGrid,
  Lightbulb,
  Sparkles,
  Table2,
} from 'lucide-react';

import { EnqueteHub } from '@/components/enquetes/EnqueteHub';
import { MethodoRappel } from '@/components/methodo/MethodoRappel';
import { GlassCard } from '@/components/ui/GlassCard';
import type { EnqueteMeta } from '@/data/enquetes-types';
import { cn } from '@/utils/cn';

const PARCOURS_IDS = ['alpha', 'bravo', 'charlie'] as const;

const PARCOURS_STYLE: Record<
  string,
  { bubble: string; ring: string; label: string; step: string }
> = {
  alpha: {
    bubble: 'from-rose-500/25 to-rose-950/40 border-rose-400/40 text-rose-100',
    ring: 'ring-rose-500/30',
    label: 'bg-rose-500/20 text-rose-100 border-rose-400/30',
    step: 'text-rose-300',
  },
  bravo: {
    bubble: 'from-sky-500/25 to-sky-950/40 border-sky-400/40 text-sky-100',
    ring: 'ring-sky-500/30',
    label: 'bg-sky-500/20 text-sky-100 border-sky-400/30',
    step: 'text-sky-300',
  },
  charlie: {
    bubble: 'from-amber-500/20 to-amber-950/35 border-amber-400/35 text-amber-100',
    ring: 'ring-amber-500/30',
    label: 'bg-amber-500/20 text-amber-100 border-amber-400/30',
    step: 'text-amber-300',
  },
};

type HubTab = 'parcours' | 'catalogue' | 'memos';

const TAB_DEF: { id: HubTab; label: string; short: string; icon: typeof Sparkles }[] = [
  { id: 'parcours', label: 'Parcours formation', short: 'A → B → C', icon: GraduationCap },
  { id: 'catalogue', label: 'Toutes les enquêtes', short: 'Catalogue', icon: LayoutGrid },
  { id: 'memos', label: 'Mémos & méthode', short: 'Flash', icon: Lightbulb },
];

function ParcoursFormation({ enquetes }: { enquetes: EnqueteMeta[] }) {
  const trio = PARCOURS_IDS.map((id) => enquetes.find((e) => e.id === id)).filter(Boolean) as EnqueteMeta[];

  return (
    <div className='space-y-10'>
      {/* Bulles fil conducteur */}
      <div className='rounded-3xl border border-white/[0.08] bg-gradient-to-br from-violet-950/30 via-navy-950/40 to-navy-950 p-6 md:p-8'>
        <p className='text-center text-[11px] font-bold uppercase tracking-[0.28em] text-violet-300/90'>Ordre document centre</p>
        <p className='mx-auto mt-2 max-w-xl text-center text-sm text-slate-400'>
          En présentiel comme ici : enchaîner <strong className='text-slate-200'>Alpha</strong>, puis{' '}
          <strong className='text-slate-200'>Bravo</strong>, puis <strong className='text-slate-200'>Charlie</strong> avant
          d’explorer le reste du catalogue.
        </p>

        <div className='mt-8 flex flex-col items-center gap-6 md:flex-row md:flex-wrap md:justify-center md:gap-4'>
          {trio.map((e, i) => {
            const st = PARCOURS_STYLE[e.id] ?? PARCOURS_STYLE.alpha;
            return (
              <Fragment key={e.id}>
                {i > 0 ? (
                  <ArrowRight
                    className='hidden h-7 w-7 shrink-0 rotate-90 text-slate-600 md:block md:rotate-0'
                    aria-hidden
                  />
                ) : null}
                <div className='flex w-full max-w-[240px] flex-col items-center'>
                  <div
                    className={cn(
                      'flex h-24 w-24 flex-col items-center justify-center rounded-2xl border-2 bg-gradient-to-br shadow-lg ring-2 md:h-28 md:w-28',
                      st.bubble,
                      st.ring,
                    )}
                  >
                    <span className={cn('text-2xl font-black tracking-tight md:text-3xl', st.step)}>{e.code}</span>
                    <span className='mt-1 text-[10px] font-semibold uppercase tracking-wider opacity-90'>
                      {i + 1} / 3
                    </span>
                  </div>
                  <Link
                    href={`/enquetes/${e.id}`}
                    className='mt-3 text-center text-sm font-bold text-white underline-offset-4 transition hover:text-violet-200 hover:underline'
                  >
                    {e.titre.replace(/^Enquête \w+ — /, '')}
                  </Link>
                  <span
                    className={cn(
                      'mt-2 inline-flex max-w-full rounded-full border px-2.5 py-0.5 text-center text-[10px] font-bold uppercase tracking-wide',
                      st.label,
                    )}
                    title={e.cadre}
                  >
                    {e.cadre.length > 40 ? `${e.cadre.slice(0, 38)}…` : e.cadre}
                  </span>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>

      {/* Tableau comparatif */}
      <div className='overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]'>
        <table className='w-full min-w-[520px] border-collapse text-left text-sm'>
          <caption className='border-b border-white/10 bg-violet-950/40 px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-violet-200'>
            Synthèse rapide — les trois du parcours
          </caption>
          <thead>
            <tr className='border-b border-white/10 text-xs uppercase tracking-wide text-slate-500'>
              <th className='px-4 py-3 font-semibold'>Enquête</th>
              <th className='px-4 py-3 font-semibold'>Thème</th>
              <th className='px-4 py-3 font-semibold'>Cadre procédural</th>
              <th className='px-4 py-3 font-semibold'>Accès</th>
              <th className='px-4 py-3 font-semibold'>Action</th>
            </tr>
          </thead>
          <tbody>
            {trio.map((e) => {
              const st = PARCOURS_STYLE[e.id] ?? PARCOURS_STYLE.alpha;
              return (
                <tr key={e.id} className='border-b border-white/[0.06] last:border-0'>
                  <td className='px-4 py-3'>
                    <span
                      className={cn(
                        'inline-flex rounded-lg border px-2 py-1 text-xs font-black',
                        st.label,
                      )}
                    >
                      {e.code}
                    </span>
                  </td>
                  <td className='max-w-[200px] px-4 py-3 text-slate-300'>{e.themeCourt ?? '—'}</td>
                  <td className='px-4 py-3 text-slate-400'>{e.cadre}</td>
                  <td className='px-4 py-3'>
                    {e.premium ? (
                      <span className='rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-200'>
                        Premium
                      </span>
                    ) : (
                      <span className='rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-200'>
                        Gratuit
                      </span>
                    )}
                  </td>
                  <td className='px-4 py-3'>
                    <Link
                      href={`/enquetes/${e.id}`}
                      className='font-semibold text-violet-300 underline-offset-2 hover:text-violet-200 hover:underline'
                    >
                      Ouvrir
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className='flex flex-wrap justify-center gap-3 text-sm'>
        <Link
          href='/enquetes/alpha'
          className='inline-flex items-center gap-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-4 py-2.5 font-semibold text-rose-100 transition hover:bg-rose-500/20'
        >
          <BookOpen className='h-4 w-4' aria-hidden />
          Commencer par Alpha
        </Link>
        <Link
          href='/epreuves/epreuve-2'
          className='inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2.5 font-semibold text-slate-200 transition hover:bg-white/10'
        >
          <ClipboardCheck className='h-4 w-4' aria-hidden />
          Fiche Épreuve 2
        </Link>
      </div>
    </div>
  );
}

function MemosPanel() {
  const memos = [
    {
      title: 'Cartouche Épreuve 2',
      color: 'border-emerald-500/35 bg-emerald-950/30 from-emerald-500/15',
      accent: 'text-emerald-200',
      body: 'Une cartouche = qui agit, quand, sous quel titre, pour quoi (faits télégraphiques).',
      href: '/epreuves/epreuve-2',
      cta: 'Voir la méthode',
    },
    {
      title: 'PRQC — Épreuve 1',
      color: 'border-violet-500/35 bg-violet-950/30 from-violet-500/15',
      accent: 'text-violet-200',
      body: 'Qualifications : citez les éléments mot pour mot depuis le référentiel infractions.',
      href: '/infractions',
      cta: 'Référentiel',
    },
    {
      title: 'Articulation guidée',
      color: 'border-cyan-500/35 bg-cyan-950/30 from-cyan-500/15',
      accent: 'text-cyan-200',
      body: 'Modèles Alpha / Bravo après validation — entraînement chronométré.',
      href: '/entrainement/articulation',
      cta: 'Lancer',
    },
    {
      title: 'Tableau récap entraînement',
      color: 'border-amber-500/35 bg-amber-950/30 from-amber-500/15',
      accent: 'text-amber-200',
      body: 'Filtrer par thème du programme et réviser en mode flash.',
      href: '/entrainement/recapitulatif',
      cta: 'Ouvrir',
    },
  ];

  return (
    <div className='space-y-8'>
      <div className='grid gap-4 sm:grid-cols-2'>
        {memos.map((m) => (
          <GlassCard
            key={m.title}
            hover
            padding='p-5'
            className={cn(
              'border bg-gradient-to-br to-navy-950/80',
              m.color,
            )}
          >
            <div className='flex items-start gap-3'>
              <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/20'>
                <Table2 className={cn('h-5 w-5', m.accent)} aria-hidden />
              </span>
              <div className='min-w-0'>
                <h3 className={cn('font-display text-lg font-bold', m.accent)}>{m.title}</h3>
                <p className='mt-2 text-sm leading-relaxed text-slate-400'>{m.body}</p>
                <Link
                  href={m.href}
                  className='mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white underline-offset-2 hover:underline'
                >
                  {m.cta}
                  <ArrowRight className='h-4 w-4' aria-hidden />
                </Link>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <MethodoRappel title='Épreuve 2' variant='accent'>
          <p>
            Une cartouche = <strong>qui</strong> agit, <strong>quand</strong>, <strong>sous quel titre</strong>, pour{' '}
            <strong>quoi</strong> (faits télégraphiques).
          </p>
          <p>
            Méthode détaillée :{' '}
            <Link href='/epreuves/epreuve-2' className='font-semibold text-emerald-200 underline'>
              page épreuve 2
            </Link>
            .
          </p>
        </MethodoRappel>
        <MethodoRappel title='Qualification (épreuve 1)' id='methodo-ep1'>
          <p>
            Gardez la <strong>PRQC</strong> et citez les éléments <strong>mot pour mot</strong> depuis votre référentiel — pas
            depuis votre cahier de brouillon.
          </p>
          <p>
            <Link href='/entrainement/recapitulatif' className='font-semibold text-gray-200 underline'>
              Tableau récap
            </Link>{' '}
            pour l’entraînement flash.
          </p>
        </MethodoRappel>
      </div>

      <p className='text-center text-xs text-slate-600'>
        Rappels de méthode :{' '}
        <Link href='/entrainement' className='text-violet-400 underline-offset-2 hover:underline'>
          hub Entraînement
        </Link>
        .
      </p>
    </div>
  );
}

export function EnquetesHubTabs({ enquetes }: { enquetes: EnqueteMeta[] }) {
  const [tab, setTab] = useState<HubTab>('parcours');

  return (
    <div className='space-y-8'>
      {/* Onglets style bulles */}
      <div
        role='tablist'
        aria-label='Sections du hub enquêtes'
        className='flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch'
      >
        {TAB_DEF.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type='button'
              role='tab'
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={cn(
                'flex flex-1 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition sm:min-w-[160px] sm:flex-initial',
                active
                  ? 'border-violet-400/50 bg-gradient-to-br from-violet-600/25 to-violet-950/50 shadow-lg shadow-violet-950/40 ring-1 ring-violet-400/30'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]',
              )}
            >
              <span
                className={cn(
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
                  active ? 'border-violet-400/40 bg-violet-500/20 text-violet-100' : 'border-white/10 bg-black/20 text-slate-400',
                )}
              >
                <Icon className='h-5 w-5' aria-hidden />
              </span>
              <span className='min-w-0'>
                <span className='block text-sm font-bold text-white'>{t.label}</span>
                <span className='text-xs text-slate-500'>{t.short}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div role='tabpanel' className='min-h-[200px]'>
        {tab === 'parcours' ? <ParcoursFormation enquetes={enquetes} /> : null}
        {tab === 'catalogue' ? (
          <div className='space-y-6'>
            <div>
              <h2 className='font-display text-xl font-bold text-white md:text-2xl'>Catalogue & filtres</h2>
              <p className='mt-2 max-w-2xl text-sm text-slate-500'>
                Toutes les planches et fiches péda — utilise les pastilles pour isoler flagrance, préliminaire ou
                changement de cadre.
              </p>
            </div>
            <EnqueteHub enquetes={enquetes} />
          </div>
        ) : null}
        {tab === 'memos' ? <MemosPanel /> : null}
      </div>
    </div>
  );
}
