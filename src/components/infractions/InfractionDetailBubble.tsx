'use client';

import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { InfractionDetailContent } from '@/components/infractions/InfractionDetailContent';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { type InfractionCatalogItem } from '@/data/recapitulatif-data';
import { cn } from '@/utils/cn';

type Props = {
  item: InfractionCatalogItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Fiche infraction en modale « bulle » : focus révision, liens flashcards / récap / Légifrance.
 */
export function InfractionDetailBubble({ item, open, onOpenChange }: Props) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'left-[50%] top-[50%] max-h-[min(92vh,880px)] w-[min(100vw-1rem,720px)] translate-x-[-50%] translate-y-[-50%]',
          'overflow-y-auto rounded-[1.75rem] border border-amber-400/25 bg-gradient-to-b from-[#0f141f] via-[#0a0d14] to-[#06080d]',
          'p-0 shadow-[0_0_0_1px_rgba(251,191,36,0.1),0_32px_90px_-24px_rgba(0,0,0,0.8),0_0_60px_-18px_rgba(251,191,36,0.18)]',
          'sm:max-w-3xl',
        )}
      >
        <DialogTitle className='sr-only'>
          <FlashcardRichText text={item.infraction} inline />
        </DialogTitle>
        <div className='p-5 sm:p-8'>
          <InfractionDetailContent item={item} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
