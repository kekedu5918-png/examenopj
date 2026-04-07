import type { InfractionCatalogItem, RecapFasciculeId } from '@/data/recapitulatif-data';

import officialJson from '../../reference/audit/infractions_officielles.json';

type OfficialInf = (typeof officialJson.infractions)[number];

function fascOk(f: string): f is RecapFasciculeId {
  return ['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07'].includes(f);
}

function toCatalogItem(row: OfficialInf): InfractionCatalogItem {
  const fascicule = row.fascicule;
  if (!fascOk(fascicule)) {
    throw new Error(`Fascicule inattendu: ${fascicule}`);
  }
  const legalLine = `${row.element_legal.article}\n${row.element_legal.texte}`.trim();

  return {
    id: row.id,
    fascicule,
    fasciculePart: row.fasciculePart,
    groupTitle: row.groupTitle,
    infraction: `**${row.titre}**`,
    legal: legalLine,
    materiel: row.element_materiel.contenu_complet,
    moral: row.element_moral.contenu_complet,
    priorite: 'secours',
    noteExamen: undefined,
    flashcardsCat: fascicule === 'F01' ? 'atteintes-aux-personnes' : fascicule === 'F02' ? 'atteintes-aux-biens' : undefined,
    tentative: row.repression.tentative,
    complicite: row.repression.complicite,
    accrocheFascicule: row.accroche,
    circonstancesAggravantesComplet: row.circonstances_aggravantes.contenu_complet,
    circonstancesAucune: row.circonstances_aggravantes.aucune,
    repressionTableau: row.repression.tableau,
    repressionImmunite: row.repression.immunite,
    repressionNota: row.repression.nota,
    piegeExamenOfficiel: row.piege_examen,
    maj2025: row.maj_2025,
    badgeMaj: row.badge_maj,
  };
}

/** Catalogue infractions aligné sur `reference/audit/infractions_officielles.json` (fascicules F01–F07). */
export function getInfractionsCatalogFromOfficial(): InfractionCatalogItem[] {
  return officialJson.infractions.map(toCatalogItem);
}
