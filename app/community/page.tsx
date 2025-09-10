"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Sparkles,
  MessageSquare,
  Users2,
  Trophy,
  CalendarDays,
  BookOpen,
 
  Hash,
  Send,
  Search,
  Filter,
  Clock,
  ArrowRight,
  Star,
} from "lucide-react";

/* -----------------------------------------------------------------------
   Dugsi Hub — Community (app/community/page.tsx)
   Discussions, Events, and Contributors with search/filters and CTAs
   to join Telegram/Discord (or your preferred channels).
------------------------------------------------------------------------ */

type Thread = {
  id: string;
  title: string;
  subject: string;
  tag: "Past Papers" | "Quizzes" | "Resources" | "General";
  replies: number;
  views: number;
  lastActivity: string; // e.g., "2h ago"
  href: string;
  author: string;
};

type Event = {
  id: string;
  title: string;
  date: string; // ISO or human
  time: string;
  mode: "Online" | "In-person";
  tag: "Study Jam" | "Exam Tips" | "Q&A" | "Workshop";
  href: string;
};

type Contributor = {
  id: string;
  name: string;
  role: string;
  contributions: number; // count
  subject: string;
};

const THREADS: Thread[] = [
  {
    id: "t1",
    title: "Math 2024 Paper 1 — Q13 solution (Trigonometry)",
    subject: "Mathematics",
    tag: "Past Papers",
    replies: 18,
    views: 1224,
    lastActivity: "1h ago",
    href: "/community/t/math-2024-p1-q13",
    author: "Ayan M.",
  },
  {
    id: "t2",
    title: "Best way to prepare English comprehension?",
    subject: "English",
    tag: "Quizzes",
    replies: 9,
    views: 820,
    lastActivity: "3h ago",
    href: "/community/t/eng-comprehension-tips",
    author: "Hassan A.",
  },
  {
    id: "t3",
    title: "Physics revision notes – Mechanics to Waves (PDF)",
    subject: "Physics",
    tag: "Resources",
    replies: 12,
    views: 990,
    lastActivity: "yesterday",
    href: "/community/t/physics-notes-mechanics-waves",
    author: "Ilhan K.",
  },
  {
    id: "t4",
    title: "General exam-day checklist (what to bring?)",
    subject: "All",
    tag: "General",
    replies: 7,
    views: 410,
    lastActivity: "2d ago",
    href: "/community/t/exam-day-checklist",
    author: "Abdi W.",
  },
];

const EVENTS: Event[] = [
  {
    id: "e1",
    title: "Study Jam: Math Past Papers (Live walkthrough)",
    date: "Sat, Mar 22",
    time: "15:00–16:30",
    mode: "Online",
    tag: "Study Jam",
    href: "/events/math-study-jam",
  },
  {
    id: "e2",
    title: "Q&A: Physics Problem Solving",
    date: "Wed, Mar 26",
    time: "19:00–20:00",
    mode: "Online",
    tag: "Q&A",
    href: "/events/physics-qa",
  },
  {
    id: "e3",
    title: "Workshop: Build a 4-Week Study Plan",
    date: "Fri, Mar 28",
    time: "17:30–18:30",
    mode: "Online",
    tag: "Workshop",
    href: "/events/study-plan-workshop",
  },
];

const CONTRIBUTORS: Contributor[] = [
  { id: "c1", name: "Ayan Mohamed", role: "Top Solver", contributions: 87, subject: "Mathematics" },
  { id: "c2", name: "Abdi Warsame", role: "Resource Curator", contributions: 62, subject: "Physics" },
  { id: "c3", name: "Ilhan Khalif", role: "Quiz Maker", contributions: 55, subject: "Chemistry" },
  { id: "c4", name: "Hodan Ali", role: "Guide Writer", contributions: 49, subject: "English" },
];

const SUBJECTS = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "English"] as const;
const TAGS = ["All", "Past Papers", "Quizzes", "Resources", "General"] as const;

