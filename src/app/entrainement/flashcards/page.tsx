import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

import { pathWithSearchParams } from '@/utils/redirect-with-search-params';

/** URLs canoniques : `/flashcards` (évite le doublon `/entrainement/flashcards`). */
export const metadata: Metadata = {
  title: 'Flashcards — Examen OPJ',
  robots: { index: false, follow: true },
};

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function EntrainementFlashcardsRedirect({ searchParams = {} }: PageProps) {
  permanentRedirect(pathWithSearchParams('/flashcards', searchParams));
}
