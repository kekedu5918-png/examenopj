import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

import { pathWithSearchParams } from '@/utils/redirect-with-search-params';

/** URLs canoniques : `/quiz` (évite le doublon `/entrainement/quiz`). */
export const metadata: Metadata = {
  title: 'Quiz — Examen OPJ',
  robots: { index: false, follow: true },
};

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function EntrainementQuizRedirect({ searchParams = {} }: PageProps) {
  permanentRedirect(pathWithSearchParams('/quiz', searchParams));
}
