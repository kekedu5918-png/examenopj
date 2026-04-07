'use client';

import Link from 'next/link';

import { ArticulationExercice } from '@/components/entrainement/ArticulationExercice';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BRAVO_ARTICULATION_CARTOUCHES } from '@/data/enquetes/bravo-articulation-transcription';

type Props = {
  referenceEnqueteId?: string;
  suggestedTitre?: string;
};

/**
 * 3 modes : timeline interactive (exercice existant) | référence BRAVO | enquête incidente (TODO fascicule).
 * // TODO: FASC B0_ARTICUL_08242 — caler les 35 actes et couleurs timeline sur le PDF officiel.
 */
export function ArticulationWorkspace({ referenceEnqueteId, suggestedTitre }: Props) {
  return (
    <Tabs defaultValue='timeline' className='w-full'>
      <TabsList className='mb-6 grid h-auto w-full grid-cols-1 gap-2 bg-white/[0.04] p-2 lg:grid-cols-3'>
        <TabsTrigger value='timeline' className='text-xs sm:text-sm'>
          Flèche du temps (exercice)
        </TabsTrigger>
        <TabsTrigger value='bravo' className='text-xs sm:text-sm'>
          Modèle BRAVO
        </TabsTrigger>
        <TabsTrigger value='incident' className='text-xs sm:text-sm'>
          Enquête incidente
        </TabsTrigger>
      </TabsList>

      <TabsContent value='timeline' className='mt-0'>
        <p className='mb-4 text-xs text-examen-inkMuted'>
          Construisez vos cartouches comme sur une articulation papier. Les alertes de validation avancée (avis parquet,
          mineurs…) seront renforcées — TODO : F11 + B0_ARTICUL_08242.
        </p>
        <ArticulationExercice referenceEnqueteId={referenceEnqueteId} suggestedTitre={suggestedTitre} />
      </TabsContent>

      <TabsContent value='bravo' className='mt-0 space-y-4'>
        <p className='text-sm text-examen-inkMuted'>
          Référence : enquête <strong className='text-white'>BRAVO</strong> — {BRAVO_ARTICULATION_CARTOUCHES.length} actes
          retranscrits dans les données du site. Comparez avec le fascicule officiel d’articulation (35 actes).
        </p>
        <ol className='max-h-[min(60vh,480px)] list-decimal space-y-2 overflow-y-auto rounded-xl border border-white/10 bg-examen-card p-4 text-sm text-examen-ink'>
          {BRAVO_ARTICULATION_CARTOUCHES.map((c, i) => (
            <li key={`${c.cote}-${i}`} className='pl-1'>
              <span className='font-mono text-xs text-examen-accent'>{c.cote}</span> — {c.titre}
            </li>
          ))}
        </ol>
        <Link
          href='/cours/enquetes/bravo'
          className='inline-flex text-sm font-semibold text-examen-accent hover:underline'
        >
          Ouvrir la fiche enquête BRAVO →
        </Link>
        <p className='text-xs text-amber-200/90'>
          TODO (FASC B0_ARTICUL_08242.pdf) : annotations pédagogiques sur les actes clés (avis parquet, GAV, etc.).
        </p>
      </TabsContent>

      <TabsContent value='incident' className='mt-0'>
        <div className='rounded-xl border border-white/10 bg-examen-card p-6 text-sm text-examen-inkMuted'>
          <p className='font-semibold text-white'>Enquête incidente</p>
          <p className='mt-3'>
            TODO (FASC B0_ARTICUL_INCID_0723) : intégrer l’articulation incidente complète, explication du changement de cadre
            et de la numérotation.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
