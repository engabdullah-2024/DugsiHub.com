// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db";
import { User } from "../../../models/User";
import { signSession } from "@/lib/jwt";

export const runtime = "nodejs";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  remember: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    await dbConnect();

    const json = await req.json().catch(() => null);
    if (!json) {
      return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid payload" },
        { status: 400 }
      );
    }

    const email = parsed.data.email.toLowerCase().trim();
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signSession(
      { uid: String(user._id), role: user.role },
      parsed.data.remember ? "30d" : "7d"
    );

    const res = NextResponse.json({ ok: true }, { status: 200 });
    res.cookies.set("session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // only secure in prod
      path: "/",
      maxAge: parsed.data.remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7,
    });
    return res;
  } catch (err) {
    // Common causes: missing AUTH_SECRET (see lib/jwt.ts), DB connectivity
    console.error("[LOGIN]", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
