import { redirect } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSession } from '@/features/account/controllers/get-session';
import { getRevisionStats } from '@/features/examenopj/controllers/get-dashboard-data';

export default async function ProgressionPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const stats = await getRevisionStats(session.user.id);

  return (
    <section className='space-y-4 rounded-xl bg-slate-950 p-6'>
      <h1 className='text-2xl font-bold text-slate-50'>Statistiques et progression</h1>
      <p className='text-slate-300'>Suivi global de ton avancement et des revisions prioritaires.</p>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <StatCard title='Questions disponibles' value={`${stats.totalQuestions}`} />
        <StatCard title='Flashcards disponibles' value={`${stats.totalFlashcards}`} />
        <StatCard title='Revisions dues' value={`${stats.revisionDue}`} />
        <StatCard title='Maitrisees (score >= 4)' value={`${stats.mastered}`} />
      </div>

      <Card className='bg-slate-900'>
        <CardHeader>
          <CardTitle className='text-slate-100'>Score moyen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-4xl font-bold text-blue-300'>{stats.averageScore.toFixed(2)} / 5</div>
          <p className='mt-2 text-sm text-slate-300'>
            Ce score se base sur les resultats `user_progress`. Mets a jour regulierement tes sessions de revision.
          </p>
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
