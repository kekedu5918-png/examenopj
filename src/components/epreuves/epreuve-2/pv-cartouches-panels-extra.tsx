'use client';

import type { ReactNode } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AUDITION_EXTRA_CARTOUCHES } from '@/data/cartouches-data';

import { PVCard, PVCartoucheFromDef, PVDivider, PVLine, PVNote } from './pv-card';

function AccBlock({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <AccordionItem value={id} className='border-white/10 px-1'>
      <AccordionTrigger className='text-left text-sm hover:no-underline md:text-base'>{title}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}

export function PanelAvisObligatoires() {
  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccBlock id='pv-16' title='Avis Parquet'>
        <PVCard titre='Avis Parquet'>
          <div className='space-y-2'>
            <PVLine m='Motif de rappel :' i='GAV de Prénom NOM' />
            <PVLine m='Placement Q1' i='selon le thème' />
            <PVLine m='Date et lieu présumés des faits.' />
            <PVLine m='Motifs' i='art. 62-2 du C.P.P.' />
            <PVLine m="Demandes spécifiques de l'OPJ." />
          </div>
          <PVDivider />
          <PVNote>
            Un avis global est accepté en cas de GAV multiples.
          </PVNote>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-17' title='Avis représentant légal (mineur 10-16 ans)'>
        <PVCard titre='Avis représentant légal (mineur 10-16 ans)'>
          <div className='space-y-2'>
            <PVLine m='Placement en GAV de Prénom NOM.' />
            <PVLine m='Infraction.' />
            <PVLine m='Date et lieu présumés.' />
            <PVLine m='Motifs' i='art. 62-2 du C.P.P.' />
            <PVLine m="Informé que le mineur doit être assisté d'un avocat." />
            <PVLine
              m='Informé de son droit à demander un avocat'
              i="si le mineur n'en a pas"
            />
            <PVLine m="Informé de son droit à demander un examen médical." />
            <PVLine m='Recueil des demandes.' />
          </div>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-18' title='Avis représentant légal (mineur 16-18 ans)'>
        <PVCard titre='Avis représentant légal (mineur 16-18 ans)'>
          <PVLine m='Mêmes éléments que pour 10-16 ans,' i='adaptés à la tranche 16-18 ans' />
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-19' title='Avis aux autorités consulaires (mineur uniquement)'>
        <PVCard titre='Avis aux autorités consulaires (mineur uniquement)'>
          <PVLine m='Formalités et mentions' i='selon le thème et la nationalité' />
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-20' title='Communication avec un tiers'>
        <PVCard titre='Communication avec un tiers'>
          <div className='space-y-2'>
            <PVLine m='Moyen utilisé' i='téléphone, écrit, etc.' />
            <PVLine m={"Informations sur la nature et la date présumée de l'infraction."} />
            <PVLine m='Durée.' />
          </div>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-21' title='Avis à avocat (mineur 10-16 ans)'>
        <PVCard titre='Avis à avocat (mineur 10-16 ans)'>
          <div className='space-y-2'>
            <PVLine m="Informé que le mineur doit être assisté d'un avocat." />
            <PVLine m={"Si le mineur n'en a pas désigné"} i={"avocat commis d'office"} />
          </div>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-22' title='Avis à avocat (mineur 16-18 ans)'>
        <PVCard titre='Avis à avocat (mineur 16-18 ans)'>
          <PVLine m='Mêmes principes que 10-16 ans,' i='adaptés à la tranche 16-18 ans' />
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-23' title='Avis Tuteur / Curateur / Mandataire spécial'>
        <PVCard titre='Avis Tuteur / Curateur / Mandataire spécial'>
          <PVLine m='Mentions relatives à la protection' i='selon le thème' />
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-24' title='Avis tiers (mineur uniquement)'>
        <PVCard titre='Avis tiers (mineur uniquement)'>
          <PVLine m='Destinataire et contenu' i='selon le thème' />
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-25' title='Avis employeur (mineur uniquement)'>
        <PVCard titre='Avis employeur (mineur uniquement)'>
          <PVLine
            m="L'employeur peut désigner un avocat et/ou demander un examen médical"
            i='âge du mineur dans le thème'
          />
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-26' title='Entretien de Prénom NOM avec son avocat'>
        <PVCard titre='Entretien de Prénom NOM avec son avocat'>
          <div className='space-y-2'>
            <PVLine m='Mise à disposition des pièces de procédure consultables.' />
            <PVLine m='Entretien de durée' i='30 minutes' />
            <PVLine m="Annexes : éventuelles observations écrites." />
          </div>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-27' title='Avis à avocat — Transport GAV (Prénom NOM)'>
        <PVCard titre='Avis à avocat — Transport GAV (Prénom NOM)'>
          <PVLine m='Information du transport du GAV' i={"à (adresse) en vue d'une audition"} />
          <PVDivider />
          <PVNote>Ce PV ne peut être utilisé seul pour cette procédure.</PVNote>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-28' title='Avis à médecin (mineur uniquement)'>
        <PVCard titre='Avis à médecin (mineur uniquement)'>
          <PVLine m="Demande d'examen médical de Prénom NOM." />
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-29' title='Examen médical de Prénom NOM — PGAV'>
        <PVCard titre='Examen médical de Prénom NOM — PGAV'>
          <div className='space-y-2'>
            <PVLine m='État de santé compatible avec la GAV' i='majeurs et mineurs' />
            <PVLine
              m='État de santé compatible avec le placement sous vidéosurveillance'
              i='mineurs uniquement'
            />
            <PVLine m='Annexes :' i='copie de la réquisition, certificat médical' />
          </div>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-30' title='Examen médical Téléconsultation'>
        <PVCard titre='Examen médical Téléconsultation'>
          <div className='space-y-2'>
            <PVLine m="Accord express de celui qui sollicite l'examen." />
            <PVLine m='Autorisation du magistrat.' />
            <PVLine m='État de santé compatible avec la mesure.' />
            <PVLine m='Annexes :' i='copie de la réquisition, certificat médical' />
          </div>
        </PVCard>
      </AccBlock>
    </Accordion>
  );
}

