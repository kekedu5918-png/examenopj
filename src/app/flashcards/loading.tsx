export default function FlashcardsLoading() {
  return (
    <div className='mx-auto min-h-[60vh] max-w-2xl animate-pulse px-4 py-12'>
      {/* Header */}
      <div className='mb-8 text-center'>
        <div className='mx-auto mb-3 h-7 w-48 rounded bg-white/10' />
        <div className='mx-auto h-4 w-64 rounded bg-white/[0.06]' />
      </div>

      {/* Flashcard */}
      <div className='relative mx-auto h-64 w-full max-w-lg rounded-2xl bg-white/[0.05] border border-white/[0.08]'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='h-6 w-40 rounded bg-white/10' />
        </div>
      </div>

      {/* Answer buttons */}
      <div className='mt-8 flex justify-center gap-4'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='h-12 w-28 rounded-lg bg-white/[0.06]' />
        ))}
      </div>

      {/* Progress */}
      <div className='mx-auto mt-8 h-2 w-full max-w-lg rounded-full bg-white/[0.06]'>
        <div className='h-2 w-1/3 rounded-full bg-cyan-500/30' />
      </div>
    </div>
  );
}
