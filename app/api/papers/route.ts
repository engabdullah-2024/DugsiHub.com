// app/api/papers/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Buffer } from "node:buffer";
import { z } from "zod";

import { dbConnect } from "@/lib/db";
import { Paper } from "../../models/Paper";
import { verifySession } from "@/lib/jwt";

export const runtime = "nodejs";
export const maxDuration = 60;

// ---- Types to avoid `any` -----------------------------------------------
type BlobPutOptions = {
  access?: "public" | "private";
  token?: string;
  contentType?: string;
  cacheControlMaxAge?: number;
  addRandomSuffix?: boolean;
};

type BlobPutFn = (
  key: string,
  body: Blob | ArrayBuffer | Uint8Array | File,
  opts?: BlobPutOptions
) => Promise<{ url: string }>;

type VercelBlobModule = { put: BlobPutFn };
// -------------------------------------------------------------------------

const formSchema = z.object({
  subject: z.string().min(2).max(120),
  pages: z.coerce.number().int().min(1).max(2000),
});

function sanitizeFilename(name: string) {
  return name.replace(/[^\w.-]+/g, "_").slice(0, 140);
}

/**
 * Dynamically load @vercel/blob only when the token exists.
 * Using an eval'd dynamic import to prevent bundlers from resolving
 * the package at build time if it's not installed in dev.
 */
async function maybeGetPutBlob(): Promise<BlobPutFn | undefined> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return undefined;
  try {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const mod = (await new Function("m", "return import(m)")(
      "@vercel/blob"
    )) as VercelBlobModule;
    return mod.put;
  } catch {
    return undefined;
  }
}

export async function POST(req: Request) {
  try {
    // Auth: only superadmin can upload
    const token = cookies().get("session")?.value;
    const payload = token
      ? await verifySession<{ uid?: string; role?: string }>(token)
      : null;
    if (!payload?.uid || payload.role !== "superadmin") {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    // Parse & validate form
    const form = await req.formData();
    const subject = String(form.get("subject") || "");
    const pagesVal = form.get("pages");
    const file = form.get("file");

    const parsed = formSchema.safeParse({ subject, pages: pagesVal });
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json({ ok: false, error: msg }, { status: 400 });
    }
    const pages = parsed.data.pages;

    // File checks
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "Missing file" }, { status: 400 });
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json({ ok: false, error: "Only PDF files are allowed" }, { status: 400 });
    }
    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json({ ok: false, error: "File too large (max 25MB)" }, { status: 413 });
    }

    const baseName = sanitizeFilename(file.name || "paper.pdf");
    const key = `papers/${Date.now()}-${baseName}`;

    let fileUrl = "";
    let fileKey: string | undefined;

    const putBlob = await maybeGetPutBlob();
    if (putBlob) {
      // Vercel Blob (prod)
      const { url } = await putBlob(key, file, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      fileUrl = url;
      fileKey = key;
    } else {
      // Dev/local fallback — write to /public/uploads (ephemeral on serverless)
      const arrayBuf = await file.arrayBuffer();
      const buf = Buffer.from(arrayBuf);
      const fs = await import("node:fs/promises");
      const path = await import("node:path");

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
      {
        ok: true,
        paper: {
          id: String(doc._id),
          subject,
          pages,
          fileUrl,
          fileName: baseName,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[PAPERS/POST]", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const token = cookies().get("session")?.value;
    const payload = token
      ? await verifySession<{ uid?: string; role?: string }>(token)
      : null;
    if (!payload?.uid || payload.role !== "superadmin") {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const rows = await Paper.find().sort({ createdAt: -1 }).limit(12).lean();
    return NextResponse.json({
      ok: true,
      papers: rows.map((r) => ({
        id: String(r._id),
        subject: r.subject as string,
        pages: r.pages as number,
        fileUrl: r.fileUrl as string,
        fileName: r.fileName as string,
        createdAt: r.createdAt as Date,
      })),
    });
  } catch (err) {
    console.error("[PAPERS/GET]", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
