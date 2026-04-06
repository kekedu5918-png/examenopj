import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createClient } from '@supabase/supabase-js';

const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

const corpus = [
  { path: 'C:/Users/keked/Downloads/_00_cahier_de_mise_jour_de_juillet_2025_d_cembre_2025.pdf', slug: '_00' },
  { path: 'C:/Users/keked/Downloads/_01_f01_les_crimes_et_d_lits_contre_les_personnes_partie_1.pdf', slug: '_01' },
  { path: 'C:/Users/keked/Downloads/_02_f01_les_crimes_et_d_lits_contre_les_personnes_partie_2.pdf', slug: '_02' },
  { path: 'C:/Users/keked/Downloads/_03_f02_les_crimes_et_d_lits_contre_les_biens.pdf', slug: '_03' },
  { path: 'C:/Users/keked/Downloads/_04_f03_les_infractions_la_circulation_routi_re.pdf', slug: '_04' },
  { path: 'C:/Users/keked/Downloads/_05_f04_les_crimes_et_d_lits_contre_la_nation_l_tat_et_la_paix_publique.pdf', slug: '_05' },
  { path: 'C:/Users/keked/Downloads/_06_f05_l_usage_et_le_trafic_de_stup_fiants.pdf', slug: '_06' },
  { path: 'C:/Users/keked/Downloads/_07_f06_les_atteintes_aux_mineurs_et_la_famille.pdf', slug: '_07' },
  { path: 'C:/Users/keked/Downloads/_08_f07_les_infractions_aux_r_gimes_des_mat_riels_de_guerre_armes_et_munitions.pdf', slug: '_08' },
  { path: 'C:/Users/keked/Downloads/_09_f08_les_libert_s_publiques.pdf', slug: '_09' },
  { path: 'C:/Users/keked/Downloads/_10_f09_de_la_loi_p_nale_de_la_responsabilit_p_nale.pdf', slug: '_10' },
  { path: 'C:/Users/keked/Downloads/_11_f10_la_sanction.pdf', slug: '_11' },
  { path: 'C:/Users/keked/Downloads/_12_f11_les_cadres_juridiques_et_les_actes_de_la_mission_de_police_judiciaire.pdf', slug: '_12' },
  { path: 'C:/Users/keked/Downloads/_13_f12_l_instruction_pr_paratoire_les_mandats_de_justice_le_contr_le_judiciaire_la_d_tention_provisoire.pdf', slug: '_13' },
  { path: 'C:/Users/keked/Downloads/_14_f13_les_juridictions_de_jugement_l_ex_cution_des_d_cisions_de_justice.pdf', slug: '_14' },
  { path: 'C:/Users/keked/Downloads/_15_f14_action_publique_et_action_civile_les_autorit_s_investies_par_la_loi_de_fonctions_de_police_judiciaire_le_contr_le_de_la_mission_de_police_judiciaire.pdf', slug: '_15' },
  { path: 'C:/Users/keked/Downloads/_16_f15_la_nullit_des_actes_de_proc_dure.pdf', slug: '_16' },
  { path: 'C:/Users/keked/Downloads/_17_me1_la_proc_dure_p_nale_polici_re.pdf', slug: '_17' },
  { path: 'C:/Users/keked/Downloads/_18_me2_la_garde_vue_et_l_audition_libre.pdf', slug: '_18' },
];

function env(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var ${name}`);
  return value;
}

function normalizeText(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function splitBlocks(rawText) {
  return rawText
    .split('\n')
    .map((line) => normalizeText(line))
    .filter((line) => line.length > 30)
    .slice(0, 120);
}

function classify(line) {
  const lower = line.toLowerCase();
  if (lower.includes('qcm') || lower.includes('question')) return 'qcm';
  if (lower.includes('element') || lower.includes('materiel') || lower.includes('intention')) return 'elements';
  return 'theorie';
}

function pickDifficulty(index) {
  return ['facile', 'moyen', 'difficile'][index % 3];
}

function buildQcm(line, index, source) {
  return {
    question: `${line.slice(0, 180)} ?`,
    options: [
      `Qualification 1 (${source})`,
      `Qualification 2 (${source})`,
      `Qualification 3 (${source})`,
      `Qualification 4 (${source})`,
    ],
    reponse_correcte: index % 4,
    explication: `Question generee depuis ${source}. Verification humaine recommandee.`,
    article_ref: null,
    difficulte: pickDifficulty(index),
    source_fascicule: source,
  };
}

async function upsertModule(supabase, slug) {
  const payload = {
    slug: `fascicule-${slug}`,
    titre: `Fascicule ${slug}`,
    description: `Import PDF officiel ${slug}`,
    ordre: Number.parseInt(slug.replace('_', ''), 10) || 0,
    icone: 'book',
    couleur: '#1E3A8A',
  };
  const { data, error } = await supabase.from('modules').upsert(payload, { onConflict: 'slug' }).select('id').single();
  if (error) throw error;
  return data.id;
}

async function importOne(supabase, source) {
  const absolute = path.resolve(source.path);
  const file = await fs.readFile(absolute);
  const parser = new PDFParse({ data: file });
  const parsed = await parser.getText();
  await parser.destroy();
  const lines = splitBlocks(parsed.text);
  const moduleId = await upsertModule(supabase, source.slug);

  const chapitrePayload = {
    module_id: moduleId,
    titre: `Cours ${source.slug}`,
    contenu: { blocks: lines.map((line, index) => ({ titre: `Bloc ${index + 1}`, type: classify(line), contenu: line })) },
    articles: [],
    pieges_examen: [],
    ordre: 1,
    difficulte: 'moyen',
  };

  const { data: chapitreData, error: chapitreError } = await supabase.from('chapitres').insert(chapitrePayload).select('id').single();
  if (chapitreError) throw chapitreError;

  const qcms = lines.slice(0, 10).map((line, index) => ({
    module_id: moduleId,
    chapitre_id: chapitreData.id,
    ...buildQcm(line, index, source.slug),
  }));
  if (qcms.length > 0) {
    const { error } = await supabase.from('questions').insert(qcms);
    if (error) throw error;
  }

  const flashcards = lines.slice(10, 30).map((line, index) => ({
    module_id: moduleId,
    recto: line.slice(0, 220),
    verso: `Source ${source.slug} - carte ${index + 1}`,
    article_ref: null,
    difficulte: pickDifficulty(index),
  }));
  if (flashcards.length > 0) {
    const { error } = await supabase.from('flashcards').insert(flashcards);
    if (error) throw error;
  }

  console.log(`[OK] ${source.slug}: ${qcms.length} QCM, ${flashcards.length} flashcards`);
}

async function main() {
  const supabase = createClient(env('NEXT_PUBLIC_SUPABASE_URL'), env('SUPABASE_SERVICE_ROLE_KEY'));
  for (const source of corpus) {
    try {
      await importOne(supabase, source);
    } catch (error) {
      console.error(`[ERROR] ${source.slug}:`, error.message);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
