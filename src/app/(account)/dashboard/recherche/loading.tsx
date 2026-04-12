import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function RechercheLoading() {
  return (
    <section className='space-y-4 rounded-xl bg-slate-950 p-6'>
      <div className='h-8 w-48 animate-pulse rounded-md bg-slate-800' aria-hidden />
      <div className='h-4 w-full max-w-xl animate-pulse rounded-md bg-slate-800/80' aria-hidden />

      <div className='flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-900 p-4 sm:flex-row'>
        <div className='h-10 flex-1 animate-pulse rounded-md bg-slate-800' aria-hidden />
        <div className='h-10 w-full animate-pulse rounded-md bg-slate-800 sm:w-32' aria-hidden />
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        {[0, 1, 2].map((i) => (
          <Card key={i} className='border-slate-800 bg-slate-900'>
            <CardHeader>
              <div className='h-5 w-32 animate-pulse rounded bg-slate-800' aria-hidden />
            </CardHeader>
            <CardContent className='space-y-2'>
              {[0, 1, 2, 3].map((j) => (
                <div key={j} className='h-10 animate-pulse rounded-md bg-slate-800/70' aria-hidden />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <p className='sr-only'>Chargement des résultats de recherche…</p>
    </section>
  );
}
