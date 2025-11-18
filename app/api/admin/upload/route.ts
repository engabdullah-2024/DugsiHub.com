import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs"; // required to handle Buffer

export async function POST(req: Request) {
  try {
    // Authenticate user
    const { userId } = getAuth({
      headers: req.headers,
      cookies: req.headers.get("cookie") || "",
    });

    if (!userId) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const form = await req.formData();

    // Extract form fields
    const file = form.get("file") as File | null;
    const rawTitle = (form.get("title") as string | null)?.trim() || "";
    const rawName = (form.get("name") as string | null)?.trim() || "";
    const totalPages = Math.max(0, Number(form.get("totalPages") as string) || 0);

    // Validate fields
    if (!file) {
      return NextResponse.json({ ok: false, error: "File is required" }, { status: 400 });
    }

    if (!rawTitle) {
      return NextResponse.json({ ok: false, error: "Title is required" }, { status: 400 });
    }

    if (!rawName) {
      return NextResponse.json({ ok: false, error: "Name is required" }, { status: 400 });
    }

    // Validate PDF type
    const allowedTypes = ["application/pdf"];
    const contentType = file.type || "application/octet-stream";
    if (!allowedTypes.includes(contentType)) {
      return NextResponse.json({ ok: false, error: "Only PDF uploads allowed" }, { status: 400 });
    }

    // Limit size to 20MB
    const MAX_BYTES = 20 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ ok: false, error: "File too large (max 20MB)" }, { status: 400 });
    }

    // Read file into buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Clean file name
    const safeFileName = (rawName || file.name || "file.pdf")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .slice(0, 200);

    // Save in MongoDB (Prisma)
    const doc = await prisma.document.create({
      data: {
        title: rawTitle,
        name: safeFileName,
        totalPages,
        fileName: safeFileName,
        contentType,
        fileSize: file.size,
        fileData: buffer,
        adminId: userId, // Clerk userId is string
      },
      select: {
        id: true,
        title: true,
        name: true,
        totalPages: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ ok: true, doc }, { status: 201 });
  } catch (err: any) {
    console.error("Upload Error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
