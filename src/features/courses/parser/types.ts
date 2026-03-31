export type ParsedBlockType = 'theorie' | 'elements' | 'qcm';

export type ParsedCourseBlock = {
  titre: string;
  contenu: string;
  type: ParsedBlockType;
  articleRef?: string;
  sourceFascicule: string;
};

export type ParsedCourseDocument = {
  sourceFascicule: string;
  blocks: ParsedCourseBlock[];
};
