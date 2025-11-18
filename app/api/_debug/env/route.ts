// app/api/_debug/env/route.ts
import { NextResponse } from "next/server";
export async function GET() {
  if (process.env.NODE_ENV !== "development") return new Response("Not found", { status: 404 });
  return NextResponse.json({
    hasMongoUri: Boolean(process.env.MONGODB_URI),
    dbName: process.env.MONGODB_DB || "dugsi-hub",
  });
}
