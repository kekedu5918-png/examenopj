import {
  renumberRubriquesAPartirDe,
  SDCP_CORPS_PLAINTE_POURSUITE_INSERT,
  SDCP_CORPS_PLAINTE_R1_R2,
  SDCP_CORPS_PLAINTE_R3_R4,
  SDCP_CORPS_PLAINTE_SUITE_IDENTITE_A_FIN,
  SDCP_ENTETE_DROIT_PLAINTE,
  SDCP_ENTETE_GAUCHE_PLAINTE,
  SDCP_MARGIN_PLAINTE_OBJET_VICTIME,
} from '@/data/modeles-pv/plainte-sdcp-shared';
import type { ModelePV, PVBloc } from '@/types/pv';

function rubriqueN(b: PVBloc, n: number): PVBloc {
  if (b.type !== 'rubrique-numerotee') return b;
  return { type: 'rubrique-numerotee', numero: n, texte: b.texte };
}

const r2 = SDCP_CORPS_PLAINTE_R1_R2[1]!;const r3 = SDCP_CORPS_PLAINTE_R3_R4[0]!;
const r4 = SDCP_CORPS_PLAINTE_R3_R4[1]!;

export const modelePlaintePoursuiteEnquete: ModelePV = {
  id: 'plainte-poursuite-enquete',
  titre: "Plainte — quand la plainte n'est pas la saisine initiale (Exemple 3)",
  source: 'Support officiel SDCP — La procédure pénale policière, p. 86',
  fascicule: 'F11',
  categorie: 'plainte',
  isPremium: false,
  cartouche: {
    enteteGauche: SDCP_ENTETE_GAUCHE_PLAINTE,
    enteteDroit: SDCP_ENTETE_DROIT_PLAINTE,
    marginGauche: SDCP_MARGIN_PLAINTE_OBJET_VICTIME,
  },
  corps: [
    SDCP_CORPS_PLAINTE_R1_R2[0]!,
    ...SDCP_CORPS_PLAINTE_POURSUITE_INSERT,
    rubriqueN(r2, 5),
    rubriqueN(r3, 6),
    rubriqueN(r4, 7),
    ...renumberRubriquesAPartirDe(SDCP_CORPS_PLAINTE_SUITE_IDENTITE_A_FIN, 8),
  ],
  notesPedagogiques: [
    "Ce modèle s'utilise quand d'autres actes ont été établis AVANT la plainte (constatations, interpellation, etc.).",
    "La rubrique A 'Poursuivant l'enquête' s'insère entre les rubriques 1 et 2 du modèle standard.",
    "La formule 'Avons mandé' indique que la victime a été convoquée au service.",
  ],
};
