// app/dashboard/page.tsx
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
import {
  FaHome,
  FaBook,
  FaUpload,
  FaFolderOpen,
  FaUsers,
  FaSearch,
  FaCog,
} from "react-icons/fa";

const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase() ?? "enga95311@gmail.com";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const email = useMemo(
    () => user?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? "",
    [user]
  );
  const isAdmin = email === ADMIN_EMAIL;

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) router.replace("/sign-in");
    else if (!isAdmin) router.replace("/");
  }, [isLoaded, user, isAdmin, router]);

  if (!isLoaded) {
    return (
      <div className="grid place-items-center min-h-screen text-slate-500 dark:text-slate-400">
        Loading…
      </div>
    );
  }
  if (!user || !isAdmin) {
    return (
      <div className="grid place-items-center min-h-screen text-red-500">
        Access denied. Admin only.
      </div>
    );
  }

  const stats = [
    { id: 1, label: "Students", value: "1,242", delta: "+4.2%" },
    { id: 2, label: "Papers", value: "512", delta: "+1.3%" },
    { id: 3, label: "Quizzes", value: "88", delta: "-0.5%" },
  ];

  const recent = [
    { id: "P-001", name: "Math Past Paper - 2024", type: "PDF", date: "Oct 12, 2025", status: "Published" },
    { id: "P-002", name: "Physics Past Paper - 2023", type: "PDF", date: "Sep 30, 2025", status: "Draft" },
    { id: "P-003", name: "Chemistry Marking Scheme", type: "PDF", date: "Aug 14, 2025", status: "Published" },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(60%_60%_at_50%_-20%,rgba(74,140,100,0.15),transparent_60%)] dark:bg-[radial-gradient(60%_60%_at_50%_-20%,rgba(74,140,100,0.2),transparent_60%)]">
      {/* App Shell */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-[auto_1fr]">
        {/* Sidebar */}
        <aside
          className={[
            "sticky top-0 h-svh border-r border-slate-200/70 bg-white/70 backdrop-blur-md dark:border-slate-800 dark:bg-neutral-900/70 transition-all",
            collapsed ? "w-16" : "w-60",
          ].join(" ")}
        >
          <div className="flex items-center justify-between px-3 py-3">
            <Link href="/" className="font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              {collapsed ? "DH" : "Dugsi Hub"}
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed((v) => !v)}
              className="text-slate-500"
              aria-label="Toggle sidebar"
              title="Toggle sidebar"
            >
              {collapsed ? "›" : "‹"}
            </Button>
          </div>

          <nav className="mt-2 px-2">
            <SideItem href="/dashboard" icon={<FaHome />} label="Home" collapsed={collapsed} />
            <SideItem href="/dashboard/papers" icon={<FaBook />} label="Past Papers" collapsed={collapsed} />
            <SideItem href="/dashboard/upload" icon={<FaUpload />} label="Upload" collapsed={collapsed} />
            <SideItem href="/dashboard/library" icon={<FaFolderOpen />} label="Library" collapsed={collapsed} />
            <SideItem href="/dashboard/students" icon={<FaUsers />} label="Students" collapsed={collapsed} />
            <SideItem href="/dashboard/settings" icon={<FaCog />} label="Settings" collapsed={collapsed} />
          </nav>

          <div className="mt-auto p-3">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-neutral-900">
              <Avatar className="h-8 w-8">
                {user.profileImageUrl ? (
                  <AvatarImage src={user.profileImageUrl} />
                ) : (
                  <AvatarFallback>{(user.firstName || user.username || "U")[0]}</AvatarFallback>
                )}
              </Avatar>
              {!collapsed && (
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{user.firstName || user.username}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">{email}</p>
                </div>
              )}
            </div>
            <div className="mt-2">
              <SignOutButton>
                <Button variant="outline" className="w-full">Sign out</Button>
              </SignOutButton>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0">
          {/* Topbar */}
          <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-neutral-900/80">
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <h1 className="text-xl font-semibold">Admin Dashboard</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Welcome, {user.firstName || user.username}. Manage content & students.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
                  <Input className="w-56 pl-8 md:w-72" placeholder="Search papers, students…" />
                </div>
                <Link href="/dashboard/upload">
                  <Button>New Upload</Button>
                </Link>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="px-4 py-6 md:px-6 md:py-8">
            {/* KPIs */}
            <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((s) => (
                <Card key={s.id} className="border-slate-200/70 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-neutral-900/70">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-xs">{s.label}</CardDescription>
                    <CardTitle className="text-2xl">{s.value}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant={s.delta.startsWith("+") ? "secondary" : "destructive"} className="text-xs">
                      {s.delta}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </section>

            {/* Actions + Shortcuts */}
            <section className="mb-8 grid gap-4 md:grid-cols-3">
              <Card className="border-slate-200/70 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-neutral-900/70 md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Quick actions</CardTitle>
                  <CardDescription>Fast paths for frequent tasks</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Link href="/dashboard/upload"><Button size="sm">Upload Paper</Button></Link>
                  <Link href="/dashboard/papers"><Button size="sm" variant="outline">Manage Papers</Button></Link>
                  <Link href="/dashboard/students"><Button size="sm" variant="outline">View Students</Button></Link>
                  <Link href="/dashboard/settings"><Button size="sm" variant="ghost">Settings</Button></Link>
                </CardContent>
              </Card>

              <Card className="border-slate-200/70 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-neutral-900/70">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Storage</CardTitle>
                  <CardDescription>Usage overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800">
                    <div className="h-2 w-2/3 rounded-full bg-emerald-500" />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">6.7 GB / 10 GB</p>
                </CardContent>
              </Card>
            </section>

            {/* Recent uploads */}
            <section>
              <Card className="border-slate-200/70 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-neutral-900/70">
                <CardHeader>
                  <CardTitle className="text-base">Recent uploads</CardTitle>
                  <CardDescription>Latest documents</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>File</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Uploaded</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recent.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell className="font-medium">{r.name}</TableCell>
                          <TableCell>{r.type}</TableCell>
                          <TableCell>{r.date}</TableCell>
                          <TableCell>
                            <Badge variant={r.status === "Published" ? "secondary" : "outline"}>
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
          </main>
        </div>
      </div>
    </div>
  );
}

/* ——— Small helper for sidebar items ——— */
function SideItem({
  href,
  icon,
  label,
  collapsed,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      <span className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm group-hover:border-slate-300 dark:border-slate-800 dark:bg-neutral-900 dark:text-slate-200">
        {icon}
      </span>
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}
