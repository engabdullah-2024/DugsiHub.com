// app/api/papers/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Paper } from "../../models/Paper";
import { verifySession } from "@/lib/jwt";
import { cookies } from "next/headers";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 60; // allow bigger uploads if needed

// Optional: Vercel Blob (recommended on Vercel)
let putBlob: undefined | ((...args: any[]) => any);
try {
  // lazy import so dev works without the pkg/env
  // npm i @vercel/blob
  // Add env: BLOB_READ_WRITE_TOKEN (Vercel Project Settings)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  putBlob = require("@vercel/blob").put;
} catch {}

const formSchema = z.object({
  subject: z.string().min(2).max(120),
  pages: z.coerce.number().int().min(1).max(2000),
});

function sanitizeFilename(name: string) {
  return name.replace(/[^\w.-]+/g, "_").slice(0, 140);
}

export async function POST(req: Request) {
  try {
    // Auth: only superadmin can upload
    const token = cookies().get("session")?.value;
    const payload = token ? await verifySession<{ uid?: string; role?: string }>(token) : null;
    if (!payload?.uid || payload.role !== "superadmin") {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    // Parse form-data
    const form = await req.formData();
    const subject = String(form.get("subject") || "");
    const pagesVal = form.get("pages");
    const file = form.get("file");

    // Validate fields
    const parsed = formSchema.safeParse({ subject, pages: pagesVal });
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json({ ok: false, error: msg }, { status: 400 });
    }
    const pages = parsed.data.pages;

    // Validate file
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "Missing file" }, { status: 400 });
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json({ ok: false, error: "Only PDF files are allowed" }, { status: 400 });
    }
    // Basic size guard (~25MB example)
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > 25) {
      return NextResponse.json({ ok: false, error: "File too large (max 25MB)" }, { status: 413 });
    }

    // Store file (Vercel Blob if token present; else local dev)
    let fileUrl = "";
    let fileKey: string | undefined;
    const baseName = sanitizeFilename(file.name || "paper.pdf");
    const key = `papers/${Date.now()}-${baseName}`;

    if (putBlob && process.env.BLOB_READ_WRITE_TOKEN) {
      // Vercel Blob path
      const { url } = await (putBlob as any)(
        key,
        file,
        { access: "public", token: process.env.BLOB_READ_WRITE_TOKEN }
      );
      fileUrl = url;
      fileKey = key;
    } else {
      // Local dev fallback: public/uploads
      // WARNING: Ephemeral in serverless. For prod, use Blob or S3.
      const arrayBuf = await file.arrayBuffer();
      const buf = Buffer.from(arrayBuf);
      const fs = await import("fs/promises");
      const path = await import("path");
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadDir, { recursive: true });
      const dest = path.join(uploadDir, baseName);
      await fs.writeFile(dest, buf);
      fileUrl = `/uploads/${baseName}`;
      fileKey = undefined;
    }

    await dbConnect();
    const doc = await Paper.create({
      subject,
      pages,
      fileUrl,
      fileKey,
      fileName: baseName,
      createdBy: payload.uid,
    });

    return NextResponse.json(
      { ok: true, paper: { id: String(doc._id), subject, pages, fileUrl, fileName: baseName } },
      { status: 201 }
    );
  } catch (err) {
    console.error("[PAPERS/POST]", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

// Optional: fetch latest papers (for dashboard list)
export async function GET() {
  try {
    const token = cookies().get("session")?.value;
    const payload = token ? await verifySession<{ uid?: string; role?: string }>(token) : null;
    if (!payload?.uid || payload.role !== "superadmin") {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    await dbConnect();
    const rows = await Paper.find().sort({ createdAt: -1 }).limit(12).lean();
    return NextResponse.json({
      ok: true,
      papers: rows.map((r) => ({
        id: String(r._id),
        subject: r.subject,
        pages: r.pages,
        fileUrl: r.fileUrl,
        fileName: r.fileName,
        createdAt: r.createdAt,
      })),
    });
  } catch (err) {
    console.error("[PAPERS/GET]", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
