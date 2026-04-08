import { ParsedCourseBlock, ParsedCourseDocument } from './types';

function classifyBlock(text: string): ParsedCourseBlock['type'] {
  const normalized = text.toLowerCase();
  if (normalized.includes('qcm') || normalized.includes('question')) return 'qcm';
  if (normalized.includes('element') || normalized.includes('materiel') || normalized.includes('intention')) return 'elements';
  return 'theorie';
}

export function buildCourseDocumentFromText(sourceFascicule: string, rawText: string): ParsedCourseDocument {
  const chunks = rawText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 60);

  const blocks: ParsedCourseBlock[] = chunks.map((line, index) => ({
    titre: `Bloc ${index + 1}`,
    contenu: line,
    type: classifyBlock(line),
    sourceFascicule,
  }));

  return {
    sourceFascicule,
    blocks,
  };
}
