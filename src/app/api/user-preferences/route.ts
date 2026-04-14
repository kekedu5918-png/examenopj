import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { Database } from '@/libs/supabase/types';
import type { SupabaseClient } from '@supabase/supabase-js';

type EngagementPrefsRow = {
  email_reminders_opt_in: boolean;
  theme_hint: Database['public']['Tables']['user_engagement_preferences']['Row']['theme_hint'];
  updated_at: string;
};

/**
 * GET/PATCH préférences engagement (opt-in emails, indice thème).
 * Le thème effectif reste piloté par `ThemeProvider` + localStorage côté client (`ThemeHintSync`).
 */
export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('user_engagement_preferences')
    .select('email_reminders_opt_in, theme_hint, updated_at')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const row = data as EngagementPrefsRow | null;

  return NextResponse.json({
    emailRemindersOptIn: row?.email_reminders_opt_in ?? false,
    themeHint: row?.theme_hint ?? null,
    updatedAt: row?.updated_at ?? null,
  });
}

export async function PATCH(req: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { emailRemindersOptIn?: boolean; themeHint?: 'light' | 'dark' | 'system' | null };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { data: cur } = await supabase
    .from('user_engagement_preferences')
    .select('email_reminders_opt_in, theme_hint')
    .eq('user_id', user.id)
    .maybeSingle();

  const curRow = cur as Pick<EngagementPrefsRow, 'email_reminders_opt_in' | 'theme_hint'> | null;

  const row: Database['public']['Tables']['user_engagement_preferences']['Insert'] = {
    user_id: user.id,
    email_reminders_opt_in:
      typeof body.emailRemindersOptIn === 'boolean' ? body.emailRemindersOptIn : (curRow?.email_reminders_opt_in ?? false),
    theme_hint: body.themeHint !== undefined ? body.themeHint : (curRow?.theme_hint ?? null),
    updated_at: new Date().toISOString(),
  };

  const { error } = await (supabase as unknown as SupabaseClient<Database>)
    .from('user_engagement_preferences')
    .upsert(row, { onConflict: 'user_id' });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
