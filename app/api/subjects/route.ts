import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { zSubjectUpsert } from "@/lib/validations";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const rows = await prisma.subject.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "SUPERADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const payload = await req.json();
  const parsed = zSubjectUpsert.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { name, slug, desc } = parsed.data;
  const created = await prisma.subject.create({ data: { name, slug, desc } });
  return NextResponse.json(created, { status: 201 });
}
