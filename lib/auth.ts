// lib/auth.ts
import { cookies } from "next/headers";
import { verifySession } from "@/lib/jwt";
import { dbConnect } from "@/lib/db";
import { User } from "../app/models/User";

export type CurrentUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "superadmin";
};

export async function currentUser(): Promise<CurrentUser | null> {
  const token = cookies().get("session")?.value;
  if (!token) return null;

  const payload = await verifySession<{ uid?: string; role?: string }>(token);
  if (!payload?.uid) return null;

  await dbConnect();
  const doc = await User.findById(payload.uid)
    .select("firstName lastName email role")
    .lean();
  if (!doc) return null;

  return {
    id: String(doc._id),
    firstName: doc.firstName,
    lastName: doc.lastName,
    email: doc.email,
    role: "superadmin",
  };
}
