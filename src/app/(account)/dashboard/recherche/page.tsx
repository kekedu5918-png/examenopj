import { Inbox, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { searchLearningContent } from '@/features/examenopj/controllers/get-dashboard-data';

type Props = {
  searchParams?: {
    q?: string;
  };
};

export default async function RecherchePage({ searchParams }: Props) {
  const query = searchParams?.q?.trim() ?? '';
  const hasQuery = query.length > 0;

  const result = hasQuery ? await searchLearningContent(query) : null;

  const totalHits =
    result === null
      ? 0
      : result.questions.length + result.chapitres.length + result.flashcards.length;
  const hasResults = hasQuery && totalHits > 0;
  const showNoHits = hasQuery && totalHits === 0;

  return (
    <section className='space-y-4 rounded-xl bg-slate-950 p-6'>
      <h1 className='text-2xl font-bold text-slate-50'>Recherche globale</h1>
      <p className='text-slate-300'>Recherche rapide dans les cours, questions et flashcards.</p>

      <form method='get' action='/dashboard/recherche' className='flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-900 p-4 sm:flex-row sm:items-stretch'>
        <label htmlFor='dashboard-search-q' className='sr-only'>
          Terme de recherche
        </label>
        <input
          id='dashboard-search-q'
          name='q'
          type='search'
          defaultValue={query}
          placeholder='Rechercher une leçon, une infraction…'
          autoComplete='off'
          className='min-w-0 flex-1 rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20'
        />
        <Button type='submit' variant='secondary' className='shrink-0 gap-2 sm:w-auto' aria-label='Lancer la recherche'>
          <Search className='h-4 w-4' aria-hidden />
          Rechercher
        </Button>
      </form>

      {!hasQuery && (
        <Card className='border-dashed border-slate-700 bg-slate-900/80'>
          <CardContent className='flex flex-col items-center gap-3 px-6 py-10 text-center'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-400'>
              <Search className='h-6 w-6' aria-hidden />
            </div>
            <p className='max-w-md text-sm leading-relaxed text-slate-400'>
              Saisissez un terme ci-dessus pour lancer une recherche dans les questions, chapitres et flashcards.
            </p>
          </CardContent>
        </Card>
      )}

      {showNoHits && (
        <Card className='border-slate-800 bg-slate-900'>
          <CardContent className='flex flex-col items-center gap-3 px-6 py-12 text-center'>
            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-slate-800/80 text-slate-500'>
              <Inbox className='h-7 w-7' aria-hidden />
            </div>
            <div className='space-y-1'>
              <p className='text-base font-medium text-slate-200'>Aucun résultat</p>
              <p className='max-w-md text-sm text-slate-400'>
                Aucun contenu ne correspond à « {query} ». Essayez un autre mot-clé ou une formulation plus courte.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {hasResults && result !== null && (
        <div className='grid gap-4 md:grid-cols-3'>
          <ResultCard
            title={`Questions (${result.questions.length})`}
            items={result.questions.map((item) => item.question)}
          />
          <ResultCard
            title={`Chapitres (${result.chapitres.length})`}
            items={result.chapitres.map((item) => item.titre)}
          />
          <ResultCard
            title={`Flashcards (${result.flashcards.length})`}
            items={result.flashcards.map((item) => item.recto)}
          />
        </div>
      )}
    </section>
  );
}

function ResultCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className='bg-slate-900'>
      <CardHeader>
        <CardTitle className='text-slate-100'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-2 text-sm text-slate-300'>
          {items.slice(0, 8).map((text, index) => (
            <li key={`${title}-${index}-${text.slice(0, 48)}`} className='rounded-md border border-slate-800 p-2'>
              {text}
            </li>
          ))}
          {items.length === 0 && <li className='rounded-md border border-dashed border-slate-700 p-3 text-slate-500'>Aucun élément dans cette catégorie.</li>}
        </ul>
      </CardContent>
    </Card>
  );
}
