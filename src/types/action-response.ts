/** Réponse standard des server actions (jamais `undefined`). */
export type ActionResponse = {
  data: unknown;
  error: Error | { message: string } | null;
};
