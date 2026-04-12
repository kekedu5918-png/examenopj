import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getSupabaseAdminClient } from '@/libs/supabase/supabase-admin';

const BODY = z.object({ email: z.string().email() });

const GENERIC_ERROR = 'Une erreur est survenue. Réessayez plus tard.';

function jsonGenericError(status: number) {
  return NextResponse.json({ error: GENERIC_ERROR }, { status });
}

export async function GET() {
  try {
    const sb = getSupabaseAdminClient();
    const { count, error } = await sb.from('waitlist').select('*', { count: 'exact', head: true });
    if (error) return jsonGenericError(500);
    return NextResponse.json({ count: count ?? 0 });
  } catch {
    return jsonGenericError(500);
  }
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps invalide' }, { status: 400 });
  }

  const parsed = BODY.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase().trim();

  try {
    const sb = getSupabaseAdminClient();

    const { error: insertError } = await sb.from('waitlist').insert({
      email,
      source: 'examen-blanc',
    });

    if (insertError?.code === '23505') {
      const { count, error: countError } = await sb.from('waitlist').select('*', { count: 'exact', head: true });
      if (countError) return jsonGenericError(500);
      return NextResponse.json({
        ok: true,
        message: 'Vous êtes déjà inscrit',
        count: count ?? 0,
      });
    }

    if (insertError) return jsonGenericError(500);

    const { count, error: countError } = await sb.from('waitlist').select('*', { count: 'exact', head: true });
    if (countError) return jsonGenericError(500);

    return NextResponse.json({ ok: true, count: count ?? 0 });
  } catch {
    return jsonGenericError(500);
  }
}
