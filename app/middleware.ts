import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(_req: NextRequest) {
    // Role checks are done via callbacks below
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const url = req.nextUrl.pathname;

        // Public paths
        if (
          url.startsWith("/login") ||
          url.startsWith("/api/auth") ||
          url.startsWith("/quizzes") ||
          url === "/"
        ) return true;

        // Admin-only area
        if (url.startsWith("/sa")) {
          return token?.role === "SUPERADMIN";
        }

        // Protected API for subjects
        if (url.startsWith("/api/subjects")) {
          return token?.role === "SUPERADMIN";
        }

        // Default: must be signed in
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/sa/:path*",
    "/api/subjects/:path*",
    "/login",
  ],
};
