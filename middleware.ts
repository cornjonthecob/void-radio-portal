import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  // Always create a response and tag it so we can detect middleware on the client
  const res = NextResponse.next()
  res.headers.set('x-mw', '1')

  const { pathname } = req.nextUrl

  // Public routes that should never be blocked or redirected
  const isPublic =
    pathname === '/login' ||
    pathname === '/auth/callback' ||
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'

  if (isPublic) {
    return res
  }

  try {
    const supabase = createMiddlewareClient({ req, res })
    const { data: { session } } = await supabase.auth.getSession()

    // If not signed in, redirect to /login and (optionally) preserve origin
    if (!session) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      // Optionally keep where they came from:
      // url.searchParams.set('redirectedFrom', pathname)
      return NextResponse.redirect(url)
    }

    // Signed in: allow access
    return res
  } catch (_err) {
    // On any middleware/auth error, never blank the page — just allow render
    return res
  }
}

export const config = {
  // Run on all app routes; skip API, Next assets, and files with extensions
  matcher: ['/((?!api/|_next/|.*\\..*).*)'],
}
