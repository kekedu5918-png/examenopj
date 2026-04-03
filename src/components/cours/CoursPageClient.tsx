'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, Loader2 } from 'lucide-react';

import { LANDING_EASE } from '@/components/home/motion';
import { CoursComparatifSection } from '@/components/cours/CoursComparatifSection';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  coursLessons,
  coursLessonBySlug,
  defaultCoursSlug,
  domaineBadgeClass,
  type CoursLesson,
} from '@/data/cours-lessons';
import { cn } from '@/utils/cn';

const ease = [...LANDING_EASE] as [number, number, number, number];

const QUERY_KEY = 'l';

function normalizeCoursText(raw: string): string {
  let t = raw.replace(/\f/g, '\n\n');
  t = t.replace(/\r\n/g, '\n');
  t = t.replace(/\n{4,}/g, '\n\n\n');
  return t.trim();
}

function LessonNavItem({
  lesson,
  active,
  onSelect,
}: {
  lesson: CoursLesson;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type='button'
      onClick={onSelect}
      className={cn(
        'w-full rounded-xl border px-3 py-2.5 text-left text-sm transition',
        active
          ? 'border-cyan-500/40 bg-cyan-500/10 text-white'
          : 'border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20 hover:bg-white/[0.05] hover:text-gray-200',
      )}
    >
      <span className='block font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-500'>
        F{String(lesson.fascicule).padStart(2, '0')}
      </span>
      <span className='mt-0.5 line-clamp-2 font-medium leading-snug'>{lesson.titre}</span>
      {lesson.sousTitre ? <span className='mt-0.5 block text-xs text-gray-500'>{lesson.sousTitre}</span> : null}
    </button>
  );
}

export function CoursPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slugFromUrl = searchParams.get(QUERY_KEY);

  const activeLesson = useMemo(() => {
    if (slugFromUrl && coursLessonBySlug.has(slugFromUrl)) {
      return coursLessonBySlug.get(slugFromUrl)!;
    }
    return coursLessonBySlug.get(defaultCoursSlug)!;
  }, [slugFromUrl]);

  const [body, setBody] = useState<string>('');
  const [loadState, setLoadState] = useState<'idle' | 'loading' | 'error'>('idle');

  const setSlug = useCallback(
    (slug: string) => {
      const p = new URLSearchParams(searchParams.toString());
      p.set(QUERY_KEY, slug);
      router.replace(`/cours?${p.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  useEffect(() => {
    const slug = slugFromUrl && coursLessonBySlug.has(slugFromUrl) ? slugFromUrl : defaultCoursSlug;
    const lesson = coursLessonBySlug.get(slug)!;
    const url = `/cours-texte/${lesson.fichier}`;

    let cancelled = false;
    setLoadState('loading');
    setBody('');

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.text();
      })
      .then((text) => {
        if (cancelled) return;
        setBody(normalizeCoursText(text));
        setLoadState('idle');
      })
      .catch(() => {
        if (cancelled) return;
        setLoadState('error');
      });

    return () => {
      cancelled = true;
    };
  }, [slugFromUrl]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#0a1018] to-navy-950'>
      <div className='container pb-24 pt-10 md:pt-14'>
        <header className='mb-8 border-b border-white/10 pb-8'>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <span className='inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200'>
              Fascicules
            </span>
            <h1 className='mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl'>Cours</h1>
            <p className='mt-3 max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base'>
              <span className='font-medium text-emerald-200/95'>Référence prioritaire :</span> ce sont ces textes
              fascicules (fichiers .txt) qui font foi devant toute autre synthèse ou leçon d’une application tierce. En cas
              de divergence (article, peine, jurisprudence), tu te bases sur ce qui s’affiche ici. Mise en forme brute ;
              recherche possible avec{' '}
              <kbd className='rounded border border-white/20 bg-white/5 px-1.5 py-0.5 font-mono text-xs'>Ctrl+F</kbd>.
            </p>
          </motion.div>
        </header>

        <div className='flex flex-col gap-8 lg:flex-row lg:items-start'>
          <aside className='lg:w-80 lg:shrink-0'>
            <GlassCard className='border-white/[0.08] bg-navy-950/80 p-4 lg:sticky lg:top-24'>
              <p className='mb-3 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500'>
                <BookOpen className='h-3.5 w-3.5' aria-hidden />
                Leçons
              </p>
              <nav className='flex max-h-[min(70vh,520px)] flex-col gap-1.5 overflow-y-auto pr-1' aria-label='Cours'>
                {coursLessons.map((lesson) => (
                  <LessonNavItem
                    key={lesson.slug}
                    lesson={lesson}
                    active={lesson.slug === activeLesson.slug}
                    onSelect={() => setSlug(lesson.slug)}
                  />
                ))}
              </nav>
            </GlassCard>
          </aside>

          <main className='min-w-0 flex-1'>
            <GlassCard className='border-white/[0.08] bg-navy-950/90 p-5 md:p-8'>
              <div className='mb-6 flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between'>
                <div>
                  <span
                    className={cn(
                      'inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider',
                      domaineBadgeClass(activeLesson.domaine),
                    )}
                  >
                    {activeLesson.domaine}
                  </span>
                  <h2 className='mt-2 font-display text-xl font-bold text-white md:text-2xl'>{activeLesson.titre}</h2>
                  {activeLesson.sousTitre ? (
                    <p className='mt-1 text-sm text-gray-500'>{activeLesson.sousTitre}</p>
                  ) : null}
                  <p className='mt-2 font-mono text-xs text-gray-500'>
                    Fascicule n°{activeLesson.fascicule} · {activeLesson.fichier}
                  </p>
                </div>
                <Link
                  href={`/fascicules/f${String(activeLesson.fascicule).padStart(2, '0')}`}
                  className='inline-flex shrink-0 items-center gap-1 text-sm text-cyan-400/90 hover:text-cyan-300'
                >
                  Fiche fascicule
                  <ChevronRight className='h-4 w-4' aria-hidden />
                </Link>
              </div>

              {loadState === 'loading' ? (
                <div className='flex items-center gap-2 py-20 text-gray-400'>
                  <Loader2 className='h-5 w-5 animate-spin' aria-hidden />
                  Chargement du texte…
                </div>
              ) : null}

              {loadState === 'error' ? (
                <p className='rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200'>
                  Impossible de charger le fichier. Vérifie que <code className='text-red-100'>public/cours-texte/</code>{' '}
                  contient bien <code className='text-red-100'>{activeLesson.fichier}</code>.
                </p>
              ) : null}

              {loadState === 'idle' && body ? (
                <article
                  className='max-w-none whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-gray-300 [overflow-wrap:anywhere]'
                  lang='fr'
                >
                  {body}
                </article>
              ) : null}
            </GlassCard>

            <CoursComparatifSection activeFascicule={activeLesson.fascicule} />
          </main>
        </div>
      </div>
    </div>
  );
}
