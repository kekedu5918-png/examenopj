import { cn } from '@/utils/cn';

type Props = {
  className?: string;
  /** Taille du pictogramme (hauteur), le texte s’adapte. */
  size?: 'sm' | 'md';
};

/**
 * Logo marque : écusson / balance stylisée + texte ExamenOPJ.
 * SVG inline pour netteté à toute résolution.
 */
export function ExamenOpjLogo({ className, size = 'md' }: Props) {
  const h = size === 'sm' ? 28 : 34;
  const textClass = size === 'sm' ? 'text-base' : 'text-lg';

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)} aria-hidden={false}>
      <svg
        width={Math.round(h * 0.82)}
        height={h}
        viewBox='0 0 40 48'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='shrink-0 text-examen-accent'
        aria-hidden
      >
        <path
          d='M4 6L20 2L36 6V26C36 36.5 28 44.5 20 46C12 44.5 4 36.5 4 26V6Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinejoin='round'
          fill='rgba(79,110,247,0.12)'
        />
        <path d='M12 18H28' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
        <circle cx='14' cy='14' r='2.2' fill='currentColor' />
        <circle cx='26' cy='14' r='2.2' fill='currentColor' />
        <path
          d='M15.5 28L20 32L24.5 28'
          stroke='#d4a20b'
          strokeWidth='1.8'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <span className={cn('flex items-baseline gap-0.5 font-black tracking-tight text-white', textClass)}>
        <span>Examen</span>
        <span className='text-examen-accent'>OPJ</span>
      </span>
    </span>
  );
}
