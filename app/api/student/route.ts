// app/api/student/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

/**
 * GET /api/student
 * Fetch all papers accessible to the student.
 */
export async function GET(req: Request) {
  try {
    const { userId } = getAuth(req);

    // Ensure the request is authenticated
    if (!userId) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized access. Please log in." },
        { status: 401 }
      );
    }

    // Optionally: verify the user is a student
    const student = await prisma.student.findUnique({
      where: { clerkId: userId },
      select: { id: true, firstName: true, lastName: true },
    });

    if (!student) {
      return NextResponse.json(
        { ok: false, error: "Forbidden. Only students can access this resource." },
        { status: 403 }
      );
    }

    // Fetch papers for students
    const papers = await prisma.paper.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { ok: true, count: papers.length, papers },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET /api/student] Error fetching papers:", error);

    return NextResponse.json(
      { ok: false, error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

/**
 * Block POST requests to this endpoint
 */
export async function POST(req: Request) {
  return NextResponse.json(
    { ok: false, error: "POST method not allowed on this endpoint." },
    { status: 405 }
  );
}
