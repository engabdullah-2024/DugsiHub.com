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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Sparkles,
  BookOpen,
  Calculator,
  Atom,
  Dna,
  Globe,
  Beaker,
  Layers,
} from "lucide-react";

// ------------------------------------------------------------
// Dugsi Hub — Subjects (app/subjects/page.tsx)
// Filterable subject directory with category tabs, search, language filter,
// and modern cards showing Papers / Quizzes / Resources + progress.
// ------------------------------------------------------------

type Subject = {
  key: string;
  name: string;
  category: "Sciences" | "Languages" | "Humanities" | "Others";
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  lang: "Somali" | "English" | "Both";
  papers: number;
  quizzes: number;
  resources: number;
  progress?: number; // % of syllabus covered (optional)
  href: string; // route to subject hub
};

const SUBJECTS: Subject[] = [
  {
    key: "mathematics",
    name: "Mathematics",
    category: "Sciences",
    icon: Calculator,
    lang: "Both",
    papers: 42,
    quizzes: 26,
    resources: 18,
    progress: 72,
    href: "/subjects/mathematics",
  },
  {
    key: "physics",
    name: "Physics",
    category: "Sciences",
    icon: Atom,
    lang: "Somali",
    papers: 38,
    quizzes: 21,
    resources: 16,
    progress: 65,
    href: "/subjects/physics",
  },
  {
    key: "chemistry",
    name: "Chemistry",
    category: "Sciences",
    icon: Beaker,
    lang: "Somali",
    papers: 35,
    quizzes: 20,
    resources: 14,
    progress: 61,
    href: "/subjects/chemistry",
  },
  {
    key: "biology",
    name: "Biology",
    category: "Sciences",
    icon: Dna,
    lang: "Both",
    papers: 34,
    quizzes: 19,
    resources: 17,
    progress: 68,
    href: "/subjects/biology",
  },
  {
    key: "english",
    name: "English",
    category: "Languages",
    icon: BookOpen,
    lang: "English",
    papers: 29,
    quizzes: 25,
    resources: 22,
    progress: 74,
    href: "/subjects/english",
  },
  {
    key: "geography",
    name: "Geography",
    category: "Humanities",
    icon: Globe,
    lang: "Somali",
    papers: 27,
    quizzes: 15,
    resources: 13,
    progress: 58,
    href: "/subjects/geography",
  },
];

const CATEGORIES = ["All", "Sciences", "Languages", "Humanities", "Others"] as const;
const LANGS = ["All", "Somali", "English", "Both"] as const;

export default function SubjectsPage() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<(typeof CATEGORIES)[number]>("All");
  const [lang, setLang] = useState<(typeof LANGS)[number]>("All");
  const [view, setView] = useState<"grid" | "list">("grid");

  const visible = useMemo(() => {
    const term = q.toLowerCase().trim();
    return SUBJECTS.filter((s) => {
      const matchesQ = !term || [s.name, s.category, s.lang].join(" ").toLowerCase().includes(term);
      const matchesCat = tab === "All" || s.category === tab;
      const matchesLang = lang === "All" || s.lang === lang;
      return matchesQ && matchesCat && matchesLang;
    });
  }, [q, tab, lang]);

  return (
    <main className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4 inline-flex items-center gap-1">
            <Sparkles className="h-4 w-4" /> Subjects Directory
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Explore Grade 12 Subjects
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Pick a subject to access past papers (PDF), auto-graded quizzes, and curated resources—always in Somali where possible.
          </p>
        </div>
      </motion.section>

      {/* Controls */}
      <section className="mt-12 md:mt-16">
        <div className="flex flex-col items-stretch justify-between gap-3 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search subjects…"
              className="pl-8"
              aria-label="Search subjects"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground">Language</Label>
              <Select value={lang} onValueChange={(v: any) => setLang(v)}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground">View</Label>
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant={view === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("grid")}
                  className="gap-2"
                >
                  <Layers className="h-4 w-4 rotate-90" /> Grid
                </Button>
                <Button
                  type="button"
                  variant={view === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("list")}
                  className="gap-2"
                >
                  <Layers className="h-4 w-4" /> List
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="All" value={tab} onValueChange={setTab as any} className="mt-6">
          <TabsList className="w-full justify-start overflow-x-auto">
            {CATEGORIES.map((c) => (
              <TabsTrigger key={c} value={c} className="whitespace-nowrap">
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={tab} className="mt-6">
            {/* Results */}
            {visible.length === 0 ? (
              <div className="mx-auto max-w-md rounded-xl border bg-card/50 p-6 text-center text-sm text-muted-foreground">
                No subjects match your filters.
              </div>
            ) : view === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((s) => (
                  <SubjectCard key={s.key} subject={s} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {visible.map((s) => (
                  <SubjectRow key={s.key} subject={s} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      <Separator className="my-16" />

      {/* CTA */}
      <section className="mx-auto max-w-3xl text-center">
        <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Not sure where to start?
        </h3>
        <p className="mt-2 text-muted-foreground">
          Try our guided path—mix of papers, quizzes, and notes to get you exam-ready.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-600/90">
            <Link href="/study">Start Studying</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/papers">Browse Past Papers</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

/* ----------------------------- Components ----------------------------- */

function SubjectCard({ subject }: { subject: Subject }) {
  const Icon = subject.icon;
  return (
    <Card className="group border-muted/40 transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between gap-3 pb-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-muted/40">
            <Icon className="h-5 w-5" />
          </span>
          <CardTitle className="text-base">{subject.name}</CardTitle>
        </div>
        <Badge variant="secondary">{subject.lang}</Badge>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center gap-3">
          <span>Papers: <span className="font-medium text-foreground">{subject.papers}</span></span>
          <span>Quizzes: <span className="font-medium text-foreground">{subject.quizzes}</span></span>
          <span>Resources: <span className="font-medium text-foreground">{subject.resources}</span></span>
        </div>

        {/* Progress bar (syllabus coverage) */}
        {typeof subject.progress === "number" && (
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Syllabus coverage</span>
              <span className="font-medium text-foreground">{subject.progress}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-border">
              <div
                className="h-2 rounded-full bg-emerald-600"
                style={{ width: `${subject.progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="pt-1">
          <Button asChild className="w-full">
            <Link href={subject.href}>Open {subject.name}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SubjectRow({ subject }: { subject: Subject }) {
  const Icon = subject.icon;
  return (
    <Card className="border-muted/40">
      <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-muted/40">
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-medium">{subject.name}</span>
              <Badge variant="secondary">{subject.lang}</Badge>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span>Papers: <span className="font-medium text-foreground">{subject.papers}</span></span>
              <span>Quizzes: <span className="font-medium text-foreground">{subject.quizzes}</span></span>
              <span>Resources: <span className="font-medium text-foreground">{subject.resources}</span></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/papers?subject=${encodeURIComponent(subject.name)}`}>Past Papers</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={`/quizzes?subject=${encodeURIComponent(subject.name)}`}>Quizzes</Link>
          </Button>
          <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-600/90">
            <Link href={subject.href}>Open</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
