import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if pathname is missing a supported language
  const pathnameIsMissingLocale = ["/en", "/es"].every(
    (locale) => !pathname.startsWith(`${locale}/`) && pathname !== locale,
  )

  // Redirect if there is no supported language in the pathname
  if (pathnameIsMissingLocale && pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url))
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc.)
    "/((?!_next|api|favicon.ico).*)",
  ],
}
