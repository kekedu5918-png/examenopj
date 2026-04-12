import type { ComponentType } from 'react';

import { ActionPubliqueLessonBlocks } from '@/components/lessons/fiches/ActionPubliqueLessonBlocks';
import { AuditionLessonBlocks } from '@/components/lessons/fiches/AuditionLessonBlocks';
import { CadresEnqueteLessonBlocks } from '@/components/lessons/fiches/CadresEnqueteLessonBlocks';
import { ChambreInstructionLessonBlocks } from '@/components/lessons/fiches/ChambreInstructionLessonBlocks';
import { CirconstancesAggravantesLessonBlocks } from '@/components/lessons/fiches/CirconstancesAggravantesLessonBlocks';
import { ClassificationInfractionsLessonBlocks } from '@/components/lessons/fiches/ClassificationInfractionsLessonBlocks';
import { CommissionRogatoireLessonBlocks } from '@/components/lessons/fiches/CommissionRogatoireLessonBlocks';
import { CompliciteCoactionLessonBlocks } from '@/components/lessons/fiches/CompliciteCoactionLessonBlocks';
import { ControleIdentiteLessonBlocks } from '@/components/lessons/fiches/ControleIdentiteLessonBlocks';
import { ControleJudiciaireDetentionLessonBlocks } from '@/components/lessons/fiches/ControleJudiciaireDetentionLessonBlocks';
import { CriminaliteOrganiseeLessonBlocks } from '@/components/lessons/fiches/CriminaliteOrganiseeLessonBlocks';
import { DisparitionsInquietantesLessonBlocks } from '@/components/lessons/fiches/DisparitionsInquietantesLessonBlocks';
import { ElementsConstitutifsLessonBlocks } from '@/components/lessons/fiches/ElementsConstitutifsLessonBlocks';
import { EnqueteDeces74LessonBlocks } from '@/components/lessons/fiches/EnqueteDeces74LessonBlocks';
import { EntraideInternationaleLessonBlocks } from '@/components/lessons/fiches/EntraideInternationaleLessonBlocks';
import { ExtensionCompetenceLessonBlocks } from '@/components/lessons/fiches/ExtensionCompetenceLessonBlocks';
import { GardeAVueLessonBlocks } from '@/components/lessons/fiches/GardeAVueLessonBlocks';
import { InterpellationLessonBlocks } from '@/components/lessons/fiches/InterpellationLessonBlocks';
import { IrresponsabilitePenaleLessonBlocks } from '@/components/lessons/fiches/IrresponsabilitePenaleLessonBlocks';
import { JugeInstructionLessonBlocks } from '@/components/lessons/fiches/JugeInstructionLessonBlocks';
import { JugeLibertesDetentionLessonBlocks } from '@/components/lessons/fiches/JugeLibertesDetentionLessonBlocks';
import { JuridictionApplicationPeinesLessonBlocks } from '@/components/lessons/fiches/JuridictionApplicationPeinesLessonBlocks';
import { JuridictionsJugementLessonBlocks } from '@/components/lessons/fiches/JuridictionsJugementLessonBlocks';
import { MandatsLessonBlocks } from '@/components/lessons/fiches/MandatsLessonBlocks';
import { MinisterePublicLessonBlocks } from '@/components/lessons/fiches/MinisterePublicLessonBlocks';
import { NullitesLessonBlocks } from '@/components/lessons/fiches/NullitesLessonBlocks';
import { OpjApjApjaLessonBlocks } from '@/components/lessons/fiches/OpjApjApjaLessonBlocks';
import { PerquisitionLessonBlocks } from '@/components/lessons/fiches/PerquisitionLessonBlocks';
import { RecidiveConcoursLessonBlocks } from '@/components/lessons/fiches/RecidiveConcoursLessonBlocks';
import { ReperesF06MineursFamilleLessonBlocks } from '@/components/lessons/fiches/ReperesF06MineursFamilleLessonBlocks';
import { RequisitionsLessonBlocks } from '@/components/lessons/fiches/RequisitionsLessonBlocks';
import { SaisiesScellesLessonBlocks } from '@/components/lessons/fiches/SaisiesScellesLessonBlocks';
import { SanctionPenaleLessonBlocks } from '@/components/lessons/fiches/SanctionPenaleLessonBlocks';
import { SyntheseLiberteLoiSanctionLessonBlocks } from '@/components/lessons/fiches/SyntheseLiberteLoiSanctionLessonBlocks';
import { SyntheseParquetControleNulliteLessonBlocks } from '@/components/lessons/fiches/SyntheseParquetControleNulliteLessonBlocks';
import { SynthesePjInstructionJugementLessonBlocks } from '@/components/lessons/fiches/SynthesePjInstructionJugementLessonBlocks';
import { TentativePenaleLessonBlocks } from '@/components/lessons/fiches/TentativePenaleLessonBlocks';
import { VictimesDroitsLessonBlocks } from '@/components/lessons/fiches/VictimesDroitsLessonBlocks';
import { VoiesRecoursLessonBlocks } from '@/components/lessons/fiches/VoiesRecoursLessonBlocks';

