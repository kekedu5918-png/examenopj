'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

type Props = { txtFile: string };

function normalizeText(raw: string): string {
  let t = raw.replace(/\f/g, '\n\n');
  t = t.replace(/\r\n/g, '\n');
  t = t.replace(/\n{4,}/g, '\n\n\n');
  return t.trim();
}

export function FasciculeTextContent({ txtFile }: Props) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    setContent('');

    const url = `/cours-texte/${encodeURIComponent(txtFile)}`;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.text();
      })
      .then((text) => {
        if (cancelled) return;
        setContent(normalizeText(text));
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError(true);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [txtFile]);

  if (loading) {
    return (
      <div className='flex items-center gap-2 py-16 text-gray-400'>
        <Loader2 className='h-5 w-5 animate-spin shrink-0' aria-hidden />
        Chargement du fascicule…
      </div>
    );
  }

  if (error) {
    return (
      <div className='rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200'>
        Impossible de charger <code className='text-red-100'>{txtFile}</code>. Vérifiez que le fichier est présent dans{' '}
        <code className='text-red-100'>public/cours-texte/</code>.
      </div>
    );
  }

  return (
    <article
      className='max-w-none whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-gray-300 [overflow-wrap:anywhere]'
      lang='fr'
    >
      {content}
    </article>
  );
}
