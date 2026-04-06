import {
  renumberRubriquesAPartirDe,
  SDCP_CORPS_PLAINTE_HORS_LOCAUX_OUVERTURE,
  SDCP_CORPS_PLAINTE_SUITE_IDENTITE_A_FIN,
  SDCP_ENTETE_DROIT_PLAINTE,
  SDCP_ENTETE_GAUCHE_PLAINTE,
  SDCP_MARGIN_PLAINTE_OBJET_VICTIME,
} from '@/data/modeles-pv/plainte-sdcp-shared';
import type { ModelePV } from '@/types/pv';

export const modelePlainteHorsLocaux: ModelePV = {
  id: 'plainte-hors-locaux',
  titre: 'Plainte prise hors des locaux du service — Exemple 2',
  source: 'Fascicule SDCP — La procédure pénale policière, p. 86',
  fascicule: 'F11',
  categorie: 'plainte',
  isPremium: false,
  cartouche: {
    enteteGauche: SDCP_ENTETE_GAUCHE_PLAINTE,
    enteteDroit: SDCP_ENTETE_DROIT_PLAINTE,
    marginGauche: SDCP_MARGIN_PLAINTE_OBJET_VICTIME,
  },
  corps: [
    ...SDCP_CORPS_PLAINTE_HORS_LOCAUX_OUVERTURE,
    ...renumberRubriquesAPartirDe(SDCP_CORPS_PLAINTE_SUITE_IDENTITE_A_FIN, 9),
  ],
  notesPedagogiques: [
    "Ce modèle s'utilise quand la victime ne peut se déplacer (domicile, hôpital, etc.).",
    "La rubrique 'Nous transportons' établit la compétence territoriale et le déplacement de l'OPJ.",
    'Toutes les autres mentions restent identiques au modèle standard.',
  ],
};
