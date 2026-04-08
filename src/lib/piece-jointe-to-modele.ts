import {
  SDCP_ENTETE_DROIT_PLAINTE,
  SDCP_ENTETE_GAUCHE_PLAINTE,
} from '@/data/modeles-pv/plainte-sdcp-shared';
import type { PieceJointe } from '@/data/sujets-rapport-synthese';
import type { ModelePV } from '@/types/pv';

/** Adapte une pièce de dossier pour réutiliser le rendu officiel (ModelePV). */
export function pieceJointeToModelePV(p: PieceJointe, index: number): ModelePV {
  const id = `piece-atelier-${index}`;
  return {
    id,
    titre: `${p.numero} — ${p.type}`,
    source: 'Pièce reconstituée — atelier pédagogique (ne vaut pas acte authentique)',
    fascicule: 'F11',
    categorie: 'constatation',
    cartouche: {
      enteteGauche: SDCP_ENTETE_GAUCHE_PLAINTE,
      enteteDroit: SDCP_ENTETE_DROIT_PLAINTE,
      marginGauche: ['AFFAIRE :', '', 'OBJET :', p.type, '', `Réf. pièce : ${p.numero}`],
    },
    corps: [{ type: 'paragraphe', texte: p.contenu }],
    notesPedagogiques: undefined,
    isPremium: false,
  };
}
