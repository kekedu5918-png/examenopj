'use client';

import { ModelePVOfficielLayout } from '@/components/modeles-pv/ModelePVOfficielLayout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { PieceJointe } from '@/data/sujets-rapport-synthese';
import { pieceJointeToModelePV } from '@/lib/piece-jointe-to-modele';

export function DossierPiecesAccordion({ pieces }: { pieces: PieceJointe[] }) {
  return (
    <Accordion type='multiple' className='w-full space-y-2'>
      {pieces.map((p, i) => {
        const modele = pieceJointeToModelePV(p, i);
        return (
          <AccordionItem
            key={`${p.numero}-${i}`}
            value={`piece-${i}`}
            className='rounded-xl border border-white/[0.08] bg-examen-card px-3'
          >
            <AccordionTrigger className='py-3 text-left text-sm font-semibold text-white hover:no-underline'>
              <span>
                {p.numero} — <span className='font-normal text-examen-inkMuted'>{p.type}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className='border-t border-white/[0.06] pb-4 pt-4'>
              <ModelePVOfficielLayout modele={modele} />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
