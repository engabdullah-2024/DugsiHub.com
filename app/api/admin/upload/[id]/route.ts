// app/api/uploads/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = params;

    // Server-side authentication
    const { userId } = getAuth({
      headers: (req as any).headers,
      cookies: (req as any).headers?.get("cookie") || "",
    } as any);

    if (!userId) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    // Fetch document from MongoDB
    const doc = await prisma.document.findUnique({
      where: { id },
      select: {
        fileData: true,
        fileName: true,
        contentType: true,
        fileSize: true,
        adminId: true,
      },
    });

    if (!doc || !doc.fileData) {
      return NextResponse.json({ ok: false, error: "Document not found" }, { status: 404 });
    }

    // Optional: Only allow owner/admin to access
    if (doc.adminId !== userId) {
      // If you want all authenticated users to access, remove this check
      // return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
    }

    // Build response with proper headers
    const headers = new Headers();
    headers.set("Content-Type", doc.contentType || "application/pdf");
    headers.set("Content-Length", String(doc.fileSize || 0));
    headers.set("Content-Disposition", `inline; filename="${encodeURIComponent(doc.fileName)}"`);

    return new NextResponse(Buffer.from(doc.fileData as ArrayBuffer | Buffer), {
      status: 200,
      headers,
    });
  } catch (err: any) {
    console.error("Download Error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
