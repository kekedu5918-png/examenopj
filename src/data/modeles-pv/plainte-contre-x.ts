import {
  SDCP_CORPS_PLAINTE_R1_R2,
  SDCP_CORPS_PLAINTE_R3_R4,
  SDCP_CORPS_PLAINTE_SUITE_IDENTITE_A_FIN,
  SDCP_ENTETE_DROIT_PLAINTE,
  SDCP_ENTETE_GAUCHE_PLAINTE,
  SDCP_MARGIN_PLAINTE_OBJET_VICTIME,
} from '@/data/modeles-pv/plainte-sdcp-shared';
import type { ModelePV } from '@/types/pv';

export const modelePlainteContreX: ModelePV = {
  id: 'plainte-contre-x',
  titre: 'Plainte contre X — Exemple 1 (saisine initiale)',
  source: 'Fascicule SDCP — La procédure pénale policière, p. 85',
  fascicule: 'F11',
  categorie: 'plainte',
  isPremium: false,
  cartouche: {
    enteteGauche: SDCP_ENTETE_GAUCHE_PLAINTE,
    enteteDroit: SDCP_ENTETE_DROIT_PLAINTE,
    marginGauche: SDCP_MARGIN_PLAINTE_OBJET_VICTIME,
  },
  corps: [...SDCP_CORPS_PLAINTE_R1_R2, ...SDCP_CORPS_PLAINTE_R3_R4, ...SDCP_CORPS_PLAINTE_SUITE_IDENTITE_A_FIN],
  notesPedagogiques: [
    "1 — Lieu de rédaction : l'OPJ peut être amené à recevoir la plainte ailleurs qu'au service (domicile, hôpital, etc.).",
    '2 — Réception du déclarant : la personne peut se présenter spontanément (Constatons que se présente…) ou être convoquée (Avons mandé et entendons…).',
    '3 — Cadre juridique : flagrant délit ou préliminaire selon la situation.',
    "4 — Information droits victimes : art. 10-2 CPP obligatoire.",
    '5 — Identité : prénoms, noms, date et lieu de naissance, nationalité, profession, adresse, téléphone.',
    '6 — Déclaration : utiliser la première personne (je).',
    "7 — Dépôt de plainte : mention obligatoire sinon l'acte n'est qu'une dénonciation.",
    "10 — Énonciation terminale : mention de la lecture par la personne. Si impossibilité, mention de la lecture par l'OPJ.",
    '12 — Récépissé + formulaire droits victimes + copie PV si demandée (art. 15-3 al. 2 CPP).',
    '13 — Avis parquet : en pratique réservé aux affaires importantes ou problèmes de compétence.',
  ],
};
