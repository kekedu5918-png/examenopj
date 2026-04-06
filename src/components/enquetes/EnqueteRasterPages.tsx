type Props = {
  urls: string[];
  altPrefix: string;
};

/** Affichage des pages scannées (PNG) — fidélité visuelle au document officiel. */
export function EnqueteRasterPages({ urls, altPrefix }: Props) {
  return (
    <div className='space-y-6'>
      {urls.map((src, i) => (
        <figure key={src} className='overflow-x-auto'>
          {/* PNG générés localement (raster fidèle) — évite l’optimiseur sur très gros scans. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- fac-similés pleine définition */}
          <img
            src={src}
            alt={`${altPrefix} — page ${i + 1}`}
            className='mx-auto h-auto w-full max-w-[900px] border border-black/5'
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding='async'
          />
        </figure>
      ))}
    </div>
  );
}
