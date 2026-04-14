import { Resend } from 'resend';

import { getSupabaseAdminClient } from '@/libs/supabase/supabase-admin';
import { getSiteUrl } from '@/utils/site-url';
import type { SupabaseClient } from '@supabase/supabase-js';

const MAX_BATCH = 40;

function buildReminderHtml(siteUrl: string): string {
  const parcours = `${siteUrl}/dashboard/parcours`;
  const compte = `${siteUrl}/account#preferences-email`;
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:24px;font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#0f172a;background:#f8fafc;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;">
    <tr><td style="padding:20px 0 8px;font-size:18px;font-weight:600;color:#0c1b33;">ExamenOPJ</td></tr>
    <tr><td style="padding:8px 0 16px;font-size:15px;color:#334155;">
      Bonjour,<br/><br/>
      Un rappel pour avancer sur votre préparation à l’examen OPJ — même une courte session renforce vos automatismes.
    </td></tr>
    <tr><td style="padding:0 0 20px;">
      <a href="${parcours}" style="display:inline-block;padding:12px 20px;background:#0891b2;color:#fff;text-decoration:none;border-radius:10px;font-weight:600;">Ouvrir mon parcours</a>
    </td></tr>
    <tr><td style="padding:12px 0;font-size:12px;color:#64748b;border-top:1px solid #e2e8f0;">
      Vous recevez ce message car les rappels sont activés dans votre compte.
      <a href="${compte}" style="color:#0891b2;">Gérer mes préférences</a>
    </td></tr>
  </table>
</body>
</html>`;
}

export type EmailRemindersCronResult = {
  ok: boolean;
  mode: 'sent' | 'dry_run' | 'disabled';
  eligible: number;
  sent: number;
  failed: number;
  message?: string;
};

/**
 * Cron quotidien : utilisateurs avec `email_reminders_opt_in` — envoi via Resend si `RESEND_API_KEY` est défini.
 * Garde-fous : `MAX_BATCH`, pas d’envoi sans clé Resend (dry-run avec décompte).
 */
export async function runEmailRemindersCron(): Promise<EmailRemindersCronResult> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return {
      ok: false,
      mode: 'disabled',
      eligible: 0,
      sent: 0,
      failed: 0,
      message: 'SUPABASE_SERVICE_ROLE_KEY manquant',
    };
  }

  const admin = getSupabaseAdminClient() as unknown as SupabaseClient<any>;
  const { data: rows, error } = await admin
    .from('user_engagement_preferences')
    .select('user_id')
    .eq('email_reminders_opt_in', true);

  if (error) {
    return {
      ok: false,
      mode: 'disabled',
      eligible: 0,
      sent: 0,
      failed: 0,
      message: error.message,
    };
  }

  const ids = [...new Set((rows ?? []).map((r: { user_id: string }) => r.user_id))].slice(0, MAX_BATCH);
  const siteUrl = getSiteUrl();
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    return {
      ok: true,
      mode: 'dry_run',
      eligible: ids.length,
      sent: 0,
      failed: 0,
      message: 'RESEND_API_KEY absent — aucun envoi (configurez Resend en prod)',
    };
  }

  const from = process.env.RESEND_FROM_EMAIL ?? 'ExamenOPJ <onboarding@resend.dev>';
  const resend = new Resend(resendKey);
  const html = buildReminderHtml(siteUrl);

  let sent = 0;
  let failed = 0;

  for (let i = 0; i < ids.length; i++) {
    const userId = ids[i];
    try {
      const { data: authData, error: authErr } = await admin.auth.admin.getUserById(userId);
      if (authErr || !authData?.user?.email) {
        failed += 1;
        continue;
      }
      const sendResult = await resend.emails.send({
        from,
        to: authData.user.email,
        subject: 'ExamenOPJ — Poursuivre votre préparation',
        html,
      });
      if (sendResult.error) {
        failed += 1;
      } else {
        sent += 1;
      }
    } catch {
      failed += 1;
    }
    if (i % 8 === 7 && i < ids.length - 1) {
      await new Promise((r) => setTimeout(r, 120));
    }
  }

  return {
    ok: true,
    mode: 'sent',
    eligible: ids.length,
    sent,
    failed,
  };
}
