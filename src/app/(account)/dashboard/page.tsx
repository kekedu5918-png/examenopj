import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getSession } from '@/features/account/controllers/get-session';
import { getModules } from '@/features/examenopj/controllers/get-dashboard-data';

export default async function DashboardPage() {
  const session = await getSession();
  const modules = await getModules();

  if (!session) {
    redirect('/login');
  }

  return (
    <section className='space-y-6 rounded-xl bg-slate-950 p-6'>
      <header>
        <h1 className='text-3xl font-bold text-slate-50'>Dashboard ExamenOPJ</h1>
        <p className='mt-2 text-slate-300'>Progression centralisee: modules, infractions, cours et simulations.</p>
      </header>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {[
          { titre: 'Infractions', href: '/dashboard/infractions' },
          { titre: 'Cours', href: '/dashboard/courses' },
          { titre: 'Fiches', href: '/dashboard/fiches' },
          { titre: 'Progression', href: '/dashboard/progression' },
          { titre: 'Recherche', href: '/dashboard/recherche' },
        ].map((item) => (
          <Button key={item.href} asChild variant='secondary' className='justify-start'>
            <Link href={item.href}>{item.titre}</Link>
          </Button>
        ))}
      </div>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {modules.map((module) => (
          <Card key={module.id} className='border-l-4 border-blue-500 bg-slate-900 shadow-md hover:shadow-xl'>
            <CardHeader>
              <CardTitle className='text-slate-100'>
                {module.slug} - {module.titre}
              </CardTitle>
              <CardDescription className='text-slate-300'>
                {module.description ?? 'Module officiel issu des fascicules ExamenOPJ.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className='bg-blue-600 hover:bg-blue-700'>
                <Link href='/dashboard/courses'>Ouvrir</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
