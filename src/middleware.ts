import { type NextRequest, NextResponse } from 'next/server';

import { updateSession } from '@/libs/supabase/supabase-middleware-client';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/cours-texte')) {
    return new NextResponse(null, { status: 404, statusText: 'Not Found' });
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, fonts, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?)$).*)',
  ],
};
