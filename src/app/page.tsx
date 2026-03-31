import Link from 'next/link';

import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';

export default async function HomePage() {
  return (
    <div className='flex flex-col gap-8 lg:gap-20'>
      <HeroSection />
      <StatsSection />
      <ModulesPreviewSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section>
      <Container className='rounded-xl border border-blue-900/50 bg-slate-950 px-6 py-14 lg:px-12 lg:py-20'>
        <div className='flex flex-col gap-6 lg:max-w-3xl'>
          <div className='w-fit rounded-full border border-blue-500/40 bg-blue-900/40 px-4 py-1'>
            <span className='text-xs font-semibold uppercase tracking-wide text-blue-100'>ExamenOPJ 2026</span>
          </div>
          <h1 className='text-4xl font-bold tracking-tight text-slate-50 lg:text-6xl'>Preparez OPJ 2026 avec une methode fiable</h1>
          <p className='max-w-2xl text-base text-slate-200 lg:text-lg'>
            Modules structures, infractions sourcees CPP et entrainement QCM chronometre. Travaillez chaque jour sur
            les points qui font la difference a l&apos;examen.
          </p>
          <div className='flex flex-wrap gap-3'>
            <Button asChild className='bg-blue-600 px-6 py-3 text-white hover:bg-blue-700'>
              <Link href='/signup'>Commencer gratuitement</Link>
            </Button>
            <Button asChild variant='secondary'>
              <Link href='/dashboard'>Voir le dashboard</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StatsSection() {
  return (
    <section className='grid gap-4 md:grid-cols-3'>
      <StatCard label='Fascicules officiels' value='19' />
      <StatCard label='Objectif de reussite' value='+40%' />
      <StatCard label='Public vise 2026' value='5000+ agents' />
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className='rounded-xl border-l-4 border-blue-500 bg-slate-50 p-6 text-slate-900 shadow-md transition-shadow hover:shadow-xl'>
      <div className='text-3xl font-bold'>{value}</div>
      <p className='mt-2 text-sm font-medium text-slate-700'>{label}</p>
    </div>
  );
}

function ModulesPreviewSection() {
  return (
    <section className='rounded-xl bg-slate-950 p-6 lg:p-10'>
      <h2 className='text-2xl font-bold text-slate-50'>Parcours de preparation</h2>
      <p className='mt-2 max-w-2xl text-slate-300'>
        Le dashboard centralise modules, infractions, cours et simulations QCM avec progression individualisee.
      </p>
      <div className='mt-6 grid gap-4 md:grid-cols-2'>
        {[
          'Module _00 Strategie',
          'Procedure penale',
          'Infractions contre les personnes',
          'QCM avec feedback article CPP',
        ].map((item) => (
          <div key={item} className='rounded-lg border border-slate-800 bg-slate-900 p-4 text-slate-100'>
            {item}
          </div>
        ))}
      </div>
      <div className='mt-6'>
        <Button asChild className='bg-blue-600 px-6 py-3 hover:bg-blue-700'>
          <Link href='/dashboard'>Acceder au dashboard</Link>
        </Button>
      </div>
    </section>
  );
}