export default function CommunityPage() {
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState<(typeof SUBJECTS)[number]>("All");
  const [tag, setTag] = useState<(typeof TAGS)[number]>("All");

  const visibleThreads = useMemo(() => {
    const term = q.toLowerCase().trim();
    return THREADS.filter((t) => {
      const matchesQ = !term || [t.title, t.subject, t.tag].join(" ").toLowerCase().includes(term);
      const matchesSubject = subject === "All" || t.subject === subject || (subject === "All" && true);
      const matchesTag = tag === "All" || t.tag === tag;
      return matchesQ && matchesSubject && matchesTag;
    });
  }, [q, subject, tag]);

  return (
    <main className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 inline-flex items-center gap-1">
            <Sparkles className="h-4 w-4" /> Dugsi Hub Community
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Learn Together. Share Solutions. Win Exams.
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Join Somali Grade 12 learners collaborating on past papers, quizzes, and
            study resources—Af-Soomaali, friendly, and focused.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-600/90">
              <Link href="https://t.me/dugsihub" target="_blank">
                Join Telegram
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/get-started">Get Started</Link>
            </Button>
          </div>
          {/* quick stats */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-sm text-muted-foreground">
            <div className="rounded-lg border bg-card/50 p-3">
              <div className="text-foreground font-semibold">5k+</div>
              Members
            </div>
            <div className="rounded-lg border bg-card/50 p-3">
              <div className="text-foreground font-semibold">1.2k+</div>
              Threads
            </div>
            <div className="rounded-lg border bg-card/50 p-3">
              <div className="text-foreground font-semibold">240+</div>
              Study Events
            </div>
          </div>
        </div>
      </motion.section>

      {/* Tabs */}
      <section className="mt-12 md:mt-16">
        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="discussions" className="whitespace-nowrap">
              <MessageSquare className="mr-2 h-4 w-4" /> Discussions
            </TabsTrigger>
            <TabsTrigger value="events" className="whitespace-nowrap">
              <CalendarDays className="mr-2 h-4 w-4" /> Events
            </TabsTrigger>
            <TabsTrigger value="contributors" className="whitespace-nowrap">
              <Trophy className="mr-2 h-4 w-4" /> Top Contributors
            </TabsTrigger>
          </TabsList>

          {/* Discussions */}
          <TabsContent value="discussions" className="mt-6">
            {/* Controls */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-md">
                <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search threads…"
                  className="pl-8"
                />
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2 md:hidden">
                    <Filter className="h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[340px] sm:w-[380px]">
                  <SheetHeader>
                    <SheetTitle>Filter discussions</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-3">
                    <FilterRow label="Subject" value={subject} onChange={setSubject} options={SUBJECTS} />
                    <FilterRow label="Tag" value={tag} onChange={setTag} options={TAGS} />
                    <div className="pt-2">
                      <SheetClose asChild>
                        <Button className="w-full">Apply</Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop filters */}
              <div className="hidden items-center gap-3 md:flex">
                <FilterRow label="Subject" value={subject} onChange={setSubject} options={SUBJECTS} compact />
                <FilterRow label="Tag" value={tag} onChange={setTag} options={TAGS} compact />
              </div>
            </div>

            {/* Thread list */}
            <div className="mt-6 space-y-3">
              {visibleThreads.map((t) => (
                <Card key={t.id} className="border-muted/40">
                  <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Link href={t.href} className="truncate text-sm font-medium hover:underline">
                          {t.title}
                        </Link>
                        <Badge variant="secondary" className="hidden sm:inline-flex">{t.tag}</Badge>
                        <Badge className="bg-emerald-600 hover:bg-emerald-600/90">{t.subject}</Badge>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Users2 className="h-3.5 w-3.5" /> {t.replies} replies
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Hash className="h-3.5 w-3.5" /> {t.views.toLocaleString()} views
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {t.lastActivity}
                        </span>
                        <span className="inline-flex items-center gap-1">by {t.author}</span>
                      </div>
                    </div>

                    <Button asChild size="sm" variant="ghost" className="gap-2">
                      <Link href={t.href}>
                        Open <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Start new thread */}
            <div className="mt-8 rounded-xl border p-4 sm:p-6">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <div className="text-sm font-semibold">Start a new discussion</div>
                  <p className="text-sm text-muted-foreground">
                    Ask a question about a paper, share tips, or post study notes.
                  </p>
                </div>
                <Button asChild>
                  <Link href="/community/new">
                    <Send className="mr-2 h-4 w-4" /> New Thread
                  </Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Events */}
          <TabsContent value="events" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {EVENTS.map((e) => (
                <Card key={e.id} className="group border-muted/40 transition-shadow hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-base">
                      <span className="truncate">{e.title}</span>
                      <Badge variant="secondary">{e.tag}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" /> {e.date} • {e.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" /> {e.mode}
                    </div>
                    <div className="pt-1">
                      <Button asChild className="w-full"> 
                        <Link href={e.href}>Register</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button asChild variant="outline">
                <Link href="/events">See all events</Link>
              </Button>
            </div>
          </TabsContent>

          {/* Contributors */}
          <TabsContent value="contributors" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CONTRIBUTORS.map((c, i) => (
                <Card key={c.id} className="border-muted/40">
                  <CardContent className="flex items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-muted/40">
                          <Trophy className="h-4 w-4" />
                        </span>
                        <span className="truncate text-sm font-medium">{c.name}</span>
                        {i === 0 && <Badge className="gap-1 bg-emerald-600 hover:bg-emerald-600/90"><Star className="h-3.5 w-3.5" /> Top</Badge>}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {c.role} • {c.subject}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-foreground">{c.contributions}</div>
                      <div className="text-xs text-muted-foreground">contributions</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 rounded-xl border p-4 sm:p-6">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <div className="text-sm font-semibold">Want to contribute?</div>
                  <p className="text-sm text-muted-foreground">
                    Upload notes, write guides, or create quizzes to help others succeed.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline">
                    <Link href="/resources/new">Share Resource</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/quizzes/new">Create Quiz</Link>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA strip */}
      <Separator className="my-12" />
      <section className="mx-auto max-w-3xl rounded-2xl border bg-card/50 p-6 text-center sm:p-8">
        <div className="text-2xl font-semibold">Join the study family</div>
        <p className="mt-2 text-muted-foreground">
          Be part of a supportive Somali community—share solutions, get feedback, and stay motivated.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild className="bg-emerald-600 hover:bg-emerald-600/90">
            <Link href="https://t.me/dugsihub" target="_blank">Join Telegram</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/signin">Sign in</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

/* ---------------------------- Helpers ---------------------------- */

function FilterRow({
  label,
  value,
  onChange,
  options,
  compact = false,
}: {
  label: string;
  value: string;
  onChange: (v: any) => void;
  options: readonly string[];
  compact?: boolean;
}) {
  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-3"}`}>
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 rounded-md border bg-background px-3 text-sm"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
