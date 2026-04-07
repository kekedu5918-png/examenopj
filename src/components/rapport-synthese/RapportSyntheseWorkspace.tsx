'use client';

import { RapportModeleOfficielPanel } from '@/components/rapport-synthese/RapportModeleOfficielPanel';
import { RapportSyntheseAtelierClient } from '@/components/rapport-synthese/RapportSyntheseAtelierClient';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/** 3 modes : modèle officiel (lecture) | entraînement (atelier existant) | exemple corrigé (TODO fascicule). */
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
        <TabsContent value='entrainement' className='mt-6'>
          <RapportSyntheseAtelierClient />
        </TabsContent>
        <TabsContent value='corrige' className='mt-6'>
          <div className='rounded-xl border border-white/10 bg-examen-card p-6 text-sm text-examen-inkMuted'>
            <p className='font-semibold text-white'>Affaire VERT / VILLA — corrigé annoté</p>
            <p className='mt-3'>
              TODO (FASC B7_02_RAPP_SYNT_1024) : afficher ici le rapport de synthèse corrigé et annoté section par section (PDF
              officiel, 4 pages).
            </p>
            <p className='mt-4 text-xs text-slate-500'>
              Fichier de référence dans le dépôt : `reference/fascicules/rapport-de-synthese-officiel.pdf` — vérifier
              l’identité avec le fascicule B7 attendu en formation.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
