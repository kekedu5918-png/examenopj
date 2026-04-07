/**
 * Exporte reference/audit/infractions_officielles.json depuis le récapitulatif site
 * (src/data/recapitulatif-*.ts), aligné sur les fascicules F01–F07.
 *
 * Usage : npx tsx scripts/export-infractions-audit.ts
 */
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

import { recapSections } from '../src/data/recapitulatif-data';

function stripMd(s: string): string {
  return s.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
}

function isMaj2025(row: { infraction: string; legal: string }): boolean {
  const t = `${row.infraction} ${row.legal}`.toLowerCase();
  return (
    t.includes('221-18') ||
    t.includes('221-19') ||
    t.includes('221-20') ||
    t.includes('2025-622') ||
    t.includes('homicide routier') ||
    t.includes('blessures routières')
  );
}

type OfficialInfraction = {
  id: string;
  fascicule: string;
  fasciculePart?: string;
  groupTitle: string;
  titre: string;
  accroche: string;
  element_legal: { article: string; formulation_exacte: string };
  element_materiel: { points: { titre: string; sous_points: string[] }[] };
  element_moral: { titre: string; texte: string };
  circonstances_aggravantes: { degre: string }[];
  repression: { qualification: string; article: string; peines: string }[];
  tentative: string;
  complicite: string;
  maj_2025: boolean;
  badge_maj: string | null;
  priorite_site?: string;
  note_examen_site?: string;
  _source: string;
};

const out: OfficialInfraction[] = [];

for (const section of recapSections) {
  section.rows.forEach((row, ri) => {
    if (row.infraction.includes('À compléter')) return;

    const id = `${section.id}-r${ri}`;
    const titre = stripMd(row.infraction);
    const legalLine = stripMd(row.legal);
    const articleMatch = legalLine.match(/^(Art\.[^—]+|L\.\s*[^—]+|R\.\s*[^—]+)/i);
    const article = articleMatch ? articleMatch[0].trim() : 'Voir bloc légal (récap site)';

    const maj = isMaj2025(row);

    out.push({
      id,
      fascicule: section.fascicule,
      fasciculePart: section.fasciculePart,
      groupTitle: section.groupTitle,
      titre,
      accroche:
        'TODO : premier paragraphe introductif en italique du fascicule papier — ne pas inventer ; recopier depuis PDF.',
      element_legal: {
        article,
        formulation_exacte: legalLine,
      },
      element_materiel: {
        points: [
          {
            titre: 'ÉLÉMENT MATÉRIEL (SYNTHÈSE RÉCAP SITE — À VÉRIFIER AU FASCICULE)',
            sous_points: [stripMd(row.materiel)],
          },
        ],
      },
      element_moral: {
        titre: 'ÉLÉMENT MORAL',
        texte: stripMd(row.moral),
      },
      circonstances_aggravantes: [{ degre: 'AUCUNE ou voir tableau des CA au fascicule — TODO relecture PDF' }],
      repression: [
        {
          qualification: 'TODO',
          article: 'Voir articles réprimant au fascicule / Légifrance',
          peines: 'TODO : reprises mot pour mot depuis le fascicule',
        },
      ],
      tentative: 'TODO : fascicule',
      complicite: 'TODO : fascicule',
      maj_2025: maj,
      badge_maj: maj ? 'MAJ 2025' : null,
      priorite_site: row.priorite,
      note_examen_site: row.noteExamen,
      _source: `recapitulatif-data.ts · ${section.id}`,
    });
  });
}

const payload = {
  meta: {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    generator: 'scripts/export-infractions-audit.ts',
    notice:
      'Entrées dérivées du récapitulatif site (F01–F07), lui-même calé sur les fascicules SDCP en version indiquée dans recapitulatif-f03-f07.ts. Les champs TODO (accroche, répression exacte, tentative/complicité) doivent être complétés depuis les PDF dans reference/fascicules/ sans paraphrase.',
    fasciculesPdf: {
      F01: ['_01_f01_les_crimes_et_d_lits_contre_les_personnes_partie_1.pdf', '_02_f01_les_crimes_et_d_lits_contre_les_personnes_partie_2.pdf'],
      F02: ['_03_f02_les_crimes_et_d_lits_contre_les_biens.pdf'],
      F03: ['_04_f03_les_infractions_la_circulation_routi_re.pdf'],
      F04: ['_05_f04_les_crimes_et_d_lits_contre_la_nation_l_tat_et_la_paix_publique.pdf'],
      F05: ['_06_f05_l_usage_et_le_trafic_de_stup_fiants.pdf'],
      F06: ['_07_f06_les_atteintes_aux_mineurs_et_la_famille.pdf'],
      F07: ['_08_f07_les_infractions_aux_r_gimes_des_mat_riels_de_guerre_armes_et_munitions.pdf'],
      F08: ['_09_f08_les_libert_s_publiques.pdf'],
      F09: ['_10_f09_de_la_loi_p_nale_de_la_responsabilit_p_nale.pdf'],
      F10: ['_11_f10_la_sanction.pdf'],
      F11: ['_12_f11_les_cadres_juridiques_et_les_actes_de_la_mission_de_police_judiciaire.pdf'],
      F12: ['_13_f12_l_instruction_pr_paratoire_les_mandats_de_justice_le_contr_le_judiciaire_la_d_tention_provisoire.pdf'],
      F13: ['_14_f13_les_juridictions_de_jugement_l_ex_cution_des_d_cisions_de_justice.pdf'],
      F14: ['_15_f14_action_publique_et_action_civile_les_autorit_s_investies_par_la_loi_de_fonctions_de_police_judiciaire_le_contr_le_de_la_mission_de_police_judiciaire.pdf'],
      F15: ['_16_f15_la_nullit_des_actes_de_proc_dure.pdf'],
      cahierMAJ: ['_00_cahier_de_mise_jour_de_juillet_2025_d_cembre_2025.pdf'],
      me: ['_17_me1_la_proc_dure_p_nale_polici_re.pdf', '_18_me2_la_garde_vue_et_l_audition_libre.pdf'],
    },
    totalInfractions: out.length,
  },
  infractions: out,
};

const auditDir = join(process.cwd(), 'reference', 'audit');
mkdirSync(auditDir, { recursive: true });
const jsonPath = join(auditDir, 'infractions_officielles.json');
writeFileSync(jsonPath, JSON.stringify(payload, null, 2), 'utf8');
console.log(`Écrit ${out.length} infractions dans ${jsonPath}`);
