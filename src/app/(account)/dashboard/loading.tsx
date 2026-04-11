export default function DashboardLoading() {
  return (
    <div className='mx-auto max-w-5xl animate-pulse px-4 py-10 md:px-6'>
      {/* Hero stats */}
      <div className='mb-8 grid grid-cols-2 gap-4 md:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className='h-24 rounded-xl bg-white/[0.05]' />
        ))}
      </div>

      {/* Streak / badges strip */}
      <div className='mb-8 grid grid-cols-3 gap-4'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='h-20 rounded-xl bg-white/[0.05]' />
        ))}
      </div>

      {/* Category progress bars */}
      <div className='mb-8 rounded-xl bg-white/[0.04] p-6'>
        <div className='mb-4 h-5 w-40 rounded bg-white/10' />
        <div className='space-y-4'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='space-y-1'>
              <div className='flex justify-between'>
                <div className='h-3 w-24 rounded bg-white/10' />
                <div className='h-3 w-10 rounded bg-white/10' />
              </div>
              <div className='h-2 w-full rounded-full bg-white/10' />
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className='grid gap-4 md:grid-cols-3'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='h-16 rounded-xl bg-white/[0.05]' />
        ))}
      </div>
    </div>
  );
}