const FICHE_LECONS: Record<string, ComponentType> = {
  'action-publique': ActionPubliqueLessonBlocks,
  'cadres-enquete': CadresEnqueteLessonBlocks,
  'circonstances-aggravantes': CirconstancesAggravantesLessonBlocks,
  'classification-infractions': ClassificationInfractionsLessonBlocks,
  'complicite-coaction': CompliciteCoactionLessonBlocks,
  'commission-rogatoire': CommissionRogatoireLessonBlocks,
  'controle-identite': ControleIdentiteLessonBlocks,
  'controle-judiciaire-detention': ControleJudiciaireDetentionLessonBlocks,
  'criminalite-organisee': CriminaliteOrganiseeLessonBlocks,
  'disparitions-inquietantes': DisparitionsInquietantesLessonBlocks,
  'elements-constitutifs': ElementsConstitutifsLessonBlocks,
  'enquete-deces-74': EnqueteDeces74LessonBlocks,
  'entraide-internationale': EntraideInternationaleLessonBlocks,
  'extension-competence': ExtensionCompetenceLessonBlocks,
  'garde-a-vue': GardeAVueLessonBlocks,
  interpellation: InterpellationLessonBlocks,
  'irresponsabilite-penale': IrresponsabilitePenaleLessonBlocks,
  'juge-instruction': JugeInstructionLessonBlocks,
  'juge-libertes-detention': JugeLibertesDetentionLessonBlocks,
  'juridictions-jugement': JuridictionsJugementLessonBlocks,
  'juridiction-application-peines': JuridictionApplicationPeinesLessonBlocks,
  'mandats-justice': MandatsLessonBlocks,
  'ministere-public': MinisterePublicLessonBlocks,
  nullites: NullitesLessonBlocks,
  'opj-apj-apja': OpjApjApjaLessonBlocks,
  perquisition: PerquisitionLessonBlocks,
  'recursion-recidive': RecidiveConcoursLessonBlocks,
  'repères-f06-mineurs-famille': ReperesF06MineursFamilleLessonBlocks,
  requisitions: RequisitionsLessonBlocks,
  'sanction-penale': SanctionPenaleLessonBlocks,
  'saisies-scelles': SaisiesScellesLessonBlocks,
  'synthese-liberte-loi-sanction': SyntheseLiberteLoiSanctionLessonBlocks,
  'synthese-parquet-controle-nullite': SyntheseParquetControleNulliteLessonBlocks,
  'synthese-pj-instruction-jugement': SynthesePjInstructionJugementLessonBlocks,
  'tentative-penale': TentativePenaleLessonBlocks,
  audition: AuditionLessonBlocks,
  'chambre-instruction': ChambreInstructionLessonBlocks,
  'victimes-droits': VictimesDroitsLessonBlocks,
  'voies-recours': VoiesRecoursLessonBlocks,
};

/** Identifiants des fiches disposant d’un bloc pédagogique sur la page détail (audit / tests). */
export const FONDAMENTAUX_FICHE_LECON_IDS: readonly string[] = Object.keys(FICHE_LECONS);

export function FondamentauxFicheLessonBlocks({ ficheId }: { ficheId: string }) {
  const Cmp = FICHE_LECONS[ficheId];
  if (!Cmp) return null;
  return (
    <div className='mb-10'>
      <Cmp />
    </div>
  );
}
