// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db";
import { User } from "../../../models/User";   // <-- use the alias

export const runtime = "nodejs";

const bodySchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8).regex(/[a-z]/).regex(/[A-Z]/).regex(/[0-9]/).regex(/[^A-Za-z0-9]/),
});

export async function POST(req: Request) {
  try {
    await dbConnect();  // will throw if MONGODB_URI missing → caught below

    const json = await req.json().catch(() => null);
    if (!json) return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });

    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: parsed.error.issues[0].message }, { status: 400 });
    }

    // Single super-admin rule
    const existingCount = await User.countDocuments();
    if (existingCount > 0) {
      return NextResponse.json(
        { ok: false, error: "Registration is locked: a super admin already exists." },
        { status: 409 }
      );
    }

    const emailLower = parsed.data.email.toLowerCase();
    const dup = await User.findOne({ email: emailLower });
    if (dup) {
      return NextResponse.json({ ok: false, error: "Email already in use." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    await User.create({
      firstName: parsed.data.firstName.trim(),
      lastName: parsed.data.lastName.trim(),
      email: emailLower,
      phone: parsed.data.phone?.trim(),
      passwordHash,
      role: "superadmin",
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[REGISTER]", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
