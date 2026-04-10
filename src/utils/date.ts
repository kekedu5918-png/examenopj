/** Returns today's date in ISO format: 'YYYY-MM-DD' */
export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
