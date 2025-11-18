// app/u/page.tsx
"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Menu,
  Home,
  FileText,
  BookOpen,
  LibraryBig,
  User2,
  Bell,
  Search,
  Play,
  Clock,
  CheckCircle2,
  ChevronRight,
  X,
  LogOut,
} from "lucide-react";

const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase() ?? "enga95311@gmail.com";

export default function UserHome() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const email = useMemo(
    () => user?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? "",
    [user]
  );

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) router.replace("/sign-in");
    else if (email === ADMIN_EMAIL) router.replace("/dashboard");
  }, [isLoaded, user, email, router]);

  if (!isLoaded) {
    return (
      <div className="grid min-h-screen place-items-center text-slate-500">
        Loading…
      </div>
    );
  }
  if (!user || email === ADMIN_EMAIL) return null;

  // --- demo data (replace with real) ---
  const nextUp = [
    { id: "N-1", title: "Algebra: Quadratic Equations", type: "Lesson", eta: "12 min" },
    { id: "N-2", title: "Physics: Kinematics Quiz", type: "Quiz", eta: "8 min" },
    { id: "N-3", title: "Chemistry: Organic Reactions", type: "Lesson", eta: "15 min" },
  ];
  const recents = [
    { id: "R-101", name: "Math – Trigonometry Set", type: "PDF", date: "Oct 10, 2025", status: "Viewed" },
    { id: "R-102", name: "Physics – Waves Quiz", type: "Quiz", date: "Oct 02, 2025", status: "Completed" },
  ];

  const nav = [
    { href: "/u", label: "Home", icon: Home },
    { href: "/papers", label: "Past Papers", icon: FileText },
    { href: "/quizzes", label: "Quizzes", icon: BookOpen },
    { href: "/library", label: "Library", icon: LibraryBig },
    { href: "/profile", label: "Profile", icon: User2 },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-slate-900 dark:bg-neutral-900 dark:text-slate-50">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-neutral-900/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="font-extrabold tracking-tight">
              Dugsi Hub
            </Link>
            <span className="ml-2 hidden text-xs text-muted-foreground md:inline">
              Student Dashboard
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search papers, quizzes…"
                className="w-64 pl-8"
              />
            </div>

            <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
              <Bell className="h-5 w-5" />
            </Button>

            <Avatar className="h-8 w-8">
              {user.profileImageUrl ? (
                <AvatarImage src={user.profileImageUrl} />
              ) : (
                <AvatarFallback>{(user.firstName || user.username || "U")[0]}</AvatarFallback>
              )}
            </Avatar>

            <SignOutButton>
              <Button variant="outline" size="sm" className="gap-1">
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </SignOutButton>
          </div>
        </div>
      </header>

      {/* Shell: Sidebar + Main */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[240px_1fr]">
        {/* Sidebar (desktop) */}
        <aside className="sticky top-[57px] hidden h-[calc(100dvh-57px)] border-r border-slate-200 bg-white/70 p-3 dark:border-slate-800 dark:bg-neutral-900/60 md:block">
          <nav className="space-y-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <n.icon className="h-4 w-4" />
                <span>{n.label}</span>
                <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </nav>

          <Separator className="my-3" />

          <div className="rounded-lg border border-emerald-200/50 bg-emerald-50 p-3 text-xs text-emerald-900 dark:border-emerald-400/20 dark:bg-emerald-900/30 dark:text-emerald-100">
            Stay consistent—short daily sessions beat long cramming.
          </div>
        </aside>

        {/* Sidebar (mobile overlay) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
              aria-hidden
            />
            <div className="absolute inset-y-0 left-0 w-72 border-r border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-neutral-900">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="space-y-1">
                {nav.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <n.icon className="h-4 w-4" />
                    <span>{n.label}</span>
                    <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main */}
        <main className="p-4 md:p-8">
          {/* Greeting + streak */}
          <section className="mb-8 grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2 border-slate-200/70 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-neutral-900/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">
                  Hi, {user.firstName || user.username} 👋
                </CardTitle>
                <CardDescription>Pick up where you left off.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-2">
                <Link href="/papers">
                  <Button size="sm" className="rounded-full">Continue studying</Button>
                </Link>
                <Link href="/quizzes">
                  <Button size="sm" variant="outline" className="rounded-full">Take a quiz</Button>
                </Link>
                <Link href="/library">
                  <Button size="sm" variant="ghost" className="rounded-full">Open library</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-200/70 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-neutral-900/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Study streak</CardTitle>
                <CardDescription>Last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-6 w-full rounded ${i < 4 ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-800"}`}
                      title={`Day ${i + 1}`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-500">🔥 4-day streak — keep it up!</p>
              </CardContent>
            </Card>
          </section>

          {/* Quick tiles */}
          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <QuickTile href="/papers" icon={<FileText className="h-5 w-5" />} title="Past Papers" desc="Browse by subject" />
            <QuickTile href="/quizzes" icon={<BookOpen className="h-5 w-5" />} title="Quizzes" desc="Practice & review" />
            <QuickTile href="/library" icon={<LibraryBig className="h-5 w-5" />} title="Library" desc="Saved resources" />
            <QuickTile href="/profile" icon={<User2 className="h-5 w-5" />} title="Profile" desc="Account & settings" />
          </section>

          {/* Next up + Progress */}
          <section className="mb-8 grid gap-4 xl:grid-cols-3">
            <Card className="xl:col-span-2 border-slate-200/70 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-neutral-900/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Next up</CardTitle>
                <CardDescription>Your tailored tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {nextUp.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-neutral-900"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <Play className="h-4 w-4 text-emerald-600" />
                      <div className="min-w-0">
                        <p className="truncate font-medium">{n.title}</p>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          {n.type} • <Clock className="mb-[2px] inline h-3.5 w-3.5" /> {n.eta}
                        </p>
                      </div>
                    </div>
                    <Link href={n.type === "Quiz" ? "/quizzes" : "/papers"}>
                      <Button size="sm" variant="outline">Open</Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200/70 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-neutral-900/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Your progress</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className="h-2 w-1/2 rounded-full bg-emerald-500" />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-lg font-semibold">12</p>
                    <p className="text-xs text-slate-500">Lessons</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">5</p>
                    <p className="text-xs text-slate-500">Quizzes</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">2h</p>
                    <p className="text-xs text-slate-500">Study time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Recent activity */}
          <section>
            <Card className="border-slate-200/70 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-neutral-900/70">
              <CardHeader>
                <CardTitle className="text-base">Recent activity</CardTitle>
                <CardDescription>Your latest items</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recents.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">{r.name}</TableCell>
                        <TableCell>{r.type}</TableCell>
                        <TableCell>{r.date}</TableCell>
                        <TableCell>
                          <Badge variant={r.status === "Completed" ? "secondary" : "outline"}>
                            {r.status === "Completed" ? (
                              <CheckCircle2 className="mr-1 inline h-4 w-4" />
                            ) : null}
                            {r.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-8" />

          {/* CTA footer */}
          <section className="grid gap-3 md:grid-cols-2">
            <Card className="border-slate-200/70 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-neutral-900/70">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-medium">Need a quick challenge?</p>
                  <p className="text-xs text-slate-500">Test yourself with a short quiz.</p>
                </div>
                <Link href="/quizzes">
                  <Button size="sm" variant="outline">Start now</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="border-slate-200/70 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-neutral-900/70">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-medium">Explore new papers</p>
                  <p className="text-xs text-slate-500">Fresh sets added weekly.</p>
                </div>
                <Link href="/papers">
                  <Button size="sm">Browse</Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}

/* helper tile */
function QuickTile({
  href,
  icon,
  title,
  desc,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link href={href}>
      <Card className="border-slate-200/70 bg-white/70 backdrop-blur transition-all hover:shadow-md dark:border-slate-800 dark:bg-neutral-900/70">
        <CardContent className="flex items-center gap-3 p-4">
          <span className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-neutral-900">
            {icon}
          </span>
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
