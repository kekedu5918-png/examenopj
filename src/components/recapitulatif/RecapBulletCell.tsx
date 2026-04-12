'use client';

import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { cn } from '@/utils/cn';
import { splitRecapElements } from '@/utils/recap-bullets';

/** Une ligne par sous-élément, avec une puce (les « / » du jeu de données sont éclatés côté split). */
export function RecapBulletCell({
  text,
  compact,
  density = 'default',
}: {
  text: string;
  compact?: boolean;
  /** `micro` : flashcards / aperçu dense (lisible d’un coup d’œil). */
  density?: 'default' | 'compact' | 'micro';
}) {
  const parts = splitRecapElements(text);
  if (parts.length === 0) {
    return <span className='text-gray-500'>—</span>;
  }
  const isMicro = density === 'micro';
  const isCompact = compact || density === 'compact' || isMicro;
  return (
    <ul
      className={cn(
        'list-none text-gray-200',
        isMicro ? 'space-y-0.5 text-[11px] leading-snug' : isCompact ? 'space-y-1 text-xs leading-snug' : 'space-y-2.5 text-sm leading-relaxed',
      )}
    >
      {parts.map((line, i) => (
        <li key={i} className='flex gap-1.5 align-top sm:gap-2'>
          <span
            className={cn(
              'mt-0.5 shrink-0 select-none text-emerald-400/90',
              isMicro ? 'text-[10px]' : '',
            )}
            aria-hidden
          >
            •
          </span>
          <div className='min-w-0'>
            <FlashcardRichText text={line} inline />
          </div>
        </li>
      ))}
    </ul>
  );
}