export function PanelInterpellations() {
  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccBlock id='pv-31' title='Interpellation sur la voie publique'>
        <PVCard titre='Interpellation sur la voie publique'>
          <div className='space-y-2'>
            <PVLine m={'À … h et lieu d’interpellation'} />
            <PVLine
              m='Menottage'
              i='(seulement si effectué et justifié)'
            />
            <PVLine m='Palpation' i='(positive / négative)' />
            <PVLine m='Information verbale du placement en GAV' i='notification par PV séparé' />
            <PVLine m='Recherches fichiers :' i='positif / négatif' />
          </div>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-32' title='Saisine, Interpellation de Prénom NOM'>
        <PVCard titre='Saisine, Interpellation de Prénom NOM'>
          <div className='space-y-2'>
            <PVLine m='Mode de saisine' i='CIC, appel téléphonique, initiative, réquisition' />
            <PVLine m={"À … h et lieu d'interpellation."} />
            <PVLine
              m="Qualification de l'infraction"
              i='qualification COMPLÈTE avec circonstances aggravantes selon le cas (Q1, Q2, etc.)'
            />
            <PVLine m='Cadre juridique.' />
            <PVLine m='Information verbale placement en GAV.' />
            <PVLine m='Menottage' i='(seulement si effectué et justifié)' />
            <PVLine m='Palpation' i='(positive / négative)' />
            <PVLine m='Recherches fichiers.' />
          </div>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-33' title='Transport — Interpellation dans un domicile (Adresse)'>
        <PVCard titre='Transport — Interpellation dans un domicile (Adresse)'>
          <div className='space-y-2'>
            <PVLine m={'À … h — lieu d’interpellation'} />
            <PVLine
              m='Menottage'
              i='(seulement si effectué et justifié)'
            />
            <PVLine m='Palpation' i='(positive / négative)' />
            <PVLine
              m='Information verbale placement en GAV'
              i='notification par PV séparé'
            />
            <PVLine m='Recherches fichiers.' />
          </div>
        </PVCard>
      </AccBlock>
    </Accordion>
  );
}

