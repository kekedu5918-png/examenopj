/** Dégradés distincts par numéro de fascicule F01–F15 (cercle module). */
export const MODULE_NUM_GRADIENTS: readonly string[] = [
  'from-[#3B82F6] to-[#06B6D4]', // F01 bleu
  'from-[#7C3AED] to-[#EC4899]', // F02 violet
  'from-[#EA580C] to-[#FBBF24]', // F03 orange
  'from-[#059669] to-[#34D399]', // F04 émeraude
  'from-[#DC2626] to-[#F87171]', // F05 rouge
  'from-[#0EA5E9] to-[#6366F1]', // F06 ciel / indigo
  'from-[#A855F7] to-[#38BDF8]', // mauve / cyan
  'from-[#D97706] to-[#F472B6]', // ambre / rose
  'from-[#2563EB] to-[#A78BFA]', // bleu / lavande
  'from-[#14B8A6] to-[#84CC16]', // teal / lime
  'from-[#E11D48] to-[#FB923C]', // rose / orange
  'from-[#4F46E5] to-[#22D3EE]', // indigo / cyan
  'from-[#B45309] to-[#FDE047]', // brun / jaune
  'from-[#15803D] to-[#2DD4BF]', // vert
  'from-[#BE185D] to-[#7C3AED]', // fuchsia / violet
];

export function getModuleNumGradient(numero: number): string {
  const i = Math.max(0, Math.min(MODULE_NUM_GRADIENTS.length - 1, numero - 1));
  return MODULE_NUM_GRADIENTS[i] ?? MODULE_NUM_GRADIENTS[0]!;
}
