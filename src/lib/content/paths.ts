import path from 'path';

export const CONTENT_ROOT = path.join(process.cwd(), 'content');

export function contentPath(...segments: string[]) {
  return path.join(CONTENT_ROOT, ...segments);
}