export function PanelConstatationsTransport() {
  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccBlock id='pv-34' title='Saisine, transport, constatations adresse exacte'>
        <PVCard titre='Saisine, transport, constatations adresse exacte'>
          <div className='space-y-2'>
            <PVLine m='Assistance éventuelle' i='serrurier, SDPJ, police scientifique' />
            <PVLine m='Mode de saisine.' />
            <PVLine m="État d'ouverture" i='constatation, saisie, scellé, réquisition' />
            <PVLine m="Bref exposé de l'infraction avec CA." />
            <PVLine m='Vidéoprotection' i='Oui / Non' />
            <PVLine m='Cadre juridique.' />
            <PVLine m='Avis parquet, avis hiérarchie.' />
            <PVLine m='Annexes :' i='album photo, certificat médical, facture, devis' />
            <PVLine
              m='Annexes des jeux'
              i='album photo, certificat médical, facture, devis'
            />
          </div>
          <PVDivider />
          <p className='text-sm font-bold text-white'>Obligatoire → 2 exports (date) à (lieu)</p>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-35' title='Saisine, Saisie incidente'>
        <PVCard titre='Saisine, Saisie incidente'>
          <div className='space-y-2'>
            <PVLine m='Circonstances de la saisie incidente.' />
            <PVLine
              m='Cadre juridique + assentiment manuscrit préalable'
              i='si préliminaire'
            />
            <PVLine m="Qualification de l'infraction." />
            <PVLine m='Saisie — scellé.' />
            <PVLine m='Avis parquet, avis hiérarchie.' />
          </div>
        </PVCard>
      </AccBlock>
    </Accordion>
  );
}

export function PanelFouillesPerquisitions() {
  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccBlock id='pv-36' title='Perquisition au domicile de Prénom NOM, lieu'>
        <PVCard titre='Perquisition au domicile de Prénom NOM, lieu'>
          <div className='space-y-2'>
            <PVLine m='En la présence constante et effective de Prénom NOM.' />
            <PVLine m='Heure de début' i='obligatoire' />
            <PVLine m='Heure de fin' i='obligatoire' />
            <PVLine
              m='Si découverte :'
              i='description objet, saisie, scellé numéro'
            />
            <PVLine m={"Résultat négatif ou éléments d'enquête."} />
            <PVLine
              m='Annexes :'
              i='assentiment manuscrit préalable ou autorisation JLD (en préliminaire)'
            />
          </div>
          <PVDivider />
          <PVNote>
            Hors heures légales → autorisation du JLD (art. 59 al. 1 CPP). En flagrance : heures de début à
            perquisition débutée en dehors des heures.
          </PVNote>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-37' title='Fouille intégrale de Prénom NOM'>
        <PVCard titre='Fouille intégrale de Prénom NOM'>
          <div className='space-y-2'>
            <PVLine m="Nécessités de l'enquête" i='motivation' />
            <PVLine m='Palpation et détection électronique.' />
            <PVLine m={"Résultat négatif ou éléments d'enquête."} />
            <PVLine m='Si découverte :' i='saisie, scellé numéro' />
          </div>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-38' title='Fouille de véhicule (marque, immatriculation)'>
        <PVCard titre='Fouille de véhicule (marque, immatriculation)'>
          <div className='space-y-2'>
            <PVLine m='Description du véhicule.' />
            <PVLine m='Consentement libre ou cadre juridique.' />
            <PVLine m='Présence constante et effective.' />
            <PVLine m='Résultat.' />
          </div>
        </PVCard>
      </AccBlock>
    </Accordion>
  );
}

