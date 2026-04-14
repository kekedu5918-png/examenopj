import Link from 'next/link';

import { AccountDashboardSection } from '@/components/account/AccountDashboardSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getQuestionsPage } from '@/features/examenopj/controllers/get-dashboard-data';

type Props = {
  searchParams?: {
    page?: string;
    q?: string;
    difficulte?: string;
  };
};

function formatPedagogicalSource(raw: string | null): string {
  if (!raw) return 'N/A';
  const m = raw.trim().match(/^F(\d{1,2})$/i);
  if (m) return `Thème ${m[1]!.padStart(2, '0')}`;
  return raw;
}

export default async function InfractionsPage({ searchParams }: Props) {
  const page = Math.max(Number(searchParams?.page ?? '1') || 1, 1);
  const q = searchParams?.q?.trim() || '';
  const difficulte = searchParams?.difficulte?.trim() || '';
  const pageSize = 12;
  const { data: questions, total } = await getQuestionsPage({ page, pageSize, query: q, difficulte });
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);

  return (
    <AccountDashboardSection>
      <h1 className='text-2xl font-bold text-ds-text-primary dark:text-slate-50'>Infractions (MVP)</h1>
      <p className='text-ds-text-muted dark:text-slate-300'>Questions issues du référentiel importé en base Supabase.</p>
      <form className='grid gap-3 rounded-lg border border-ds-border bg-ds-bg-elevated p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-3'>
        <input
          name='q'
          defaultValue={q}
          placeholder='Rechercher une question...'
          className='rounded-md border border-ds-border bg-ds-bg-primary px-3 py-2 text-sm text-ds-text-primary dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'
        />
        <select
          name='difficulte'
          defaultValue={difficulte}
          className='rounded-md border border-ds-border bg-ds-bg-primary px-3 py-2 text-sm text-ds-text-primary dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'
        >
          <option value=''>Toutes difficultes</option>
          <option value='facile'>Facile</option>
          <option value='moyen'>Moyen</option>
          <option value='difficile'>Difficile</option>
        </select>
        <Button type='submit' className='bg-blue-600 hover:bg-blue-700'>
          Filtrer
        </Button>
      </form>
      <div className='grid gap-4 md:grid-cols-2'>
        {questions.map((item) => (
          <Card key={item.id} className='border-l-4 border-blue-500 bg-ds-bg-elevated dark:bg-slate-900'>
            <CardHeader>
              <CardTitle className='text-ds-text-primary dark:text-slate-100'>{item.question}</CardTitle>
              <CardDescription className='text-ds-text-muted dark:text-slate-300'>
                Repère : {formatPedagogicalSource(item.source_fascicule)} {item.article_ref ? `— ${item.article_ref}` : ''}
              </CardDescription>
            </CardHeader>
            <CardContent className='text-sm text-ds-text-primary dark:text-slate-200'>
              Reponse index: {item.reponse_correcte} - Niveau: {item.difficulte ?? 'moyen'}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className='flex items-center justify-between rounded-lg border border-ds-border bg-ds-bg-elevated p-4 dark:border-slate-800 dark:bg-slate-900'>
        <span className='text-sm text-ds-text-muted dark:text-slate-300'>
          Page {page} / {totalPages} ({total} resultats)
        </span>
        <div className='flex gap-2'>
          {page <= 1 ? (
            <Button variant='secondary' disabled>
              Precedent
            </Button>
          ) : (
            <Button asChild variant='secondary'>
              <Link href={`/dashboard/infractions?page=${Math.max(page - 1, 1)}&q=${encodeURIComponent(q)}&difficulte=${encodeURIComponent(difficulte)}`}>
                Precedent
              </Link>
            </Button>
          )}
          {page >= totalPages ? (
            <Button variant='secondary' disabled>
              Suivant
            </Button>
          ) : (
            <Button asChild variant='secondary'>
              <Link href={`/dashboard/infractions?page=${Math.min(page + 1, totalPages)}&q=${encodeURIComponent(q)}&difficulte=${encodeURIComponent(difficulte)}`}>
                Suivant
              </Link>
            </Button>
          )}
        </div>
      </div>
    </AccountDashboardSection>
  );
}
