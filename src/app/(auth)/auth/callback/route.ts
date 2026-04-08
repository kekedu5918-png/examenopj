// ref: https://github.com/vercel/next.js/blob/canary/examples/with-supabase/app/auth/callback/route.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { isUserInSignupTrialPeriod } from '@/features/access/trial-window';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import { safeInternalPath } from '@/utils/safe-internal-path';
import { getSiteUrl } from '@/utils/site-url';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const nextRaw = requestUrl.searchParams.get('next');
  const nextPath = safeInternalPath(nextRaw, '/accueil');
  const siteUrl = getSiteUrl();

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=auth_callback', siteUrl));
  }

  const supabase = await createSupabaseServerClient();
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    return NextResponse.redirect(new URL('/login?error=auth_callback', siteUrl));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return NextResponse.redirect(new URL('/login?error=auth_callback', siteUrl));
  }

  const { data: userSubscription } = await supabase
    .from('subscriptions')
    .select('id')
    .in('status', ['trialing', 'active'])
    .eq('user_id', user.id)
    .maybeSingle();

  const inSignupTrial = isUserInSignupTrialPeriod(user.created_at);
  if (!userSubscription && !inSignupTrial) {
    return NextResponse.redirect(new URL('/pricing', siteUrl));
  }

  return NextResponse.redirect(new URL(nextPath, siteUrl));
}
