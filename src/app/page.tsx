'use client';

export default function Home() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'>
      <div className='container mx-auto px-4 py-24'>
        <div className='text-center'>
          <h1 className='mb-8 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-6xl font-bold text-transparent'>
            ExamenOPJ.fr
          </h1>
          <p className='mx-auto mb-12 max-w-2xl text-2xl text-slate-300'>#1 plateforme revision habilitation OPJ 2026</p>
          <div className='space-x-4'>
            <a
              href='/login'
              className='rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-blue-700'
            >
              Commencer gratuitement
            </a>
            <a
              href='/about'
              className='rounded-xl border border-slate-600 px-8 py-4 font-semibold text-slate-300 hover:border-blue-500'
            >
              Decouvrir
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
