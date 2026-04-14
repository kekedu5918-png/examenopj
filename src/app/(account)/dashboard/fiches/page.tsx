import { AccountDashboardSection } from '@/components/account/AccountDashboardSection';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getLatestChapitres } from '@/features/examenopj/controllers/get-dashboard-data';

export default async function FichesPage() {
  const chapitres = await getLatestChapitres(24);

  return (
    <AccountDashboardSection>
      <h1 className='text-2xl font-bold text-ds-text-primary dark:text-slate-50'>Fiches synthetiques</h1>
      <p className='text-ds-text-muted dark:text-slate-300'>Synthese rapide par chapitre avec difficultes, articles et points de vigilance.</p>

      <div className='grid gap-4 md:grid-cols-2'>
        {chapitres.map((chapitre) => (
          <Card key={chapitre.id} className='bg-ds-bg-elevated dark:bg-slate-900'>
            <CardHeader className='flex flex-row items-center justify-between gap-3'>
              <CardTitle className='text-ds-text-primary dark:text-slate-100'>{chapitre.titre}</CardTitle>
              <Badge variant='secondary'>{chapitre.difficulte ?? 'moyen'}</Badge>
            </CardHeader>
            <CardContent className='space-y-2 text-sm text-ds-text-muted dark:text-slate-300'>
              <p>
                <span className='font-semibold text-ds-text-primary dark:text-slate-100'>Articles : </span>
                {chapitre.articles?.join(', ') || 'non renseignes'}
              </p>
              <p>
                <span className='font-semibold text-ds-text-primary dark:text-slate-100'>Pieges examen : </span>
                {chapitre.pieges_examen?.join(', ') || 'non renseignes'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AccountDashboardSection>
  );
}
