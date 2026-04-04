import { Resend } from 'resend';

import { getEnvVar } from '@/utils/get-env-var';

let resendSingleton: Resend | null = null;

/** Initialisation paresseuse : évite d’exiger `RESEND_API_KEY` au build si le module est importé. */
export function getResendClient(): Resend {
  if (!resendSingleton) {
    resendSingleton = new Resend(getEnvVar(process.env.RESEND_API_KEY, 'RESEND_API_KEY'));
  }
  return resendSingleton;
}
