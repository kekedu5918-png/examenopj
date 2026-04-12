import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

import { pathWithSearchParams } from '@/utils/redirect-with-search-params';

export const metadata: Metadata = {
  title: 'Quiz — Examen OPJ',
  robots: { index: false, follow: true },
};

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

/** Ancienne URL : redirection vers la route canonique /entrainement/quiz */
export default function QuizLegacyRedirect({ searchParams = {} }: PageProps) {
  permanentRedirect(pathWithSearchParams('/entrainement/quiz', searchParams));
}
