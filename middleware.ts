import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, verifySessionToken } from './lib/adminAuth';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin dashboard keeps its own cookie-based auth guard and is never localized.
  if (pathname.startsWith('/admin/dashboard')) {
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    const valid = await verifySessionToken(token);
    if (!valid) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
    return NextResponse.next();
  }

  // The rest of /admin and all /api routes are also left unlocalized.
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Everything else (the public invite pages) goes through locale routing —
  // this is what resolves /en vs /ar (or redirects "/" based on Accept-Language)
  // before any HTML is sent, so there's no client-side flash.
  return intlMiddleware(req);
}

export const config = {
  // Run on everything except Next internals and files with an extension (images, etc.)
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};
