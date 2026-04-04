import type { AuthError } from '@supabase/supabase-js';

/** Message lisible pour l’utilisateur (codes / textes Supabase Auth). */
export function describeAuthError(error: AuthError): string {
  const code = error.code ?? '';
  const msg = (error.message || '').toLowerCase();

  if (code === 'email_not_confirmed' || msg.includes('email not confirmed')) {
    return 'Confirmez votre adresse e-mail via le lien reçu avant de vous connecter.';
  }
  if (code === 'invalid_credentials' || msg.includes('invalid login credentials')) {
    return 'E-mail ou mot de passe incorrect. Si vous venez de vous inscrire, ouvrez d’abord le lien de confirmation.';
  }
  if (
    code === 'user_already_exists' ||
    msg.includes('user already registered') ||
    msg.includes('already been registered')
  ) {
    return 'Un compte existe déjà avec cet e-mail. Essayez de vous connecter.';
  }
  if (code === 'weak_password' || msg.includes('password')) {
    return 'Mot de passe trop faible (ex. longueur minimum ou complexité).';
  }
  if (msg.includes('redirect') && msg.includes('url')) {
    return 'URL de redirection refusée : vérifiez les « Redirect URLs » et la Site URL dans Supabase (Auth).';
  }

  return error.message || 'Une erreur d’authentification est survenue. Réessayez.';
}
