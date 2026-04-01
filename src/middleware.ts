import { NextResponse, type NextRequest } from 'next/server';

import { updateSession } from '@/libs/supabase/supabase-middleware-client';

export async function middleware(request: NextRequest) {
  try {
    return await updateSession(request);
  } catch (error) {
    console.error('[middleware] updateSession failed:', error);
    // Évite un 500 global (MIDDLEWARE_INVOCATION_FAILED) si env Supabase absente / erreur Edge.
    // La session ne sera pas rafraîchie sur cette requête ; vérifier les variables Vercel.
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
