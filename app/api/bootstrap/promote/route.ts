import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const email = process.env.SUPERADMIN_EMAIL;
  if (!email) return NextResponse.json({ ok: false, error: "SUPERADMIN_EMAIL not set" }, { status: 400 });

  const existingConfig = await prisma.appConfig.findUnique({ where: { id: "app-config-singleton" } });

  if (existingConfig?.superadminUserId) {
    return NextResponse.json({ ok: false, error: "SuperAdmin already set" }, { status: 409 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ ok: false, error: "User with SUPERADMIN_EMAIL not found (sign in once first)" }, { status: 404 });
  }

  // Promote user
  await prisma.user.update({ where: { id: user.id }, data: { role: "SUPERADMIN" } });
  await prisma.appConfig.upsert({
    where: { id: "app-config-singleton" },
    create: { id: "app-config-singleton", superadminUserId: user.id },
    update: { superadminUserId: user.id },
  });

  return NextResponse.json({ ok: true });
}
