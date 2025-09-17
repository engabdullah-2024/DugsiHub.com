// app/sa/page.tsx
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  ShieldCheck,
  BookOpenCheck,
  Users,
  Settings,
  ChevronRight,
  Database,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SuperAdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "SUPERADMIN") {
    // Middleware should already protect this route, but keep a guard
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Forbidden</h1>
        <p className="mt-2 text-muted-foreground">You need SuperAdmin access.</p>
      </main>
    );
  }

  // Quick stats from existing models (schema earlier)
  const [subjectsCount, usersCount, lastSubjects] = await Promise.all([
    prisma.subject.count(),
    prisma.user.count(),
    prisma.subject.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, slug: true, createdAt: true },
    }),
  ]);

  const displayName = session.user.name ?? "SuperAdmin";
  const displayImage = session.user.image ?? undefined;

  return (
    <main className="relative">
      {/* Soft page glow (light/dark) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[380px] bg-gradient-to-b from-emerald-50/70 via-white to-white dark:from-emerald-500/12 dark:via-slate-950 dark:to-slate-950" />

      <section className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
              <Sparkles className="size-3.5" />
              SuperAdmin Dashboard
            </div>
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Welcome back, <span className="text-emerald-600 dark:text-emerald-400">{displayName}</span>
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              Manage subjects, users, and platform settings. All actions here are restricted to the single SuperAdmin.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="border-none bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                Role: SuperAdmin
              </Badge>
              <Badge variant="secondary" className="border-none">
                Always in Somali
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative size-14 overflow-hidden rounded-full ring-2 ring-emerald-200 dark:ring-emerald-800">
              {displayImage ? (
                <Image src={displayImage} alt={displayName} fill sizes="56px" className="object-cover" />
              ) : (
                <div className="flex size-full items-center justify-center bg-emerald-100 text-lg font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-muted-foreground/10 dark:border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Subjects</CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <div className="text-3xl font-semibold">{subjectsCount}</div>
              <BookOpenCheck className="size-6 text-emerald-600 dark:text-emerald-400" />
            </CardContent>
          </Card>

          <Card className="border-muted-foreground/10 dark:border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Users</CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <div className="text-3xl font-semibold">{usersCount}</div>
              <Users className="size-6 text-emerald-600 dark:text-emerald-400" />
            </CardContent>
          </Card>

          <Card className="border-muted-foreground/10 dark:border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Security</CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <div className="text-3xl font-semibold">Single</div>
              <ShieldCheck className="size-6 text-emerald-600 dark:text-emerald-400" />
            </CardContent>
          </Card>

          <Card className="border-muted-foreground/10 dark:border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Database</CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <div className="text-3xl font-semibold">Mongo</div>
              <Database className="size-6 text-emerald-600 dark:text-emerald-400" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr,420px]">
          {/* Management Quick Actions */}
          <Card className="border-muted-foreground/10 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Management</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/sa/subjects" className="group rounded-xl border p-4 transition hover:border-emerald-300 dark:border-slate-800 dark:hover:border-emerald-700">
                <div className="mb-2 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2">
                    <BookOpenCheck className="size-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-medium">Subjects</span>
                  </div>
                  <ChevronRight className="size-5 text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Add, edit, and delete subjects used across quizzes.
                </p>
              </Link>

              <Link href="/sa/users" className="group rounded-xl border p-4 transition hover:border-emerald-300 dark:border-slate-800 dark:hover:border-emerald-700">
                <div className="mb-2 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2">
                    <Users className="size-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-medium">Users</span>
                  </div>
                  <ChevronRight className="size-5 text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  View and manage user accounts and roles (read-only; role is fixed to SuperAdmin for you).
                </p>
              </Link>

              <Link href="/sa/settings" className="group rounded-xl border p-4 transition hover:border-emerald-300 dark:border-slate-800 dark:hover:border-emerald-700">
                <div className="mb-2 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2">
                    <Settings className="size-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-medium">Settings</span>
                  </div>
                  <ChevronRight className="size-5 text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Platform preferences (theme, branding, read-only security overview).
                </p>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activity (Subjects) */}
          <Card className="border-muted-foreground/10 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Recent Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              {lastSubjects.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recent subjects.</p>
              ) : (
                <ul className="space-y-3">
                  {lastSubjects.map((s) => (
                    <li key={s.id} className="rounded-md border p-3 dark:border-slate-800">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="truncate font-medium">{s.name}</div>
                          <div className="truncate text-xs text-muted-foreground">/{s.slug}</div>
                        </div>
                        <Badge variant="secondary" className="border-none bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                          {new Date(s.createdAt).toLocaleDateString()}
                        </Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <Separator className="my-4" />

              <div className="flex items-center justify-end">
                <Button asChild>
                  <Link href="/sa/subjects">Open Subjects</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
