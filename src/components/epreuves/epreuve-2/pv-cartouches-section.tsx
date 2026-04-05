'use client';

import { type ReactNode,useState } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  PVAnnexes,
  PVCard,
  PVDivider,
  PVDroitsGroup,
  PVItalicBullet,
  PVLine,
  PVRecueilDemandes,
} from './pv-card';
import {
  PanelAuditionsConfrontations,
  PanelAvisObligatoires,
  PanelConstatationsTransport,
  PanelDiversCloture,
  PanelFouillesPerquisitions,
  PanelInterpellations,
  PanelPvTechniques,
} from './pv-cartouches-panels-extra';

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

export type PVTabValue = (typeof TAB_OPTIONS)[number]['value'];

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

type PVCartouchesSectionProps = { lockCategory?: PVTabValue };

export function PVCartouchesSection({ lockCategory }: PVCartouchesSectionProps = {}) {
  const [tab, setTab] = useState<string>(lockCategory ?? 'saisines');
  const active = lockCategory ?? tab;
  const showNav = !lockCategory;

  return (
    <Tabs value={active} onValueChange={showNav ? setTab : () => {}} className='w-full'>
      {showNav ? (
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
      ) : null}

      {showNav ? (
        <TabsList className='mb-6 hidden h-auto w-full min-w-0 flex-wrap justify-start gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1.5 md:flex'>
          {TAB_OPTIONS.map((o) => (
            <TabsTrigger key={o.value} value={o.value} className={tabTriggerClass}>
              {o.label}
            </TabsTrigger>
          ))}
        </TabsList>
      ) : null}

      <TabsContent value='saisines' className='mt-0 focus-visible:outline-none'>
        <Accordion type='single' collapsible className='w-full'>
          <AccBlock
            id='pv-1'
            title='Saisine / Plainte de Prénom NOM, contre X ou contre Prénom NOM'
          >
            <PVCard titre='Saisine / Plainte de Prénom NOM, contre X ou contre Prénom NOM'>
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
            <PVCard titre='Saisine / Témoignage de Prénom NOM'>
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
            <PVCard titre='Notification de placement en GAV — Majeur'>
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
              <PVRecueilDemandes />
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-4' title='Notification de placement en retenue — Mineur 10-13 ans'>
            <PVCard titre='Notification de placement en retenue — Mineur 10-13 ans'>
              <div className='space-y-2'>
                <PVLine
                  m='À compter de JJ/MM/AA à … h'
                  i='(moment de son interpellation ou de sa présentation au service d’enquête)'
                />
                <PVLine m='Qualification provisoire :' i='crime ou délit puni d’au moins 5 ans d’emprisonnement (vérifier le fascicule / texte en vigueur)' />
                <PVLine m="Date et lieu présumés de l'infraction." />
                <PVLine
                  m='Mesure : placement en retenue (mineur ne pouvant être placé en garde à vue)'
                  i='autorisation / contrôle du magistrat ; durée maximale 12 h, prolongation exceptionnelle 12 h (demande motivée)'
                />
                <PVLine
                  m='Hébergement :'
                  i='lieu adapté au mineur, séparation effective des majeurs ; mentionner les diligences réalisées pour l’accueil du représentant légal et le respect du sommeil / restauration (indiquer sur le PV sans inventer si non constaté à ce stade).'
                />
              </div>
              <PVDivider />
              <PVDroitsGroup
                title='Notification des droits (mineur — mêmes familles que le majeur, effectifs renforcés)'
                bullets={[
                  { m: 'Droit au silence ; interprète si besoin', i: 'notifier de manière adaptée à l’âge' },
                  { m: 'Avis au représentant légal', i: 'dès que possible — assistance obligatoire en audition/CPI' },
                  { m: 'Avis à avocat', i: 'obligatoire — commis d’office par le Bâtonnier si aucun choix' },
                  {
                    m: 'Visite du médecin',
                    i: 'obligatoire avant toute audition qui peut nuire — relever équivalence matinale / retard',
                  },
                  { m: 'Droit au respect de la vie privée ; image à protéger' },
                  { m: 'Détenu séparément des majeurs' },
                  { m: 'Communiquer avec un tiers, consulter les pièces utiles, présenter observations au magistrat', i: 'selon texte' },
                ]}
              />
              <PVDivider />
              <PVLine m='Remise du formulaire de notification des droits ; le mineur est invité à signer l’avis de son représentant légal dès notification.' />
              <PVRecueilDemandes />
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-5' title='Notification de placement en GAV — Mineur 13-16 ans'>
            <PVCard titre='Notification de placement en GAV — Mineur 13-16 ans'>
              <div className='space-y-2'>
                <PVLine
                  m='À compter de JJ/MM/AA à … h'
                  i='(interpellation ou présentation au service — retenir l’heure exacte du placement effectif)'
                />
                <PVLine m='Infraction :' i='qualification provisoire Q1 — au moins un crime ou délit puni d’au moins 5 ans ou hypothèse du thème' />
                <PVLine m="Date et lieu présumés des faits ; identité et qualité du mineur ; lien avec l'enquête." />
                <PVLine
                  m='Motif(s) au sens de l’article 62-2 C.P.P.'
                  i='au moins deux finalités parmi : sauvegarde des preuves, identification des coauteurs / complices, empêcher pression sur témoins ou victimes, protection de la personne, cessation de l’infraction, autres motifs légaux retenus dans le thème'
                />
                <PVLine m='Durée maximale initiale : 24 h' i='prolongation 24 h supplémentaires (autorisation du magistrat, motifs au 62-2) si cadre du thème' />
                <PVLine
                  m='En parallèle des avis :'
                  i='inscrire la présence du mineur sur le registre de garde à vue ; consigner les téléprocédures / audiovisuel si utilisés.'
                />
              </div>
              <PVDivider />
              <PVDroitsGroup
                title='Notification des droits'
                bullets={[
                  { m: 'Silence ; interprète' },
                  { m: 'Représentant légal', i: 'avisé sans délai opérationnel ; rester disponible pour concerter avec l’avocat' },
                  { m: 'Médecin', i: 'obligatoire dans les délais ; mentionner heure et refus éventuel motivé' },
                  { m: 'Avocat', i: 'obligatoire — commis d’office si besoin ; entretien confidentiel' },
                  { m: 'Vie privée ; hébergement hors des lieux de GAV des majeurs' },
                  { m: 'Communiquer, consulter pièces, observations au magistrat' },
                ]}
              />
              <PVDivider />
              <PVLine m='Remise du formulaire CERFA / notice des droits complétée et signée dans les formes.' />
              <PVRecueilDemandes />
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-6' title='Notification de placement en GAV — Mineur 16-18 ans'>
            <PVCard titre='Notification de placement en GAV — Mineur 16-18 ans'>
              <div className='space-y-2'>
                <PVLine m='À compter de JJ/MM/AA à … h' i='heure de début de la mesure' />
                <PVLine m='Infraction : Q1' i='selon thème' />
                <PVLine m="Date et lieu prévus ; âge du mineur (16–18 ans) et situation familiale utile à l'enquête." />
                <PVLine m='Motifs article 62-2 C.P.P.' i='deux objectifs minimum comme pour le majeur ; citer la conduite à tenir si changement de qualification' />
                <PVLine m='Durée : 24 h + 24 h' i='présentation au magistrat avant prolongation ; relever toute dispense / géolocalisation si thème' />
                <PVLine
                  m='Représentation :'
                  i='le mineur peut être entendu seul à partir de 16 ans dans les conditions du texte — mais notifier les droits et les avis comme pour le groupe 13-16 si le thème impose encore la présence du représentant légal ; ne pas improviser : suivre l’énoncé.'
                />
              </div>
              <PVDivider />
              <PVDroitsGroup
                title='Notification des droits (alignée sur la GAV majeure + protections mineurs)'
                bullets={[
                  { m: 'Silence, interprète' },
                  { m: 'Représentant légal / personne habilitée', i: 'selon énoncé du sujet et tranche d’âge' },
                  { m: 'Médecin — obligatoire' },
                  { m: 'Avocat — obligatoire (entretien confidentiel)' },
                  { m: 'Vie privée, lieu de rétention adapté' },
                  { m: 'Communiquer, consulter pièces, observations au magistrat' },
                ]}
              />
              <PVDivider />
              <PVLine m='Formulaire de droits remis ; consigner la compréhension du mineur et toute assistance du représentant légal.' />
              <PVRecueilDemandes />
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-7' title='Placement en GAV — Alcoolisé / Hospitalisé'>
            <PVCard titre='Placement en GAV — Alcoolisé / Hospitalisé'>
              <div className='space-y-2'>
                <PVLine m='Notification des droits différée.' />
                <PVLine m='Justifier les circonstances insurmontables.' />
              </div>
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-8' title='Audition sur des faits distincts — Majeur'>
            <PVCard titre='Audition sur des faits distincts — Majeur'>
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
            <PVCard titre='Audition sur des faits distincts — Mineur'>
              <div className='space-y-2'>
                <PVLine m='Cadre :' i='libre ou, si la personne est en GAV/retenue, audition au sein de la mesure ; rappeler la qualification distincte des faits entendus.' />
                <PVLine m='Représentation obligatoire :' i='parent / titulaire de l’autorité parentale / représentant légal ou personne désignée selon le C.P.P. — jamais d’audition contradictoire sans cette présence sauf exemption expresse du texte.' />
              </div>
              <PVDivider />
              <PVDroitsGroup
                title='Notification préalable (compléter le PV d’audition)'
                bullets={[
                  { m: 'Qualité OPJ ; objet de l’audition (faits distincts)' },
                  { m: 'Droit au silence ; absence de valeur probante défavorable si silence' },
                  { m: 'Assistance d’un avocat (commis d’office si besoin)' },
                  { m: 'Interprète si la langue est inconnue' },
                  { m: 'Accès au dossier utile / copie des pièces selon le stade' },
                  {
                    m: 'Pour mineur victime d’infractions sexuelles :',
                    i: 'personne qualifiée + psychologue ou personne compétente si le texte / le thème l’exigent — ne pas paraphraser : citer le fascicule',
                  },
                ]}
              />
            </PVCard>
          </AccBlock>
        </Accordion>
      </TabsContent>

      <TabsContent value='prolongation' className='mt-0 focus-visible:outline-none'>
        <Accordion type='single' collapsible className='w-full'>
          <AccBlock id='pv-10' title='Notification de prolongation de GAV — Majeur'>
            <PVCard titre='Notification de prolongation de GAV (Majeur)'>
              <div className='space-y-2'>
                <PVLine m='À compter de' i='JJ/MM/AA à h' />
                <PVLine m='Motif(s) : art. 62-2 du C.P.P. ou 803-3 C.P.P.' />
                <PVLine m='Durée' i='ex. 24h' />
                <PVLine m='Présentation préalable à magistrat' i='selon le thème' />
                <PVItalicBullet
                  indent={1}
                  text='(Téléconsultation possible sur autorisation ou magistrat libéré / géolocalisation)'
                />
              </div>
              <PVDivider />
              <PVDroitsGroup
                title='Notification des droits'
                bullets={[
                  { m: 'Avocat — Obligatoire' },
                  { m: 'Médecin — Obligatoire' },
                  { i: '(géolocalisation)', sub: true },
                ]}
              />
              <PVDivider />
              <PVLine m='Observations remise au magistrat' i='(le cas échéant)' />
              <PVRecueilDemandes />
              <PVAnnexes detail='Demande et autorisation de prolongation' />
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-11' title='Prolongation retenue — Mineur 10-13 ans'>
            <PVCard titre='Prolongation retenue — Mineur 10-13 ans'>
              <div className='space-y-2'>
                <PVLine m='Demande motivée au magistrat :' i='impossibilité d’achever les actes utiles dans le délai initial ; absence d’alternative moins contraignante' />
                <PVLine m='Décision écrite ou mentionnée sur pièce jointe :' i='prolongation de 12 h au plus — relever l’heure de fin théorique' />
                <PVLine
                  m='Redit des droits :'
                  i="ré-assurer avocat et médecin ; si entretien avec l'avocat n'a pu avoir lieu, le mentionner et proposer un nouveau créneau"
                />
              </div>
              <PVDivider />
              <PVDroitsGroup
                title='Droits — prolongation'
                bullets={[
                  { m: 'Avocat — présent ou joignable ; commis d’office' },
                  { m: 'Médecin — visite si délai supérieur aux prescriptions médicales' },
                  { m: 'Représentant légal tenu informé de la prolongation et de ses motifs' },
                ]}
              />
              <PVAnnexes detail='Copie de la demande et de l’autorisation de prolongation' />
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-12' title='Prolongation GAV — Mineur 13-16 ans'>
            <PVCard titre='Prolongation GAV — Mineur 13-16 ans'>
              <div className='space-y-2'>
                <PVLine m='Présentation préalable au magistrat :' i='audition contradictoire ou selon modalités du thème (visio, magistrat désigné)' />
                <PVLine m='Motivation au 62-2 C.P.P. :' i='rappeler les deux objectifs initiaux et l’évolution de l’enquête (témoins supplémentaires, scellés numériques, etc.)' />
                <PVLine m='Durée complémentaire :' i='24 h maximum — noter nouvelle échéance' />
                <PVLine m='Notification avocat + médecin + représentant légal :' i='horodatage des appels / convocations' />
              </div>
              <PVDivider />
              <PVDroitsGroup
                title='Redoublement des garanties'
                bullets={[
                  { m: 'Nouvel entretien avocat si la prolongation excède le délai raisonnable fixé par le thème' },
                  { m: 'Repos et collation adaptés au mineur' },
                ]}
              />
              <PVAnnexes detail='Ordonnance ou procès-verbal de prolongation' />
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-13' title='Prolongation GAV — Mineur 16-18 ans'>
            <PVCard titre='Prolongation GAV — Mineur 16-18 ans'>
              <div className='space-y-2'>
                <PVLine m='Identiques au schéma 13-16 ans :' i='magistrat saisi avant la seconde tranche de 24 h' />
                <PVLine m='Si le mineur est traité comme quasi-majeur dans l’énoncé :' i='conserver néanmoins les mentions d’hébergement et d’avis représentant si le sujet l’impose' />
                <PVLine m='Fin de mesure :' i='présentation au parquet ou mise en liberté avec notification des suites (convocation, rappel des droits)' />
              </div>
              <PVAnnexes detail='PV de prolongation et pièces associées' />
            </PVCard>
          </AccBlock>

          <AccBlock
            id='pv-14'
            title='Notification déroulement et fin de GAV — Majeur (MAFSA)'
          >
            <PVCard titre='Notification déroulement et fin de GAV (Majeur) — MAFSA'>
              <div className='space-y-2'>
                <PVLine m='Déroulement chronologique de la mesure' i='heures réelles de placement, auditions, entretiens, transferts' />
                <PVLine m='Rappels des droits notifiés en début de mesure' />
                <PVLine m='Diligences pour garantir les droits (dans l’ordre procédural logique) :' />
                <PVLine
                  m='1) Avis au représentant légal ou à la personne de confiance'
                  i='date et heure — mode (téléphone, présentation, OPJ relais)'
                  indent={2}
                />
                <PVLine
                  m='2) Avis avocat (barreau de …) pour faits de …'
                  i='heure de la convocation ; mention du commis d’office et contact pris avec le cabinet'
                  indent={2}
                />
                <PVLine
                  m='3) Avis personne de son choix / employeur / autorités consulaires (si applicable)'
                  i='date et heure'
                  indent={2}
                />
                <PVLine m='4) Avis médecin' i='date et heure de la visite — apte / inapte avec suites' indent={2} />
                <PVLine m='Heure de fin de la mesure' i='h' />
                <PVLine
                  m='Destination de l’intéressé'
                  i='Présentation magistrat ou remise en liberté (selon le thème)'
                />
              </div>
            </PVCard>
          </AccBlock>

          <AccBlock id='pv-15' title='Notification déroulement et fin — Mineur'>
            <PVCard titre='Notification déroulement et fin — Mineur'>
              <div className='space-y-2'>
                <PVLine
                  m='Déroulement :'
                  i='reprendre les créneaux comme pour le majeur (MAFSA), mais en précisant chaque contact avec le représentant légal, l’école ou le service social si le thème l’exige'
                />
                <PVLine
                  m='Ordre des avis (identique au majeur, avec mentions spécifiques) :'
                  i='(1) représentant légal — (2) avocat (y compris commis) — (3) médecin — (4) tiers autorisés — consigner les échecs de joindre et les relances'
                />
                <PVLine m='Heure de fin de la mesure :' i='libération, présentation au parquet / JAP ou remise aux services éducatifs selon l’énoncé' />
                <PVLine m='État du mineur à la levée :' i='fatigue, besoin de soin, restitution des effets personnels' />
                <PVLine m='Suite donnée :' i='PV de clôture joints ; information du procureur / magistrat désigné' />
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
