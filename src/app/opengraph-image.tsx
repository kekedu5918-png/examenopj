import { ImageResponse } from 'next/og';

import { APP_NAME, APP_TAGLINE } from '@/constants/site';

export const runtime = 'edge';

export const alt = `${APP_NAME} — ${APP_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #020617 0%, #0f172a 45%, #1e293b 100%)',
          padding: 72,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 12,
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 64, fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.03em' }}>EXAMEN</span>
          <span style={{ fontSize: 64, fontWeight: 800, color: '#d4a20b', letterSpacing: '-0.03em' }}>OPJ</span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#fcd34d',
              border: '2px solid rgba(212,162,11,0.5)',
              borderRadius: 8,
              padding: '6px 14px',
            }}
          >
            2026
          </span>
        </div>
        <div style={{ fontSize: 34, color: '#94a3b8', maxWidth: 920, lineHeight: 1.35 }}>{APP_TAGLINE}</div>
        <div style={{ marginTop: 48, fontSize: 26, color: '#64748b', fontWeight: 600 }}>Fascicules SDCP · Quiz · Flashcards · Méthodologie</div>
      </div>
    ),
    { ...size }
  );
}
