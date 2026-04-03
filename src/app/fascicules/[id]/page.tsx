import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { FasciculeTextContent } from '@/components/fascicules/FasciculeTextContent';
import { GlassCard } from '@/components/ui/GlassCard';
import { DOMAIN_LABELS, FASCICULES, getFasciculeById, type Domain } from '@/data/fascicules-list';
import { cn } from '@/utils/cn';

const domainBadge: Record<Domain, string> = {
  DPS: 'bg-red-500/20 text-red-300 border-red-500/25',
  DPG: 'bg-violet-500/20 text-violet-300 border-violet-500/25',
  PROCEDURE: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
};

export function generateStaticParams() {
  return FASCICULES.map((f) => ({ id: f.id }));
}

type Props = { params: { id: string } };

export function generateMetadata({ params }: Props): Metadata {
  const f = getFasciculeById(params.id);
  if (!f) return {};
  return {
    title: `F${String(f.num).padStart(2, '0')} — ${f.title} | ExamenOPJ`,
    description: `${f.subtitle}. ${f.pages} pages. Version SDCP 01/12/2025. Préparation examen OPJ Juin 2026.`,
  };
}

export default function FasciculeDetailPage({ params }: Props) {
  const f = getFasciculeById(params.id);
  if (!f) notFound();

  return (
    <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950 px-4 pb-24 pt-12 md:px-6 md:pt-16'>
      <div className='mx-auto max-w-4xl'>
        <header className='mb-10 border-b border-white/10 pb-8'>
          <span
            className={cn(
              'inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
              domainBadge[f.domain],
            )}
          >
            {DOMAIN_LABELS[f.domain]}
          </span>
          <h1 className='mt-4 font-display text-2xl font-bold tracking-tight text-white md:text-4xl'>
            Fascicule n°{f.num} — {f.title}
          </h1>
          <p className='mt-3 text-base text-gray-400'>{f.subtitle}</p>
          <p className='mt-4 flex flex-wrap items-center gap-2 font-mono text-xs text-gray-500'>
            <span>{f.pages} pages</span>
            <span aria-hidden>·</span>
            <span>Version 01/12/2025</span>
            <span aria-hidden>·</span>
            <span>© SDCP</span>
          </p>
          {f.note ? (
            <div className='mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100'>
              {f.note}
            </div>
          ) : null}
          <div className='mt-6 flex flex-wrap gap-2'>
            <Link
              href={`/quiz?mode=fascicule&f=${f.id}`}
              className='inline-flex items-center justify-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500'
            >
              Quiz F{String(f.num).padStart(2, '0')}
            </Link>
            <Link
              href={`/flashcards?f=${f.id}`}
              className='inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-200 transition hover:bg-white/10'
            >
              Flashcards
            </Link>
            <Link
              href='/recapitulatif'
              className='inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-200 transition hover:bg-white/10'
            >
              Récapitulatif
            </Link>
            <Link
              href='/infractions'
              className='inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-200 transition hover:bg-white/10'
            >
              Infractions
            </Link>
            <Link
              href='/fascicules'
              className='inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-400 transition hover:text-white'
            >
              ← Liste
            </Link>
          </div>
        </header>

        {f.chapters.length > 0 ? (
          <GlassCard className='mb-10 border-white/[0.08] p-6 md:p-8'>
            <h2 className='font-display text-xl font-bold text-white'>Sommaire</h2>
            <div className='mt-6 space-y-6'>
              {f.chapters.map((chapter, i) => (
                <div key={`${chapter.title}-${i}`} className='border-b border-white/[0.06] pb-6 last:border-0 last:pb-0'>
                  <h3 className='text-base font-semibold text-gray-100'>
                    {chapter.title}
                    {chapter.page != null ? (
                      <span className='ml-2 font-mono text-xs font-normal text-gray-500'>p. {chapter.page}</span>
                    ) : null}
                  </h3>
                  {chapter.subChapters && chapter.subChapters.length > 0 ? (
                    <ul className='mt-3 list-inside list-disc space-y-1.5 text-sm text-gray-400'>
                      {chapter.subChapters.map((sub, j) => (
                        <li key={j}>{sub}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </GlassCard>
        ) : null}

        {f.infractions && f.infractions.length > 0 ? (
          <GlassCard className='mb-10 border-white/[0.08] p-6 md:p-8'>
            <h2 className='font-display text-xl font-bold text-white'>Infractions — éléments de qualification</h2>
            <ul className='mt-4 grid gap-2 sm:grid-cols-1'>
              {f.infractions.map((inf, i) => (
                <li
                  key={i}
                  className='flex gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm text-gray-300'
                >
                  <span className='font-mono text-xs font-bold text-cyan-400/90'>{i + 1}</span>
                  <span>{inf}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        ) : null}

        <GlassCard className='border-white/[0.08] p-6 md:p-8'>
          <h2 className='font-display text-xl font-bold text-white'>Contenu intégral du fascicule</h2>
          <p className='mt-2 text-xs text-gray-500'>Source : SDCP — Version 01/12/2025 — Examen Juin 2026</p>
          <div className='mt-6 border-t border-white/10 pt-6'>
            <FasciculeTextContent txtFile={f.txtFile} />
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
