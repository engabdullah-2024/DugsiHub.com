// app/dashboard/page.tsx
import Image from "next/image";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import { Paper } from "../models/Paper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  CheckSquare,
  Mail,
  Users,
  Plus,
  Upload,
  Settings,
  ArrowRight,
  Search,
  Sparkles,
} from "lucide-react";
import SignOutButton from "./signout-button";
import PapersUpload from "./papers-upload"; // client component (upload form)

type ActivityItem = {
  id: string;
  title: string;
  meta: string;
  icon: React.ReactNode;
};

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/login");
  const isSuper = user.role === "superadmin";
  const firstName = user.firstName ?? "Admin";

  // Fetch dashboard data on the server (fast & safe)
  await dbConnect();
  const paperCount = await Paper.countDocuments().lean();
  const recentPapers = await Paper.find().sort({ createdAt: -1 }).limit(8).lean();

  const stats = [
    { title: "Students", value: "—", icon: <Users className="h-5 w-5" /> },
    { title: "Past Papers", value: paperCount, icon: <BookOpen className="h-5 w-5" /> },
    { title: "Quizzes", value: "—", icon: <CheckSquare className="h-5 w-5" /> },
    { title: "Messages", value: "—", icon: <Mail className="h-5 w-5" /> },
  ];

  const recent: ActivityItem[] =
    recentPapers.length === 0
      ? [
          {
            id: "empty",
            title: "No recent activity yet",
            meta: "Your latest actions will show here.",
            icon: <Sparkles className="h-4 w-4" />,
          },
        ]
      : recentPapers.map((p) => ({
          id: String(p._id),
          title: p.subject,
          meta: `${p.pages} pages • ${p.fileName}`,
          icon: <BookOpen className="h-4 w-4" />,
        }));

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-[140px]">
              <Image
                src="/dugsihub.png"
                alt="Dugsi Hub"
                fill
                className="object-contain logo-stroked"
                sizes="140px"
                priority
              />
            </div>
            {/* Desktop search (placeholder) */}
            <div className="hidden md:block">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search…" className="h-9 w-64 pl-9" aria-label="Search" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:block">
              {user.firstName} {user.lastName} • {user.role}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b bg-grid">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="rounded-2xl border bg-gradient-to-br from-emerald-50 via-background to-background p-5 dark:from-emerald-950/20">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <Badge variant="secondary" className="mb-2">
                  Welcome
                </Badge>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Welcome back, {firstName} 👋
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Instructor: <span className="font-medium">Eng Abdullah</span>
                </p>
              </div>

              {isSuper && (
                <div className="flex gap-2">
                  <Button className="gap-2 bg-emerald-600 hover:bg-emerald-600/90">
                    <Plus className="h-4 w-4" />
                    Create Quiz
                  </Button>
                  <a href="#upload" className="inline-flex">
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Past Papers
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.title} title={s.title} value={s.value} icon={s.icon} />
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="border-muted/40 lg:col-span-2">
            <CardHeader className="flex items-center justify-between gap-2 sm:flex-row">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" className="h-8 gap-1 px-2 text-sm">
                View all
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {recent.map((item) => (
                  <li key={item.id} className="flex items-start gap-3 py-3">
                    <div className="mt-0.5 rounded-md border bg-muted/30 p-2 text-muted-foreground">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{item.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{item.meta}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-muted/40">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full gap-2 bg-emerald-600 hover:bg-emerald-600/90">
                <Plus className="h-4 w-4" />
                New Quiz
              </Button>
              {isSuper ? (
                <a href="#upload" className="block">
                  <Button variant="secondary" className="w-full gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Papers
                  </Button>
                </a>
              ) : (
                <Button variant="secondary" className="w-full gap-2" disabled>
                  <Upload className="h-4 w-4" />
                  Upload Papers (Admins only)
                </Button>
              )}
              <Button variant="outline" className="w-full gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>

              <div className="pt-2 text-xs text-muted-foreground">
                Tips: You can customize colors, add analytics, and wire this panel to live data.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload (super admin only) */}
        {isSuper && (
          <div id="upload" className="mt-8">
            <Card className="border-muted/40">
              <CardHeader>
                <CardTitle>Upload Past Paper (PDF)</CardTitle>
              </CardHeader>
              <CardContent>
                <PapersUpload />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent uploads list */}
        <div className="mt-8">
          <Card className="border-muted/40">
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              {recentPapers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No papers uploaded yet.</p>
              ) : (
                <ul className="divide-y">
                  {recentPapers.map((p) => (
                    <li key={String(p._id)} className="flex items-center justify-between gap-3 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{p.subject}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {p.pages} pages • {p.fileName}
                        </p>
                      </div>
                      <a
                        href={p.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-emerald-600 hover:underline"
                      >
                        Open
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <Card className="group border-muted/40 transition-colors hover:border-emerald-200 dark:hover:border-emerald-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">—</p>
      </CardContent>
    </Card>
  );
}
