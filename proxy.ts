import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolveEnterpriseDomain } from "@/lib/enterprise";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host");
  const { tenantId, domain, isCustomDomain } = resolveEnterpriseDomain(host);
  const pathname = request.nextUrl.pathname;

  // Enterprise session guard: protect /dashboard routes
  const token = request.cookies.get("luxima_auth_token")?.value;
  if (pathname.startsWith("/dashboard") && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect already authenticated user from /login to /dashboard
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Clone headers and inject enterprise multi-tenant context
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-tenant-id", tenantId);
  requestHeaders.set("x-enterprise-domain", domain);
  requestHeaders.set("x-is-custom-domain", isCustomDomain ? "true" : "false");
  requestHeaders.set("x-ecosystem-parent", "LUXIMA-AWEDZ");

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Inject response headers for edge caching & proxy verification
  response.headers.set("x-tenant-id", tenantId);
  response.headers.set("x-enterprise-powered-by", "LUXIMA-AWEDZ-ENTERPRISE");

  // Security & Best Practice headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Strict noindex for private internal routes
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/api")
  ) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return response;
}

export const middleware = proxy;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets/ (public static assets like images, fonts, pdfs)
     */
    "/((?!_next/static|_next/image|favicon.ico|assets/).*)",
  ],
};
