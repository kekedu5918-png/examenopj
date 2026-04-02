'use client';

import { useState, type ReactNode } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  PanelAuditionsConfrontations,
  PanelAvisObligatoires,
  PanelConstatationsTransport,
  PanelDiversCloture,
  PanelFouillesPerquisitions,
  PanelInterpellations,
  PanelPvTechniques,
} from './pv-cartouches-panels-extra';
import { PVCard, PVDivider, PVDroitsGroup, PVLine } from './pv-card';

const TAB_OPTIONS = [
  { value: 'saisines', label: 'Saisines' },
  { value: 'gav', label: 'Garde à vue' },
  { value: 'prolongation', label: 'Prolongation & fin de GAV' },
  { value: 'avis', label: 'Avis obligatoires' },
  { value: 'interpellations', label: 'Interpellations' },
  { value: 'constatations', label: 'Constatations & transport' },
  { value: 'fouilles', label: 'Fouilles & perquisitions' },
  { value: 'auditions', label: 'Auditions & confrontations' },
  { value: 'techniques', label: 'PV techniques' },
  { value: 'divers', label: 'Divers & clôture' },
] as const;

const tabTriggerClass =
  'shrink-0 rounded-lg px-2.5 py-2 text-[11px] leading-tight data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-gray-400 sm:px-3 sm:text-xs md:text-sm';

