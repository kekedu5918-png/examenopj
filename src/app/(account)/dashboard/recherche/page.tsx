import Link from 'next/link';
import { ArrowUpRight, BookOpen, FileSearch, Inbox, Search, Sparkles } from 'lucide-react';

import { AccountDashboardSection } from '@/components/account/AccountDashboardSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { searchLearningContent } from '@/features/examenopj/controllers/get-dashboard-data';
import {
  type LocalSearchHit,
  searchLocalContent,
} from '@/features/examenopj/controllers/local-search';

type Props = {
  searchParams?: {
    q?: string;
  };
};

export default async function RecherchePage({ searchParams }: Props) {
  const query = searchParams?.q?.trim() ?? '';
  const hasQuery = query.length > 0;

  const [supabaseResult, localResult] = hasQuery
    ? await Promise.all([searchLearningContent(query), searchLocalContent(query)])
    : [null, null];

  const supabaseHits =
    supabaseResult === null
      ? 0
      : supabaseResult.questions.length + supabaseResult.chapitres.length + supabaseResult.flashcards.length;
  const localHits = localResult?.total ?? 0;
  const totalHits = supabaseHits + localHits;
  const hasResults = hasQuery && totalHits > 0;
  const showNoHits = hasQuery && totalHits === 0;

  return (
    <AccountDashboardSection>
      <div className='space-y-1'>
        <h1 className='text-2xl font-bold text-ds-text-primary dark:text-slate-50'>Recherche globale</h1>
        <p className='text-ds-text-muted dark:text-slate-300'>
          Cours, infractions, QCM, enquêtes — tout le contenu pédagogique en une requête.
        </p>
      </div>

      <form
        method='get'
        action='/dashboard/recherche'
        className='flex flex-col gap-2 rounded-lg border border-ds-border bg-ds-bg-elevated p-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-stretch'
      >
        <label htmlFor='dashboard-search-q' className='sr-only'>
          Terme de recherche
        </label>
        <input
          id='dashboard-search-q'
          name='q'
          type='search'
          defaultValue={query}
          placeholder='Ex. : garde à vue, art. 78-2, perquisition…'
          autoComplete='off'
          className='min-w-0 flex-1 rounded-md border border-ds-border bg-ds-bg-primary px-3 py-2 text-sm text-ds-text-primary placeholder:text-ds-text-muted focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500'
        />
        <Button type='submit' variant='secondary' className='shrink-0 gap-2 sm:w-auto' aria-label='Lancer la recherche'>
          <Search className='h-4 w-4' aria-hidden />
          Rechercher
        </Button>
      </form>

      {!hasQuery && (
        <Card className='border-dashed border-ds-border bg-ds-bg-elevated/90 dark:border-slate-700 dark:bg-slate-900/80'>
          <CardContent className='flex flex-col items-center gap-3 px-6 py-10 text-center'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-ds-bg-secondary text-ds-text-muted dark:bg-slate-800 dark:text-slate-400'>
              <Search className='h-6 w-6' aria-hidden />
            </div>
            <p className='max-w-md text-sm leading-relaxed text-ds-text-muted dark:text-slate-400'>
              Saisissez un terme ci-dessus. La recherche couvre les fiches fondamentaux,
              le référentiel des infractions, la banque QCM et les enquêtes pédagogiques.
            </p>
          </CardContent>
        </Card>
      )}

      {showNoHits && (
        <Card className='border-ds-border bg-ds-bg-elevated dark:border-slate-800 dark:bg-slate-900'>
          <CardContent className='flex flex-col items-center gap-3 px-6 py-12 text-center'>
            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-ds-bg-secondary text-ds-text-muted dark:bg-slate-800/80 dark:text-slate-500'>
              <Inbox className='h-7 w-7' aria-hidden />
            </div>
            <div className='space-y-1'>
              <p className='text-base font-medium text-ds-text-primary dark:text-slate-200'>Aucun résultat</p>
              <p className='max-w-md text-sm text-ds-text-muted dark:text-slate-400'>
                Aucun contenu ne correspond à « {query} ». Essayez un autre mot-clé,
                un numéro d&apos;article (ex. 62-2) ou une formulation plus courte.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {hasResults && (
        <div className='space-y-6'>
          {localResult && localResult.fiches.length > 0 ? (
            <LocalHitsCard
              title='Fiches fondamentaux'
              icon={<BookOpen className='h-4 w-4' aria-hidden />}
              hits={localResult.fiches}
            />
          ) : null}

          {localResult && localResult.quizzes.length > 0 ? (
            <LocalHitsCard
              title='Questions QCM'
              icon={<Sparkles className='h-4 w-4' aria-hidden />}
              hits={localResult.quizzes}
            />
          ) : null}

          {localResult && localResult.enquetes.length > 0 ? (
            <LocalHitsCard
              title='Enquêtes pédagogiques'
              icon={<FileSearch className='h-4 w-4' aria-hidden />}
              hits={localResult.enquetes}
            />
          ) : null}

          {supabaseResult && supabaseHits > 0 ? (
            <div className='grid gap-4 md:grid-cols-3'>
              <SupabaseResultCard
                title={`Questions Supabase (${supabaseResult.questions.length})`}
                items={supabaseResult.questions.map((item) => item.question)}
              />
              <SupabaseResultCard
                title={`Chapitres (${supabaseResult.chapitres.length})`}
                items={supabaseResult.chapitres.map((item) => item.titre)}
              />
              <SupabaseResultCard
                title={`Flashcards (${supabaseResult.flashcards.length})`}
                items={supabaseResult.flashcards.map((item) => item.recto)}
              />
            </div>
          ) : null}
        </div>
      )}
    </AccountDashboardSection>
  );
}

function LocalHitsCard({
  title,
  icon,
  hits,
}: {
  title: string;
  icon: React.ReactNode;
  hits: LocalSearchHit[];
}) {
  return (
    <Card className='bg-ds-bg-elevated dark:bg-slate-900'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-ds-text-primary dark:text-slate-100'>
          <span className='text-blue-600 dark:text-blue-400'>{icon}</span>
          <span>{title}</span>
          <span className='ml-auto rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300'>
            {hits.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-2'>
          {hits.map((hit) => (
            <li key={`${hit.type}-${hit.href}-${hit.title.slice(0, 32)}`}>
              <Link
                href={hit.href}
                className='group flex items-start gap-3 rounded-md border border-ds-border p-3 transition-colors hover:border-blue-400/50 hover:bg-blue-50/40 dark:border-slate-800 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/5'
              >
                <div className='min-w-0 flex-1 space-y-1'>
                  <p className='line-clamp-2 text-sm font-medium text-ds-text-primary group-hover:text-blue-700 dark:text-slate-100 dark:group-hover:text-blue-300'>
                    {hit.title}
                  </p>
                  {hit.excerpt ? (
                    <p className='line-clamp-2 text-xs text-ds-text-muted dark:text-slate-400'>{hit.excerpt}</p>
                  ) : null}
                  {hit.tag ? (
                    <p className='inline-block rounded bg-ds-bg-secondary px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-ds-text-muted dark:bg-slate-800 dark:text-slate-400'>
                      {hit.tag}
                    </p>
                  ) : null}
                </div>
                <ArrowUpRight
                  className='mt-1 h-4 w-4 shrink-0 text-ds-text-muted transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400'
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function SupabaseResultCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className='bg-ds-bg-elevated dark:bg-slate-900'>
      <CardHeader>
        <CardTitle className='text-ds-text-primary dark:text-slate-100'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-2 text-sm text-ds-text-muted dark:text-slate-300'>
          {items.slice(0, 8).map((text, index) => (
            <li
              key={`${title}-${index}-${text.slice(0, 48)}`}
              className='rounded-md border border-ds-border p-2 dark:border-slate-800'
            >
              {text}
            </li>
          ))}
          {items.length === 0 && (
            <li className='rounded-md border border-dashed border-ds-border p-3 text-ds-text-muted dark:border-slate-700 dark:text-slate-500'>
              Aucun élément dans cette catégorie.
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
