import Link from 'next/link';

export function Footer() {
  return (
    <footer className='mt-auto border-t border-white/10 bg-navy-950'>
      <div className='mx-auto max-w-6xl px-4 py-12'>
        <div className='flex flex-col gap-8 md:flex-row md:items-start md:justify-between'>
          <div className='max-w-md space-y-2'>
            <p className='text-sm font-medium text-white'>ExamenOPJ.fr — La référence pour la préparation OPJ</p>
            <p className='text-sm text-gray-500'>Contenus pédagogiques indépendants — préparation concours OPJ</p>
          </div>
          <nav className='flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-400'>
            <Link href='/cours/modules' className='transition-colors hover:text-white'>
              Cours
            </Link>
            <Link href='/entrainement' className='transition-colors hover:text-white'>
              Entraînement
            </Link>
            <Link href='/fondamentaux' className='transition-colors hover:text-white'>
              Fondamentaux
            </Link>
            <Link href='/guide-revision-opj' className='transition-colors hover:text-white'>
              Guide révision
            </Link>
            <Link href='/a-propos' className='transition-colors hover:text-white'>
              À propos
            </Link>
            <Link href='/mentions-legales' className='transition-colors hover:text-white'>
              Mentions légales
            </Link>
            <Link href='/contact' className='transition-colors hover:text-white'>
              Contact
            </Link>
            <Link href='/cgv' className='transition-colors hover:text-white'>
              CGV
            </Link>
          </nav>
        </div>
        <p className='mt-10 border-t border-white/5 pt-8 text-center text-xs text-gray-600'>
          Copyright © {new Date().getFullYear()} ExamenOPJ.fr
        </p>
      </div>
    </footer>
  );
}
