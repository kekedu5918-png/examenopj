'use client';

import { RapportModeleOfficielPanel } from '@/components/rapport-synthese/RapportModeleOfficielPanel';
import { RapportSyntheseAtelierClient } from '@/components/rapport-synthese/RapportSyntheseAtelierClient';
import { RapportSyntheseCorrigePanel } from '@/components/rapport-synthese/RapportSyntheseCorrigePanel';
import { RapportSyntheseEntrainementStructured } from '@/components/rapport-synthese/RapportSyntheseEntrainementStructured';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/** 3 modes : modèle officiel (F16) | entraînement structuré + atelier libre | exemple annoté. */
export function RapportSyntheseWorkspace() {
  return (
    <div className='space-y-6'>
      <Tabs defaultValue='modele' className='w-full'>
        <TabsList className='grid h-auto w-full grid-cols-1 gap-2 bg-white/[0.04] p-2 sm:grid-cols-3'>
          <TabsTrigger value='modele' className='text-xs sm:text-sm'>
            Modèle officiel
          </TabsTrigger>
          <TabsTrigger value='entrainement' className='text-xs sm:text-sm'>
            Entraînement
          </TabsTrigger>
          <TabsTrigger value='corrige' className='text-xs sm:text-sm'>
            Exemple corrigé
          </TabsTrigger>
        </TabsList>
        <TabsContent value='modele' className='mt-6'>
          <RapportModeleOfficielPanel />
        </TabsContent>
        <TabsContent value='entrainement' className='mt-6 space-y-8'>
          <RapportSyntheseEntrainementStructured />
          <details className='rounded-xl border border-white/10 bg-examen-card p-4'>
            <summary className='cursor-pointer text-sm font-semibold text-examen-ink'>Atelier texte libre (brouillon)</summary>
            <div className='mt-4'>
              <RapportSyntheseAtelierClient />
            </div>
          </details>
        </TabsContent>
        <TabsContent value='corrige' className='mt-6'>
          <RapportSyntheseCorrigePanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
