import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #020617 0%, #1e1b4b 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', fontSize: 42, fontWeight: 800, color: '#f8fafc' }}>
          <span style={{ color: '#4f6ef7' }}>E</span>
          <span>O</span>
        </div>
        <div style={{ marginTop: 8, fontSize: 14, fontWeight: 700, color: '#d4a20b' }}>OPJ</div>
      </div>
    ),
    { ...size },
  );
}