export function PanelAuditionsConfrontations() {
  return (
    <Accordion type='single' collapsible className='w-full'>
      {AUDITION_EXTRA_CARTOUCHES.map((c) => (
        <AccBlock key={c.id} id={c.id} title={c.accordionTitle}>
          <PVCartoucheFromDef titre={c.titre} sousTitre={c.sousTitre} blocks={c.blocks} />
        </AccBlock>
      ))}
      <AccBlock id='pv-39' title='Audition civilement responsable de Prénom NOM'>
        <PVCard titre='Audition civilement responsable de Prénom NOM'>
          <div className='space-y-2'>
            <PVLine m='Reçoit les mêmes informations que celles communiquées au mineur.' />
            <PVLine m="Remise d'un formulaire." />
            <PVLine m='Prend connaissance des déclarations.' />
            <PVLine m="Nouveaux éléments d'enquête." />
            <PVLine m='Présentation des scellés.' />
          </div>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-40' title='Audition de victime Prénom NOM'>
        <PVCard titre='Audition de victime Prénom NOM'>
          <div className='space-y-2'>
            <PVLine m={"Informations utiles, éléments de l'enquête."} />
            <PVLine m='Présentation des scellés.' />
          </div>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-41' title='Audition de témoin Prénom NOM'>
        <PVCard titre='Audition de témoin Prénom NOM'>
          <div className='space-y-2'>
            <PVLine m="Éléments utiles à l'enquête." />
            <PVLine m='Présentation des scellés.' />
          </div>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-42' title='Plainte de Prénom NOM C/ Prénom NOM ou contre X'>
        <PVCard titre='Plainte de Prénom NOM C/ Prénom NOM ou contre X'>
          <div className='space-y-2'>
            <PVLine
              m='Pour des faits de :'
              i='qualification (Q1, Q2) commis le (date) à (lieu)'
            />
            <PVLine m='Information des droits à victime et mise en œuvre.' />
            <PVLine
              m='Documents remis :'
              i='récépissé de déclarations, copie PV, copie certificat médical'
            />
            <PVLine m='Annexes éventuelles.' />
          </div>
          <PVDivider />
          <PVNote>Ce PV ne peut être utilisé seul pour cette procédure.</PVNote>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-43' title='Confrontation entre Prénom NOM et Prénom NOM'>
        <PVCard titre='Confrontation entre Prénom NOM et Prénom NOM'>
          <div className='space-y-2'>
            <PVLine m='Motivation' i='déclarations non concordantes, etc.' />
            <PVLine
              m='Particularité ou assistance :'
              i='enregistrement audio-visuel, assistance avocat'
            />
            <PVLine m="Éléments d'enquête." />
            <PVLine m='Déclarations respectives.' />
          </div>
          <PVDivider />
          <div className='space-y-2 text-sm text-gray-300'>
            <p>
              <span className='font-bold text-white'>1 — </span>
              Si assistance avocat lors de l&apos;audition ou de la confrontation du MEC : PV séparé pour avis
              avocat.
            </p>
            <p>
              <span className='font-bold text-white'>2 — </span>
              Lors de la plainte ou de l&apos;audition de la victime, si à ce stade de l&apos;enquête une
              identification est prévue, mentionner l&apos;invitation au droit à assistance avocat pour
              confrontation / séance d&apos;identification.
            </p>
          </div>
        </PVCard>
      </AccBlock>
    </Accordion>
  );
}

export function PanelPvTechniques() {
  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccBlock id='pv-44' title="Constitution d'une planche photographique">
        <PVCard titre="Constitution d'une planche photographique">
          <PVLine m='Annexe :' i='planche photographique du groupe de X personnes' />
        </PVCard>
      </AccBlock>

      <AccBlock
        id='pv-45'
        title={"Présentation d'une planche photographique à témoin/victime Prénom NOM"}
      >
        <PVCard titre={"Présentation d'une planche photographique à témoin/victime Prénom NOM"}>
          <PVLine m='Résultat de la présentation.' />
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-46' title={"Constitution d'un groupe pour présentation de suspect à témoin"}>
        <PVCard titre={"Constitution d'un groupe pour présentation de suspect à témoin"}>
          <PVLine m='Annexe :' i='photographie du groupe constitué' />
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-47' title={"Présentation d'un groupe de suspect à témoin/victime"}>
        <PVCard titre={"Présentation d'un groupe de suspect à témoin/victime"}>
          <div className='space-y-2'>
            <PVLine m='Résultat.' />
            <PVLine m='Particularités :' i='assistance avocat, etc.' />
          </div>
          <PVDivider />
          <PVNote>MEC → victime / victime → MEC.</PVNote>
        </PVCard>
      </AccBlock>
    </Accordion>
  );
}

