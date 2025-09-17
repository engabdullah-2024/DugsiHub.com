// app/api/env-check/route.ts
import { NextResponse } from "next/server";
export const runtime = "nodejs";

export async function GET() {
  const keys = ["RESEND_API_KEY", "CONTACT_TO", "CONTACT_FROM"];
  return NextResponse.json({
    present: Object.fromEntries(keys.map(k => [k, Boolean(process.env[k])])),
    runtime: process.env.NEXT_RUNTIME || "node",
  });
}
