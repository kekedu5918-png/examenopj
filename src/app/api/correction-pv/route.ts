import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getSujetRedactionPVById } from '@/data/sujets-redaction-pv';
import { hasPremiumAccess } from '@/features/account/controllers/has-premium-access';

const bodySchema = z.object({
  sujetId: z.string().min(1).max(200),
  redaction: z.string().min(10).max(120_000),
});

const elementSchema = z.object({
  intitule: z.string(),
  statut: z.enum(['present', 'absent', 'incomplet']),
  commentaire: z.string(),
});

const resultSchema = z.object({
  note: z.number().min(0).max(20),
  elements: z.array(elementSchema),
  pointsForts: z.array(z.string()),
  pointsAmeliorer: z.array(z.string()),
  commentaireGeneral: z.string(),
});

type CorrectionPVResult = z.infer<typeof resultSchema>;

const SYSTEM_PROMPT = `Tu es un correcteur expert de l'examen OPJ (Officier de
Police Judiciaire) en France. Tu évalues des procès-verbaux rédigés
par des candidats à cet examen.

Tu dois corriger avec le niveau d'exigence d'un commissaire
expérimenté ou d'un magistrat. Sois précis, pédagogique et juste.

Tu retournes UNIQUEMENT un JSON valide (sans markdown, sans backticks)
avec cette structure exacte :
{
  "note": number (0-20),
  "elements": [
    {
      "intitule": string,
      "statut": "present" | "absent" | "incomplet",
      "commentaire": string
    }
  ],
  "pointsForts": string[],
  "pointsAmeliorer": string[],
  "commentaireGeneral": string
}`;

const UNAVAILABLE = 'La correction est temporairement indisponible. Réessayez.';

function extractJsonObject(raw: string): string {
  const t = raw.trim();
  const fenced = t.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced?.[1]) return fenced[1]!.trim();
  const start = t.indexOf('{');
  const end = t.lastIndexOf('}');
  if (start >= 0 && end > start) return t.slice(start, end + 1);
  return t;
}

async function fetchAnthropicCorrection(userText: string, apiKey: string): Promise<CorrectionPVResult | null> {
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), 30_000);
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        temperature: 0.25,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userText }],
      }),
    });
    if (!res.ok) {
      const err = await res.text().catch(() => '');
      console.error('[correction-pv] Anthropic', res.status, err);
      return null;
    }
    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    const text = data.content?.find((b) => b.type === 'text')?.text?.trim();
    if (!text) return null;
    const jsonStr = extractJsonObject(text);
    const parsed = JSON.parse(jsonStr) as unknown;
    const safe = resultSchema.safeParse(parsed);
    if (!safe.success) {
      console.error('[correction-pv] Zod', safe.error.flatten());
      return null;
    }
    return safe.data;
  } finally {
    clearTimeout(tid);
  }
}

export async function POST(req: Request) {
  if (!(await hasPremiumAccess())) {
    return NextResponse.json({ error: 'Abonnement Premium requis.' }, { status: 403 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON invalide' }, { status: 400 });
  }

  const parsedBody = bodySchema.safeParse(json);
  if (!parsedBody.success) {
    return NextResponse.json({ error: 'Paramètres invalides', details: parsedBody.error.flatten() }, { status: 400 });
  }

  const { sujetId, redaction } = parsedBody.data;
  const sujet = getSujetRedactionPVById(sujetId);
  if (!sujet) {
    return NextResponse.json({ error: 'Sujet introuvable.' }, { status: 404 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: UNAVAILABLE }, { status: 503 });
  }

  const userPrompt = `Sujet : ${sujet.miseEnSituation}
Éléments obligatoires à vérifier : ${sujet.elementsObligatoires.join(' ; ')}
Copie du candidat : ${redaction}`;

  let result = await fetchAnthropicCorrection(userPrompt, apiKey);
  if (!result) {
    result = await fetchAnthropicCorrection(userPrompt, apiKey);
  }
  if (!result) {
    return NextResponse.json({ error: UNAVAILABLE }, { status: 503 });
  }

  return NextResponse.json({ result });
}
