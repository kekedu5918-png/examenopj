import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getLatestChapitres } from '@/features/examenopj/controllers/get-dashboard-data';

export default async function FichesPage() {
  const chapitres = await getLatestChapitres(24);

  return (
    <section className='space-y-4 rounded-xl bg-slate-950 p-6'>
      <h1 className='text-2xl font-bold text-slate-50'>Fiches synthetiques</h1>
      <p className='text-slate-300'>Synthese rapide par chapitre avec difficultes, articles et points de vigilance.</p>

      <div className='grid gap-4 md:grid-cols-2'>
        {chapitres.map((chapitre) => (
          <Card key={chapitre.id} className='bg-slate-900'>
            <CardHeader className='flex flex-row items-center justify-between gap-3'>
              <CardTitle className='text-slate-100'>{chapitre.titre}</CardTitle>
              <Badge variant='secondary'>{chapitre.difficulte ?? 'moyen'}</Badge>
            </CardHeader>
            <CardContent className='space-y-2 text-sm text-slate-300'>
              <p>
                <span className='font-semibold text-slate-100'>Articles : </span>
                {chapitre.articles?.join(', ') || 'non renseignes'}
              </p>
              <p>
                <span className='font-semibold text-slate-100'>Pieges examen : </span>
                {chapitre.pieges_examen?.join(', ') || 'non renseignes'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
