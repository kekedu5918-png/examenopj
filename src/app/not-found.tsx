import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center'>
      <p className='text-sm font-semibold uppercase tracking-wide text-cyan-400'>404</p>
      <h1 className='mt-3 font-display text-2xl font-bold text-white md:text-3xl'>
        Page introuvable
      </h1>
      <p className='mt-3 max-w-md text-sm text-gray-400'>
        Cette page n&apos;existe pas ou a été déplacée. Vérifiez l&apos;URL ou retournez à l&apos;accueil.
      </p>
      <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
        <Link
          href='/'
          className='rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500'
        >
          Accueil
        </Link>
        <Link
          href='/dashboard'
          className='rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10'
        >
          Mon tableau de bord
        </Link>
      </div>
    </div>
  );
}
