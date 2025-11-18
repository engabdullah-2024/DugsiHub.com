// app/dashboard/layout.tsx
import { ReactNode } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface Props {
  children: ReactNode;
}

const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase() ?? "enga95311@gmail.com";

export default async function DashboardLayout({ children }: Props) {
  // 1) Must be signed in
  const user = await currentUser();
  if (!user) {
    // If you use Clerk's default, this is usually /sign-in
    // Keep /login if that's your custom route.
    redirect("/login");
  }

  // 2) Resolve the user's email
  const email =
    user.primaryEmailAddress?.emailAddress?.toLowerCase() ??
    user.emailAddresses?.[0]?.emailAddress?.toLowerCase() ??
    "";

  // 3) Only allow the admin email
  if (email !== ADMIN_EMAIL) {
    // Optionally create a /403 page and redirect there
    redirect("/");
  }

  return <div className="min-h-screen bg-white dark:bg-gray-900">{children}</div>;
}
