export default function QuizLoading() {
  return (
    <div className='min-h-[60vh] animate-pulse bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950'>
      <div className='mx-auto max-w-2xl px-4 py-12'>
        {/* Mode selector */}
        <div className='mb-8 flex justify-center gap-3'>
          {[...Array(3)].map((_, i) => (
            <div key={i} className='h-10 w-28 rounded-full bg-white/[0.07]' />
          ))}
        </div>

        {/* Options panel */}
        <div className='rounded-2xl bg-white/[0.04] p-6'>
          <div className='mb-4 h-5 w-48 rounded bg-white/10' />
          <div className='grid grid-cols-2 gap-3'>
            {[...Array(6)].map((_, i) => (
              <div key={i} className='h-12 rounded-lg bg-white/[0.06]' />
            ))}
          </div>
          <div className='mt-6 h-12 w-full rounded-lg bg-cyan-500/20' />
        </div>
      </div>
    </div>
  );
}
