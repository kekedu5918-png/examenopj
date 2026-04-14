import { NextResponse } from 'next/server';

import { runEmailRemindersCron } from '@/features/engagement/run-email-reminders-cron';

export const dynamic = 'force-dynamic';

/**
 * Cron Vercel (quotidien) : rappels e-mail opt-in via Resend.
 * Variables : `CRON_SECRET` (Authorization Bearer), `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `SUPABASE_SERVICE_ROLE_KEY`.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'CRON_SECRET non configuré' }, { status: 501 });
  }
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await runEmailRemindersCron();
  const status = result.ok ? 200 : 500;
  return NextResponse.json(
    {
      ...result,
      timestamp: new Date().toISOString(),
    },
    { status },
  );
}
