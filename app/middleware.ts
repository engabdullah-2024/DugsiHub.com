// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/jwt";

const PROTECTED = ["/dashboard", "/admin"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow API, Next internals, and public assets
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.match(/\.(png|jpg|jpeg|webp|svg|gif|ico|css|js|map|txt)$/)
  ) {
    return NextResponse.next();
  }

  // Allow auth pages
  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.next();
  }

  // Guard protected pages
  if (PROTECTED.some((p) => pathname.startsWith(p))) {
    const token = req.cookies.get("session")?.value;
    const session = token ? await verifySession(token) : null;
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // We still run on all pages, but checks above allow/skip quickly
  matcher: ["/((?!_next/static|_next/image).*)"],
};
