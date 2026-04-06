import { redirect } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSession } from '@/features/account/controllers/get-session';
import {
  getFlashcardReviewSummary,
  getRecentQuizAttempts,
  getRevisionStats,
} from '@/features/examenopj/controllers/get-dashboard-data';

function formatQuizMode(row: { mode: string; fascicule_num: number | null; domain_key: string | null }): string {
  if ((row.mode === 'fascicule' || row.mode === 'module') && row.fascicule_num != null) {
    return `Thème F${String(row.fascicule_num).padStart(2, '0')}`;
  }
  if (row.mode === 'domain' && row.domain_key) {
    return `Domaine : ${row.domain_key}`;
  }
  if (row.mode === 'global') return 'Quiz global';
  return row.mode;
}

export default async function ProgressionPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const [stats, quizAttempts, flashSummary] = await Promise.all([
    getRevisionStats(session.user.id),
    getRecentQuizAttempts(session.user.id, 10),
    getFlashcardReviewSummary(session.user.id),
  ]);

  return (
    <section className='space-y-4 rounded-xl bg-slate-950 p-6'>
      <h1 className='text-2xl font-bold text-slate-50'>Statistiques et progression</h1>
      <p className='text-slate-300'>Suivi global de ton avancement et des révisions prioritaires.</p>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <StatCard title='Questions disponibles' value={`${stats.totalQuestions}`} />
        <StatCard title='Flashcards disponibles' value={`${stats.totalFlashcards}`} />
        <StatCard title='Révisions dues' value={`${stats.revisionDue}`} />
        <StatCard title='Maîtrisées (score ≥ 4)' value={`${stats.mastered}`} />
      </div>

      <Card className='bg-slate-900'>
        <CardHeader>
          <CardTitle className='text-slate-100'>Score moyen (révisions en base)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-4xl font-bold text-blue-300'>{stats.averageScore.toFixed(2)} / 5</div>
          <p className='mt-2 text-sm text-slate-300'>
            Basé sur les entrées <code className='rounded bg-slate-800 px-1 text-xs'>user_progress</code> liées aux
            questions et flashcards Supabase. Complète des sessions depuis le dashboard pour enrichir ces indicateurs.
          </p>
        </CardContent>
      </Card>

      <Card className='bg-slate-900'>
        <CardHeader>
          <CardTitle className='text-slate-100'>Flashcards synchronisées (compte)</CardTitle>
        </CardHeader>
        <CardContent>
          {flashSummary.totalCards === 0 ? (
            <p className='text-sm text-slate-400'>
              Aucune carte enregistrée en base. Révise sur la page <span className='text-slate-200'>Flashcards</span> en
              étant connecté(e) : chaque réponse est enregistrée (même clé carte + portée qu’en local).
            </p>
          ) : (
            <div className='space-y-3 text-sm text-slate-300'>
              <p>
                <span className='font-semibold text-slate-100'>{flashSummary.totalCards}</span> cartes classées au total
                (toutes portées confondues).
              </p>
              <ul className='grid grid-cols-3 gap-2 text-center'>
                <li className='rounded-lg bg-emerald-500/10 py-2 text-emerald-200'>
                  <span className='block text-lg font-bold'>{flashSummary.know}</span>
                  <span className='text-xs text-emerald-300/80'>Je sais</span>
                </li>
                <li className='rounded-lg bg-amber-500/10 py-2 text-amber-200'>
                  <span className='block text-lg font-bold'>{flashSummary.review}</span>
                  <span className='text-xs text-amber-300/80'>À revoir</span>
                </li>
                <li className='rounded-lg bg-rose-500/10 py-2 text-rose-200'>
                  <span className='block text-lg font-bold'>{flashSummary.dontKnow}</span>
                  <span className='text-xs text-rose-300/80'>Je ne sais pas</span>
                </li>
              </ul>
              {flashSummary.lastUpdated ? (
                <p className='text-xs text-slate-500'>
                  Dernière mise à jour : {new Date(flashSummary.lastUpdated).toLocaleString('fr-FR')}
                </p>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className='bg-slate-900'>
        <CardHeader>
          <CardTitle className='text-slate-100'>Derniers quiz (compte connecté)</CardTitle>
        </CardHeader>
        <CardContent>
          {quizAttempts.length === 0 ? (
            <p className='text-sm text-slate-400'>
              Aucune session enregistrée pour l’instant. Les parties terminées sur la page{' '}
              <span className='text-slate-200'>Quiz</span> sont enregistrées ici lorsque tu es connecté(e).
            </p>
          ) : (
            <ul className='space-y-3 text-sm text-slate-300'>
              {quizAttempts.map((row) => (
                <li
                  key={row.id}
                  className='flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-800 pb-3 last:border-0 last:pb-0'
                >
                  <span className='font-medium text-slate-200'>{formatQuizMode(row)}</span>
                  <span className='tabular-nums text-cyan-300'>
                    {row.score}/{row.total} ({Number(row.percent).toFixed(0)} %)
                  </span>
                  <span className='w-full text-xs text-slate-500'>
                    {row.created_at ? new Date(row.created_at).toLocaleString('fr-FR') : ''}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className='bg-slate-900'>
      <CardHeader>
        <CardTitle className='text-sm font-medium text-slate-300'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-3xl font-bold text-slate-100'>{value}</div>
      </CardContent>
    </Card>
  );
}
