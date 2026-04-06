import {
  SDCP_ENTETE_DROIT_PLAINTE,
  SDCP_ENTETE_GAUCHE_PLAINTE,
} from '@/data/modeles-pv/plainte-sdcp-shared';
import type { ModelePV } from '@/types/pv';

export const modeleVoisinage: ModelePV = {
  id: 'voisinage',
  titre: 'Enquête de voisinage',
  source: 'Fascicule SDCP — La procédure pénale policière, p. 127',
  fascicule: 'F11',
  categorie: 'voisinage',
  isPremium: false,
  cartouche: {
    enteteGauche: SDCP_ENTETE_GAUCHE_PLAINTE,
    enteteDroit: SDCP_ENTETE_DROIT_PLAINTE,
    marginGauche: [
      'AFFAIRE :',
      'C/ (Prénom, NOM)',
      "(qualification de l'infraction)",
      'OBJET :',
      'ENQUÊTE DE VOISINAGE',
    ],
  },
  corps: [
    {
      type: 'rubrique-numerotee',
      numero: 1,
      texte:
        "--- Poursuivant l'enquête de flagrance.------------------------------\n--- Vu les articles 53 et suivants du C.P.P.---------------------------",
    },
    {
      type: 'rubrique-numerotee',
      numero: 2,
      texte: '--- Nous trouvant (…).------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 3,
      texte:
        '--- Procédons à une enquête de voisinage dans les environs et plus particulièrement (…).--------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 4,
      texte:
        "--- De l'ensemble des personnes contactées, seulement (nombre de personnes) sont susceptibles de fournir des éléments intéressant l'enquête.-------------------------------------------------\n--- Il s'agit de :--------------------------------------------------------",
    },
    {
      type: 'rubrique-numerotee',
      numero: 5,
      texte: '--- M. (NOM Prénom, domicile, téléphone);-------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 6,
      texte: '--- Mme (NOM Prénom, domicile, téléphone).-----------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 7,
      texte: '--- Ces personnes ont été invitées à se présenter au service.------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 8,
      texte: '--- Dont Procès-verbal.-----------------------------------------------',
    },
    { type: 'signature', signataires: ["L'Officier de Police Judiciaire"] },
  ],
};