function AccBlock({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <AccordionItem value={id} className='border-white/10 px-1'>
      <AccordionTrigger className='text-left text-sm hover:no-underline md:text-base'>{title}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}

export function PVCartouchesSection() {
  const [tab, setTab] = useState<string>('saisines');

  return (
    <Tabs value={tab} onValueChange={setTab} className='w-full'>
      <div className='mb-4 md:hidden'>
        <label htmlFor='epreuve2-pv-category' className='mb-2 block text-xs font-medium text-gray-400'>
          Catégorie de PV
        </label>
        <select
          id='epreuve2-pv-category'
          value={tab}
          onChange={(e) => setTab(e.target.value)}
          className='w-full rounded-xl border border-white/15 bg-navy-900/90 px-3 py-3 text-sm text-white shadow-inner focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30'
        >
          {TAB_OPTIONS.map((o) => (
            <option key={o.value} value={o.value} className='bg-navy-900'>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <TabsList className='mb-6 hidden h-auto w-full min-w-0 flex-wrap justify-start gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1.5 md:flex'>
        {TAB_OPTIONS.map((o) => (
          <TabsTrigger key={o.value} value={o.value} className={tabTriggerClass}>
            {o.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value='saisines' className='mt-0 focus-visible:outline-none'>
        <Accordion type='single' collapsible className='w-full'>
          <AccBlock
            id='pv-1'
            title='Saisine / Plainte de Prénom NOM, contre X ou contre Prénom NOM'
          >
            <PVCard>
              <div className='space-y-2'>
                <PVLine m='Identité de la victime :' i='Nom, Prénom' />
                <PVLine m="Bref exposé des faits, éléments d'enquête permettant de qualifier l'infraction avec les circonstances aggravantes." />
                <PVLine m='Cadre juridique :' i='ex. Enquête de flagrance' />
                <PVLine m="Qualification de l'infraction (Q1, Q2)" i='avec CA' />
                <PVLine m='Information des organes.' />
                <PVLine m='Documents remis.' />
                <PVLine m='Droits à victime et mise en œuvre.' />
                <PVLine m='Avis parquet.' />
                <PVLine m='Avis hiérarchie.' />
                <PVLine m='Annexes :' i='certificat médical, facture, devis, etc.' />
              </div>
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-2' title='Saisine / Témoignage de Prénom NOM'>
            <PVCard>
              <div className='space-y-2'>
                <PVLine m='Identité du témoin' />
                <PVLine m="Bref exposé des faits, éléments d'enquête permettant de qualifier l'infraction." />
                <PVLine m='Cadre juridique.' />
                <PVLine m='Avis parquet.' />
                <PVLine m='Avis hiérarchie.' />
                <PVLine m='Annexes.' />
              </div>
            </PVCard>
          </AccBlock>
        </Accordion>
      </TabsContent>

      <TabsContent value='gav' className='mt-0 focus-visible:outline-none'>
        <Accordion type='single' collapsible className='w-full'>
          <AccBlock id='pv-3' title='Notification de placement en GAV — Majeur'>
            <PVCard>
              <div className='space-y-2'>
                <PVLine
                  m='À compter de JJ/MM/AA à … h'
                  i='(moment de son interpellation ou de sa présentation au service)'
                />
                <PVLine m="Infraction : Q1" i='selon le thème' />
                <PVLine m="Date et lieu présumés de l'infraction." />
                <PVLine m='Motif(s) :' i='art. 62-2 du C.P.P. (au moins 2 objectifs)' />
                <PVLine m='Durée maximale :' i='24 h + 24 h selon le thème' />
              </div>
              <PVDivider />
              <PVDroitsGroup
                title='Notification des droits'
                bullets={[
                  { m: 'Silence' },
                  { m: 'Interprète' },
                  { m: 'Avis personne de son choix / employeur / autorités consulaires' },
                  { m: 'Médecin' },
                  { m: 'Communiquer avec un tiers' },
                  { m: 'Consulter certaines pièces de procédure' },
                  { m: 'Présenter des observations au magistrat' },
                ]}
              />
              <PVDivider />
              <PVLine
                m='Si majeur protégé :'
                i='Avis à tuteur / curateur / mandataire spécial obligatoire'
              />
              <PVLine m='Remise du formulaire de déclaration des droits.' />
              <PVLine m='Recueil des demandes.' />
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-4' title='Notification de placement en retenue — Mineur 10-13 ans'>
            <PVCard>
              <div className='space-y-2'>
                <PVLine m="Crime ou délit puni d'au moins 5 ans." />
                <PVLine m='Accord préalable et sous le contrôle du magistrat.' />
                <PVLine m='Durée :' i='12 h + extension 12 h maximum' />
              </div>
              <PVDivider />
              <PVDroitsGroup
                title='Notification des droits'
                bullets={[
                  { m: 'Silence' },
                  { m: 'Interprète' },
                  { m: 'Avis responsable légal', i: 'obligatoire' },
                  { m: 'Médecin', i: 'obligatoire' },
                  { m: 'Avocat', i: 'obligatoire' },
                  { m: 'Droit au respect de la vie privée' },
                  { m: "Droit d'être détenu séparément des majeurs" },
                  { m: 'Communiquer, consulter pièces, observations au magistrat' },
                ]}
              />
              <PVDivider />
              <PVLine m='Remise du formulaire de déclaration des droits.' />
              <PVLine m='Recueil des demandes.' />
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-5' title='Notification de placement en GAV — Mineur 13-16 ans'>
            <PVCard>
              <div className='space-y-2'>
                <PVLine
                  m='Art. 62-2 du C.P.P.'
                  i='motifs — durée 24 h + 24 h (crime ou délit ≥ 5 ans)'
                />
                <PVLine m='Droits :' i="identiques à la retenue + préciser droits spécifiques mineurs" />
              </div>
              <PVDivider />
              <PVDroitsGroup
                title='Rappel — notification des droits (cf. retenue)'
                bullets={[
                  { m: 'Silence, interprète' },
                  { m: 'Responsable légal, médecin, avocat', i: 'Obligatoires' },
                  { m: 'Vie privée, séparation vis-à-vis des majeurs' },
                  { m: 'Communiquer, pièces, observations au magistrat' },
                ]}
              />
              <PVLine m='Remise du formulaire, recueil des demandes.' />
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-6' title='Notification de placement en GAV — Mineur 16-18 ans'>
            <PVCard>
              <div className='space-y-2'>
                <PVLine m='Art. 62-2 du C.P.P.' i='motifs — durée 24 h + 24 h selon thème' />
                <PVLine m='Droits identiques + spécificités 16-18 ans' i='selon thème' />
              </div>
              <PVDivider />
              <PVDroitsGroup
                title='Droits (adapter au thème)'
                bullets={[
                  { m: 'Silence, interprète' },
                  { m: 'Responsable légal, médecin, avocat', i: 'selon cadre' },
                  { m: 'Communiquer, consulter pièces, observations' },
                ]}
              />
              <PVLine m='Remise du formulaire, recueil des demandes.' />
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-7' title='Placement en GAV — Alcoolisé / Hospitalisé'>
            <PVCard>
              <div className='space-y-2'>
                <PVLine m='Notification des droits différée.' />
                <PVLine m='Justifier les circonstances insurmontables.' />
              </div>
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-8' title='Audition sur des faits distincts — Majeur'>
            <PVCard>
              <PVDroitsGroup
                title='Droits'
                bullets={[
                  { m: 'Silence' },
                  { m: 'Interprète' },
                  { m: 'Avocat' },
                  { m: 'Consultation du procès-verbal' },
                ]}
              />
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-9' title='Audition sur des faits distincts — Mineur'>
            <PVCard>
              <PVDroitsGroup
                title='Droits (maj.) + spécificités mineurs'
                bullets={[
                  { m: 'Silence, interprète, avocat' },
                  { m: 'Consultation PV' },
                  { m: 'Droits spécifiques mineurs', i: 'responsable légal, auditions adaptées, etc.' },
                ]}
              />
            </PVCard>
          </AccBlock>
        </Accordion>
      </TabsContent>

      <TabsContent value='prolongation' className='mt-0 focus-visible:outline-none'>
        <Accordion type='single' collapsible className='w-full'>
          <AccBlock id='pv-10' title='Prolongation de GAV — Majeur'>
            <PVCard>
              <div className='space-y-2'>
                <PVLine m='Présentation préalable au magistrat ou téléconsultation.' />
              </div>
              <PVDivider />
              <PVDroitsGroup
                title='Notification des droits'
                bullets={[
                  { m: 'Avocat', i: 'obligatoire' },
                  { m: 'Médecin', i: 'obligatoire' },
                ]}
              />
              <PVDivider />
              <PVLine m='Observations.' />
              <PVLine m='Annexes.' />
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-11' title='Prolongation retenue — Mineur 10-13 ans'>
            <PVCard>
              <PVLine m='Durée :' i='12 h maximum + objectifs de droits (cf. thème)' />
              <PVDivider />
              <PVDroitsGroup
                title='Droits — prolongation'
                bullets={[
                  { m: 'Avocat', i: 'obligatoire' },
                  { m: 'Médecin', i: 'obligatoire' },
                ]}
              />
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-12' title='Prolongation GAV — Mineur 13-16 ans'>
            <PVCard>
              <PVLine m='Durée :' i='24 h (crime ou délit ≥ 5 ans)' />
              <PVLine m="Présentation magistrat, motivations, droits — adapter au thème." />
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-13' title='Prolongation GAV — Mineur 16-18 ans'>
            <PVCard>
              <PVLine m='Durée :' i='24 h' />
              <PVLine m='Présentation préalable au magistrat' i='obligatoire' />
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-14' title='Notification déroulement et fin de GAV — Majeur'>
            <PVCard>
              <div className='space-y-2'>
                <PVLine m='Déroulement de la mesure, rappels.' />
                <PVLine
                  m='Diligences : avis personne, avocat, médecin'
                  i='dates et heures'
                />
                <PVLine m='Heure de fin.' />
                <PVLine
                  m='Destination :'
                  i='présentation au magistrat ou remise en liberté'
                />
              </div>
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-15' title='Notification déroulement et fin — Mineur'>
            <PVCard>
              <div className='space-y-2'>
                <PVLine m='Déroulement de la mesure adapté au mineur, rappels.' />
                <PVLine m='Diligences : avis responsable légal, avocat, médecin' i='dates et heures' />
                <PVLine m='Heure de fin.' />
                <PVLine m='Destination :' i='présentation magistrat ou mesure adaptée' />
              </div>
            </PVCard>
          </AccBlock>
        </Accordion>
      </TabsContent>

      <TabsContent value='avis' className='mt-0 focus-visible:outline-none'>
        <PanelAvisObligatoires />
      </TabsContent>

      <TabsContent value='interpellations' className='mt-0 focus-visible:outline-none'>
        <PanelInterpellations />
      </TabsContent>

      <TabsContent value='constatations' className='mt-0 focus-visible:outline-none'>
        <PanelConstatationsTransport />
      </TabsContent>

      <TabsContent value='fouilles' className='mt-0 focus-visible:outline-none'>
        <PanelFouillesPerquisitions />
      </TabsContent>

      <TabsContent value='auditions' className='mt-0 focus-visible:outline-none'>
        <PanelAuditionsConfrontations />
      </TabsContent>

      <TabsContent value='techniques' className='mt-0 focus-visible:outline-none'>
        <PanelPvTechniques />
      </TabsContent>

      <TabsContent value='divers' className='mt-0 focus-visible:outline-none'>
        <PanelDiversCloture />
      </TabsContent>
    </Tabs>
  );
}