export function PanelDiversCloture() {
  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccBlock id='pv-48' title='Présentation de photos du fichier TAJ à témoin/victime'>
        <PVCard titre='Présentation de photos du fichier TAJ à témoin/victime'>
          <PVLine m='Résultat.' />
          <PVDivider />
          <PVNote>Possible si la victime reconnaît à la fin.</PVNote>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-49' title='Identification fichier TAJ'>
        <PVCard titre='Identification fichier TAJ'>
          <PVLine m='Annexe :' i='copie individu identifié, album photo, fiche signalétique' />
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-50' title='Recherches / Renseignements / Vérifications'>
        <PVCard titre='Recherches / Renseignements / Vérifications'>
          <div className='space-y-2'>
            <PVLine m="Renseignements utiles à l'enquête." />
            <PVLine m='Recherches, vérifications' i='connu ou inconnu' />
            <PVLine m='Exposé des diligences.' />
          </div>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-51' title='Enquête de voisinage (Adresse)'>
        <PVCard titre='Enquête de voisinage (Adresse)'>
          <PVLine m='Positive ou négative.' />
          <PVLine m='Si positive :' i='audition du témoin → PV séparé' />
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-52' title='Exploitation vidéoprotection'>
        <PVCard titre='Exploitation vidéoprotection'>
          <div className='space-y-2'>
            <PVLine m='Lieu, caméra exploitée.' />
            <PVLine m='Saisi-scellé :' i='CD vidéo' />
            <PVLine m='Annexes :' i='copie réquisition' />
          </div>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-53' title='Compte rendu magistrat'>
        <PVCard titre='Compte rendu magistrat'>
          <PVLine m="Motif de l'appel et instructions." />
          <PVDivider />
          <PVNote>Peut faire l&apos;objet d&apos;une mention au PV auquel il est attaché ou d&apos;un PV séparé.</PVNote>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-54' title='Assistance PTS (Police Technique et Scientifique)'>
        <PVCard titre='Assistance PTS (Police Technique et Scientifique)'>
          <div className='space-y-2'>
            <PVLine m='Saisi-scellé des prélèvements.' />
            <PVLine m='Annexes :' i='album et photos' />
          </div>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-55' title='Assistance à autopsie de Prénom NOM'>
        <PVCard titre='Assistance à autopsie de Prénom NOM'>
          <PVLine m='Concertation avec le Parquet.' />
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-56' title='Signalisation génétique — FNAEG'>
        <PVCard titre='Signalisation génétique — FNAEG'>
          <PVLine m="Copie de demande d'analyse et d'enregistrement au FNAEG." />
          <PVDivider />
          <PVNote>Pas obligatoire si conditions MEC absents, à faire à la fin — FNAEG.</PVNote>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-57' title='Scellé CD ROM audition(s) sous vidéo'>
        <PVCard titre='Scellé CD ROM audition(s) sous vidéo'>
          <div className='space-y-2'>
            <PVLine m='Auditions / confrontations de Prénom NOM.' />
            <PVLine m='Annexes :' i='copie CD Rom' />
          </div>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-58' title='Réquisition à personne / organisme'>
        <PVCard titre='Réquisition à personne / organisme'>
          <div className='space-y-2'>
            <PVLine m='Accord préalable du parquet' i='en préliminaire' />
            <PVLine m='Mission.' />
            <PVLine m='Annexes :' i='copie de la réquisition' />
          </div>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-59' title='Réponse à réquisition'>
        <PVCard titre='Réponse à réquisition'>
          <div className='space-y-2'>
            <PVLine m='Résultat.' />
            <PVLine m='Annexes.' />
          </div>
        </PVCard>
      </AccBlock>

      <AccBlock id='pv-60' title='Récolement des scellés'>
        <PVCard titre='Récolement des scellés'>
          <div className='space-y-2'>
            <PVLine m='Désignation :' i='scellé X, scellé XX, etc. selon le thème' />
            <PVLine m='Destination :' i='greffe du TJ de (lieu)' />
          </div>
          <PVDivider />
          <PVNote>Se fait avant fin de GAV ou à la fin si conditions ok.</PVNote>
        </PVCard>
      </AccBlock>
    </Accordion>
  );
}
