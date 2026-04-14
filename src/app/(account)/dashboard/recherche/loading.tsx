import { AccountDashboardSection } from '@/components/account/AccountDashboardSection';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function RechercheLoading() {
  return (
    <AccountDashboardSection>
      <div className='h-8 w-48 animate-pulse rounded-md bg-ds-bg-elevated dark:bg-slate-800' aria-hidden />
      <div className='h-4 w-full max-w-xl animate-pulse rounded-md bg-ds-bg-secondary dark:bg-slate-800/80' aria-hidden />

      <div className='flex flex-col gap-2 rounded-lg border border-ds-border bg-ds-bg-elevated p-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row'>
        <div className='h-10 flex-1 animate-pulse rounded-md bg-ds-bg-secondary dark:bg-slate-800' aria-hidden />
        <div className='h-10 w-full animate-pulse rounded-md bg-ds-bg-secondary dark:bg-slate-800 sm:w-32' aria-hidden />
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        {[0, 1, 2].map((i) => (
          <Card key={i} className='border-ds-border bg-ds-bg-elevated dark:border-slate-800 dark:bg-slate-900'>
            <CardHeader>
              <div className='h-5 w-32 animate-pulse rounded bg-ds-bg-secondary dark:bg-slate-800' aria-hidden />
            </CardHeader>
            <CardContent className='space-y-2'>
              {[0, 1, 2, 3].map((j) => (
                <div key={j} className='h-10 animate-pulse rounded-md bg-ds-bg-secondary/80 dark:bg-slate-800/70' aria-hidden />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <p className='sr-only'>Chargement des résultats de recherche…</p>
    </AccountDashboardSection>
  );
}
