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
          'left-[50%] top-[50%] max-h-[min(88vh,820px)] w-[min(100vw-1.25rem,600px)] translate-x-[-50%] translate-y-[-50%]',
          'overflow-y-auto rounded-[1.75rem] border-2 border-amber-400/30 bg-gradient-to-b from-navy-900/98 via-navy-950 to-[#060a12]',
          'p-0 shadow-[0_0_0_1px_rgba(251,191,36,0.12),0_28px_80px_-20px_rgba(0,0,0,0.75),0_0_55px_-15px_rgba(251,191,36,0.22)]',
          'sm:max-w-2xl',
        )}
      >
        <DialogTitle className='sr-only'>
          <FlashcardRichText text={item.infraction} inline />
        </DialogTitle>
        <div className='p-5 sm:p-6'>
          <InfractionDetailContent item={item} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
