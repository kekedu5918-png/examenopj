'use client';

import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { cn } from '@/utils/cn';
import { splitRecapElements } from '@/utils/recap-bullets';

/** Une ligne par sous-élément, avec une puce (les « / » du jeu de données sont éclatés côté split). */
export function RecapBulletCell({ text, compact }: { text: string; compact?: boolean }) {
  const parts = splitRecapElements(text);
  if (parts.length === 0) {
    return <span className='text-gray-500'>—</span>;
  }
  return (
    <ul className={cn('list-none text-gray-200', compact ? 'space-y-1 text-xs' : 'space-y-2.5 text-sm')}>
      {parts.map((line, i) => (
        <li key={i} className='flex gap-2 align-top'>
          <span className='mt-0.5 shrink-0 select-none text-emerald-400/90' aria-hidden>
            •
          </span>
          <div className={cn('min-w-0', compact ? 'leading-snug' : 'leading-relaxed')}>
            <FlashcardRichText text={line} inline />
          </div>
        </li>
      ))}
    </ul>
  );
}
