// app/u/layout.tsx
import type { ReactNode } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase() ?? "enga95311@gmail.com";

export default async function UserLayout({ children }: { children: ReactNode }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const email =
    user.primaryEmailAddress?.emailAddress?.toLowerCase() ??
    user.emailAddresses?.[0]?.emailAddress?.toLowerCase() ??
    "";

  // Block admin from /u
  if (email === ADMIN_EMAIL) {
    redirect("/dashboard");
  }

  // Optional: keep a simple page chrome for user area
  return (
    <div className="min-h-screen bg-neutral-50 text-slate-900 dark:bg-neutral-900 dark:text-slate-50">
      {children}
    </div>
  );
}
