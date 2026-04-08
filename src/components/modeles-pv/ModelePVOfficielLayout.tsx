import { PVRenderer } from '@/components/pv/PVRenderer';
import type { ModelePV } from '@/types/pv';
import { cn } from '@/utils/cn';

/** Rendu officiel SDCP — wrapper pour affichage embarqué (sheet, pièces). */
export function ModelePVOfficielLayout({ modele, className }: { modele: ModelePV; className?: string }) {
  return (
    <PVRenderer modele={modele} variant='embed' canCopyFull className={cn(className)} />
  );
}
