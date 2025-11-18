// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

const RAW_ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "enga95311@gmail.com";
const ADMIN_EMAIL = RAW_ADMIN_EMAIL.trim().toLowerCase();

// Paths to protect (exact + subpaths)
const PROTECTED_PREFIXES = ["/dashboard"] as const;

// Decide if request expects HTML (so we redirect) vs. fetch/XHR (so we return 401/403)
function isHtmlRequest(req: NextRequest) {
  const accept = req.headers.get("accept") || "";
  const secFetchDest = req.headers.get("sec-fetch-dest") || "";
  return accept.includes("text/html") || secFetchDest === "document";
}

// Set some sane security headers on the way out
function withSecurityHeaders(res: NextResponse) {
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return res;
}

// Quick prefix match without allocating regexes
function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export default async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Skip if not protected
  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  // Clerk auth (edge-safe)
  const { userId } = auth();

  // 1) Not signed in
  if (!userId) {
    if (isHtmlRequest(req)) {
      // Preserve return path
      url.pathname = "/sign-in";
      url.searchParams.set("redirect_url", pathname);
      return withSecurityHeaders(NextResponse.redirect(url));
    }
    return withSecurityHeaders(
      NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 }),
    );
  }

  // 2) Load user & resolve primary email
  const user = await clerkClient.users.getUser(userId);
  const email =
    user.primaryEmailAddress?.emailAddress?.toLowerCase() ??
    user.emailAddresses?.[0]?.emailAddress?.toLowerCase() ??
    "";

  // 3) Enforce single-admin rule
  if (email !== ADMIN_EMAIL) {
    if (isHtmlRequest(req)) {
      const redirectUrl = new URL("/", req.url);
      // Optional: send them to a 403 page instead
      // redirectUrl.pathname = "/403";
      return withSecurityHeaders(NextResponse.redirect(redirectUrl));
    }
    return withSecurityHeaders(
      NextResponse.json({ ok: false, error: "Forbidden: admin only" }, { status: 403 }),
    );
  }

  // 4) Allow through
  return withSecurityHeaders(NextResponse.next());
}

// Match only what we need (keeps static/_next fast)
export const config = {
  matcher: ["/dashboard/:path*"],
};
