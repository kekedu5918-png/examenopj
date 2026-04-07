import type { InfractionCatalogItem, RecapFasciculeId } from '@/data/recapitulatif-data';
import { essentielElementBloc, legalArticleOnly } from '@/utils/infraction-essentiel-extract';

import officialJson from '../../reference/audit/infractions_officielles.json';

type OfficialInf = (typeof officialJson.infractions)[number];

function fascOk(f: string): f is RecapFasciculeId {
  return ['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07'].includes(f);
}

/** Thème lisible sans préfixe fascicule (F01 — …) à l’affichage. */
function groupTitleSansFasciculeVisuel(g: string): string {
  return g.replace(/^\s*F\d{2}\s*[—–-]\s*/i, '').trim() || g.trim();
}

function toCatalogItem(row: OfficialInf): InfractionCatalogItem {
  const fascicule = row.fascicule;
  if (!fascOk(fascicule)) {
    throw new Error(`Fascicule inattendu: ${fascicule}`);
  }
  const legalLine = legalArticleOnly(row.element_legal.article, row.element_legal.texte);
  const materielEssentiel = essentielElementBloc(row.element_materiel.contenu_complet, 340);
  const moralEssentiel = essentielElementBloc(row.element_moral.contenu_complet, 340);

  return {
    id: row.id,
    fascicule,
    fasciculePart: row.fasciculePart,
    groupTitle: groupTitleSansFasciculeVisuel(row.groupTitle),
    infraction: `**${row.titre}**`,
    legal: legalLine,
    materiel: materielEssentiel,
    moral: moralEssentiel,
    priorite: 'secours',
    noteExamen: undefined,
    flashcardsCat: fascicule === 'F01' ? 'atteintes-aux-personnes' : fascicule === 'F02' ? 'atteintes-aux-biens' : undefined,
  };
}

/** Catalogue infractions aligné sur `reference/audit/infractions_officielles.json` (fascicules F01–F07). */
export function getInfractionsCatalogFromOfficial(): InfractionCatalogItem[] {
  return officialJson.infractions.map(toCatalogItem);
}
