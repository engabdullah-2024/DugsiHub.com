// app/api/admins/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth, clerkClient } from "@clerk/nextjs/server";

const ADMIN_EMAIL = "enga95311@gmail.com" as const;

/**
 * Utility: fetch the Clerk user's email (safe across providers)
 */
async function getUserEmail(userId: string): Promise<string | null> {
  const user = await clerkClient.users.getUser(userId);
  // Prefer primary email; fall back to first email if needed
  const primary = user.primaryEmailAddress?.emailAddress ?? null;
  if (primary) return primary.toLowerCase();
  const first = user.emailAddresses?.[0]?.emailAddress ?? null;
  return first ? first.toLowerCase() : null;
}

/**
 * Utility: ensure the super-admin record exists in DB if the
 * authenticated user IS the super-admin email.
 */
async function ensureSuperAdminProvisioned(opts: {
  clerkId: string;
  email: string;
}) {
  const existing = await prisma.admin.findUnique({
    where: { email: opts.email },
    select: { id: true },
  });

  if (!existing) {
    await prisma.admin.create({
      data: {
        clerkId: opts.clerkId,
        email: opts.email,
        fullName: "Super Admin", // optional; update later from profile if you want
      },
    });
  }
}

/**
 * GET /api/admins
 * Only the single super-admin can access this endpoint.
 * - Auth required
 * - Clerk email must equal ADMIN_EMAIL
 * - Auto-provisions the admin row on first access
 */
export async function GET(req: Request) {
  try {
    const { userId } = getAuth(req);

    // 1) Must be signed in
    if (!userId) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized access. Please log in." },
        { status: 401 }
      );
    }

    // 2) Load the user's email from Clerk
    const email = (await getUserEmail(userId)) ?? "";
    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Email not found for current user." },
        { status: 400 }
      );
    }

    // 3) Enforce single super-admin
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { ok: false, error: "Forbidden. Only the super admin can access this resource." },
        { status: 403 }
      );
    }

    // 4) Auto-provision the super-admin in DB (first-time login, etc.)
    await ensureSuperAdminProvisioned({ clerkId: userId, email });

    // 5) Return the (single) admin list
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { ok: true, count: admins.length, admins },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET /api/admins] Error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
