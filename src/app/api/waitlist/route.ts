import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';

import { getSupabaseAdminClient } from '@/libs/supabase/supabase-admin';

const BODY = z.object({ email: z.string().email() });

const BASE_COUNT = 1;
const FILE = path.join(process.cwd(), 'data', 'waitlist-examen-blanc.json');

type FileStore = { emails: string[] };

async function readFileStore(): Promise<FileStore> {
  try {
    const raw = await fs.readFile(FILE, 'utf8');
    const j: unknown = JSON.parse(raw);
    if (!j || typeof j !== 'object' || !Array.isArray((j as FileStore).emails)) return { emails: [] };
    return { emails: (j as FileStore).emails.filter((e): e is string => typeof e === 'string') };
  } catch {
    return { emails: [] };
  }
}

async function writeFileStore(emails: string[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify({ emails }, null, 2), 'utf8');
}

async function countViaSupabase(): Promise<number | null> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  try {
    const sb = getSupabaseAdminClient();
    const { count, error } = await sb.from('examen_blanc_waitlist').select('*', { count: 'exact', head: true });
    if (error) return null;
    return BASE_COUNT + (count ?? 0);
  } catch {
    return null;
  }
}

async function addViaSupabase(email: string): Promise<number | null> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  try {
    const sb = getSupabaseAdminClient();
    const { error: insErr } = await sb.from('examen_blanc_waitlist').insert({ email });
    if (insErr && insErr.code !== '23505') return null;
    return countViaSupabase();
  } catch {
    return null;
  }
}

export async function GET() {
  const n = await countViaSupabase();
  if (n !== null) return NextResponse.json({ count: n });
  const { emails } = await readFileStore();
  return NextResponse.json({ count: BASE_COUNT + emails.length });
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps invalide' }, { status: 400 });
  }
  const parsed = BODY.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
  const email = parsed.data.email.toLowerCase().trim();

  const fromDb = await addViaSupabase(email);
  if (fromDb !== null) return NextResponse.json({ ok: true, count: fromDb });

  let { emails } = await readFileStore();
  if (!emails.includes(email)) emails = [...emails, email];
  try {
    await writeFileStore(emails);
  } catch {
    return NextResponse.json({ error: 'Enregistrement impossible (serveur).' }, { status: 503 });
  }
  return NextResponse.json({ ok: true, count: BASE_COUNT + emails.length });
}
