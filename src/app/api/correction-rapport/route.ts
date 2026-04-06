import { NextResponse } from 'next/server';
import { z } from 'zod';

import { hasPremiumAccess } from '@/features/account/controllers/has-premium-access';

const bodySchema = z.object({
  kind: z.enum(['rapport-synthese', 'procedure-reponse']),
  texte: z.string().min(20).max(60000),
  contexte: z.string().max(25000).optional(),
  intituleQuestion: z.string().max(4000).optional(),
});

function systemPrompt(kind: 'rapport-synthese' | 'procedure-reponse'): string {
  if (kind === 'rapport-synthese') {
    return `Tu es un correcteur expert pour l'examen d'Officier de Police Judiciaire (France). Tu corriges un RAPPORT DE SYNTHÈSE rédigé par un candidat et destiné au Procureur de la République.

Attendus : ton professionnel, neutre et factuel ; respect de la structuration parquet (faits établis / charges / décharges / qualification / suites) ; citations d'articles uniquement si tu es certain — sinon signale prudemment de vérifier sur Légifrance.

Réponds en français : d'abord une note indicative sur 20 (justifiée en 2–3 phrases), puis une liste à puces des points forts, des erreurs ou imprécisions, et des pistes d'amélioration concrètes. Ne moralises pas ; reste pédagogique.`;
  }
  return `Tu corriges une RÉPONSE D'ÉPREUVE DE PROCÉDURE (OPJ) : PV, articulation, qualification ou court rapport au parquet.

Réponds en français avec une note sur 20 commentée brièvement, puis conseils ciblés (structure, mentions légales, cohérence procédurale). Rappelle de vérifier les textes sur Légifrance.`;
}

function fallbackCorrection(kind: 'rapport-synthese' | 'procedure-reponse'): string {
  const base =
    kind === 'rapport-synthese'
      ? `**Note indicative : 10/20** (mode hors IA — configurez OPENAI_API_KEY pour une correction détaillée)\n\n`
      : `**Note indicative : 10/20** (mode hors IA)\n\n`;
  return (
    base +
    `- Vérifiez la **chronologie** des faits et les sources (pièces citées).\n` +
    `- Séparez clairement **faits établis** et **hypothèses**.\n` +
    `- Contrôlez les **qualifications** et les **articles** sur Légifrance.\n` +
    `- Pour le parquet : **suites possibles** réalistes et proportionnées.\n`
  );
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

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Paramètres invalides', details: parsed.error.flatten() }, { status: 400 });
  }

  const { kind, texte, contexte, intituleQuestion } = parsed.data;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ correction: fallbackCorrection(kind), mode: 'fallback' as const });
  }

  const userContent = [
    contexte ? `Contexte dossier / consigne :\n${contexte}\n` : '',
    intituleQuestion ? `Question ou intitulé :\n${intituleQuestion}\n` : '',
    `Copie du candidat :\n${texte}`,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
        temperature: 0.35,
        messages: [
          { role: 'system', content: systemPrompt(kind) },
          { role: 'user', content: userContent },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      console.error('[correction-rapport] OpenAI', res.status, errText);
      return NextResponse.json({ correction: fallbackCorrection(kind), mode: 'fallback' as const });
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) {
      return NextResponse.json({ correction: fallbackCorrection(kind), mode: 'fallback' as const });
    }
    return NextResponse.json({ correction: text, mode: 'openai' as const });
  } catch (e) {
    console.error('[correction-rapport]', e);
    return NextResponse.json({ correction: fallbackCorrection(kind), mode: 'fallback' as const });
  }
}
