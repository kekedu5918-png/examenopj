'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  markdown: string;
  className?: string;
};

export function MarkdownArticle({ markdown, className }: Props) {
  return (
    <article
      className={
        className ??
        'prose prose-invert max-w-none prose-headings:font-sans prose-a:text-violet-300 prose-strong:text-white prose-li:marker:text-violet-400'
      }
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </article>
  );
}
