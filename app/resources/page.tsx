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
  Search,
  Filter,
  Download,
  FileText,
  BookOpen,
  Clock,
  Grid2X2,
  Layers,
  CheckCircle2,
  Star,
  Bookmark,
} from "lucide-react";

/* -----------------------------------------------------------------------
   Dugsi Hub — Resources (app/resources/page.tsx)
   Curated study resources: notes, guides, formula sheets, planners.
   Desktop: sticky filter sidebar. Mobile: filter drawer.
------------------------------------------------------------------------ */

type Resource = {
  id: string;
  title: string;
  subject: string;
  type: "Notes" | "Guide" | "Formula Sheet" | "Study Plan" | "Syllabus Map";
  lang: "Somali" | "English" | "Both";
  minutes: number;      // estimated read
  sizeMB: number;       // file size (if downloadable)
  href: string;         // view/download
  tags: string[];
  featured?: boolean;
};

const DATA: Resource[] = [
  {
    id: "math-formulas-v1",
    title: "Mathematics Formula Sheet (Grade 12)",
    subject: "Mathematics",
    type: "Formula Sheet",
    lang: "Both",
    minutes: 12,
    sizeMB: 0.8,
    href: "/pdf/math-formulas.pdf",
    tags: ["Algebra", "Calculus", "Trigonometry"],
    featured: true,
  },
  {
    id: "physics-revision-guide",
    title: "Physics Revision Guide — Mechanics to Waves",
    subject: "Physics",
    type: "Guide",
    lang: "Somali",
    minutes: 35,
    sizeMB: 2.1,
    href: "/pdf/physics-revision-guide.pdf",
    tags: ["Mechanics", "Waves", "Practice"],
    featured: true,
  },
  {
    id: "chem-notes-bonding",
    title: "Chemistry Notes: Chemical Bonding",
    subject: "Chemistry",
    type: "Notes",
    lang: "Somali",
    minutes: 18,
    sizeMB: 1.3,
    href: "/pdf/chemistry-bonding-notes.pdf",
    tags: ["Ionic", "Covalent", "Polar"],
  },
  {
    id: "bio-notes-genetics",
    title: "Biology Notes: Genetics & Heredity",
    subject: "Biology",
    type: "Notes",
    lang: "Both",
    minutes: 22,
    sizeMB: 1.0,
    href: "/pdf/biology-genetics-notes.pdf",
    tags: ["DNA", "Punnett", "Inheritance"],
  },
  {
    id: "eng-reading-pack",
    title: "English Reading Comprehension Pack",
    subject: "English",
    type: "Guide",
    lang: "English",
    minutes: 28,
    sizeMB: 1.7,
    href: "/pdf/english-reading-pack.pdf",
    tags: ["Comprehension", "Vocabulary"],
  },
  {
    id: "geo-syllabus-map",
    title: "Geography Syllabus Map — Grade 12",
    subject: "Geography",
    type: "Syllabus Map",
    lang: "Somali",
    minutes: 10,
    sizeMB: 0.6,
    href: "/pdf/geography-syllabus-map.pdf",
    tags: ["Topics", "Checklist"],
    featured: true,
  },
  {
    id: "study-plan-4w",
    title: "4-Week National Exam Study Plan",
    subject: "All",
    type: "Study Plan",
    lang: "Somali",
    minutes: 8,
    sizeMB: 0.4,
    href: "/pdf/study-plan-4w.pdf",
    tags: ["Planner", "Timetable"],
  },
];

const SUBJECTS = [
  "All",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Geography",
] as const;

const TYPES = ["All", "Notes", "Guide", "Formula Sheet", "Study Plan", "Syllabus Map"] as const;

export default function ResourcesPage() {
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState<string>("All");
  const [rtype, setRtype] = useState<string>("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  const visible = useMemo(() => {
    const term = q.toLowerCase().trim();
    return DATA.filter((r) => {
      const matchesQ =
        !term ||
        [r.title, r.subject, r.type, r.tags.join(" "), r.lang].join(" ").toLowerCase().includes(term);
      const matchesSubject = subject === "All" || r.subject === subject || (subject === "All" && true);
      const matchesType = rtype === "All" || r.type === rtype;
      const matchesFeatured = !onlyFeatured || r.featured;
      return matchesQ && matchesSubject && matchesType && matchesFeatured;
    });
  }, [q, subject, rtype, onlyFeatured]);

  const featured = DATA.filter((r) => r.featured);

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
            <Sparkles className="h-4 w-4" /> Resources
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Curated Notes, Guides & Study Tools
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Download concise notes, formula sheets, study plans, and syllabus maps—aligned with the Somali National Exams.
          </p>
        </div>
      </motion.section>

      {/* Featured strip */}
      {featured.length > 0 && (
        <section className="mt-10 md:mt-14">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Featured Packs</h3>
            <Button
              variant={onlyFeatured ? "default" : "outline"}
              size="sm"
              className="gap-2"
              onClick={() => setOnlyFeatured((v) => !v)}
            >
              <Star className="h-4 w-4" /> {onlyFeatured ? "Showing Featured" : "Show Only Featured"}
            </Button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((r) => (
              <ResourceCard key={r.id} r={r} compact />
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12">
        {/* Sidebar (desktop) */}
        <aside className="sticky top-20 hidden self-start lg:col-span-3 lg:block">
          <FilterCard
            q={q}
            setQ={setQ}
            subject={subject}
            setSubject={setSubject}
            rtype={rtype}
            setRtype={setRtype}
            view={view}
            setView={setView}
          />
        </aside>

        {/* Content */}
        <div className="lg:col-span-9">
          {/* Mobile controls */}
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <div className="relative w-full max-w-[60%]">
              <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search resources…"
                className="pl-8"
                aria-label="Search resources"
              />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="ml-2 gap-2">
                  <Filter className="h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[340px] sm:w-[380px]">
                <SheetHeader>
                  <SheetTitle>Filter resources</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <FilterInner
                    q={q}
                    setQ={setQ}
                    subject={subject}
                    setSubject={setSubject}
                    rtype={rtype}
                    setRtype={setRtype}
                    view={view}
                    setView={setView}
                  />
                  <div className="pt-3">
                    <SheetClose asChild>
                      <Button className="w-full">Apply</Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Results */}
          {visible.length === 0 ? (
            <div className="mx-auto max-w-md rounded-xl border bg-card/50 p-6 text-center text-sm text-muted-foreground">
              No resources match your filters. Try another subject or type.
            </div>
          ) : view === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((r) => (
                <ResourceCard key={r.id} r={r} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {visible.map((r) => (
                <ResourceRow key={r.id} r={r} />
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/papers">
                <FileText className="h-4 w-4" /> Browse Past Papers
              </Link>
            </Button>
            <Button asChild size="lg" className="gap-2 bg-emerald-600 hover:bg-emerald-600/90">
              <Link href="/quizzes">
                <BookOpen className="h-4 w-4" /> Practice Quizzes
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* --------------------------- Components --------------------------- */

function FilterCard(props: any) {
  const { q, setQ, subject, setSubject, rtype, setRtype, view, setView } = props;
  return (
    <Card className="border-muted/40">
      <CardHeader>
        <CardTitle className="text-base">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search resources…"
            className="pl-8"
            aria-label="Search resources"
          />
        </div>

        <div className="space-y-2">
          <Label>Subject</Label>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {SUBJECTS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Type</Label>
          <Select value={rtype} onValueChange={setRtype}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />
        <div className="flex items-center justify-between">
          <Label className="text-sm text-muted-foreground">View</Label>
          <div className="flex gap-1">
            <Button
              type="button"
              variant={view === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("grid")}
              className="gap-2"
            >
              <Grid2X2 className="h-4 w-4" /> Grid
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
      </CardContent>
    </Card>
  );
}

function FilterInner(props: any) {
  const { q, setQ, subject, setSubject, rtype, setRtype, view, setView } = props;
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search resources…"
          className="pl-8"
        />
      </div>
      <div className="space-y-2">
        <Label>Subject</Label>
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger>
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            {SUBJECTS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Type</Label>
        <Select value={rtype} onValueChange={setRtype}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={() => setView("grid")} variant={view === "grid" ? "default" : "outline"} size="sm" className="gap-2">
          <Grid2X2 className="h-4 w-4" /> Grid
        </Button>
        <Button onClick={() => setView("list")} variant={view === "list" ? "default" : "outline"} size="sm" className="gap-2">
          <Layers className="h-4 w-4" /> List
        </Button>
      </div>
    </div>
  );
}

function ResourceCard({ r, compact = false }: { r: Resource; compact?: boolean }) {
  return (
    <Card className="group border-muted/40 transition-shadow hover:shadow-md">
      <CardHeader className={compact ? "pb-2" : "pb-3"}>
        <CardTitle className="flex items-center justify-between text-base">
          <span className="truncate" title={r.title}>{r.title}</span>
          <Badge variant="secondary">{r.type}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <BookOpen className="h-4 w-4" /> {r.subject}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" /> ~{r.minutes} min
          </span>
          <span className="inline-flex items-center gap-1">
            <Download className="h-4 w-4" /> {r.sizeMB} MB
          </span>
          <Badge className="bg-emerald-600 hover:bg-emerald-600/90">{r.lang}</Badge>
          {r.featured && (
            <Badge variant="outline" className="gap-1">
              <Star className="h-3.5 w-3.5" /> Featured
            </Badge>
          )}
        </div>

        {/* tags */}
        <div className="flex flex-wrap gap-2">
          {r.tags.map((t) => (
            <Badge key={t} variant="secondary" className="font-normal">{t}</Badge>
          ))}
        </div>

        <div className="pt-1">
          <div className="flex items-center gap-2">
            <Button asChild className="flex-1 gap-2">
              <Link href={r.href} target="_blank">
                <FileText className="h-4 w-4" /> View
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 gap-2">
              <Link href={r.href} download>
                <Download className="h-4 w-4" /> Download
              </Link>
            </Button>
          </div>
          <Button asChild variant="ghost" size="sm" className="mt-2 w-full gap-2">
            <Link href={`/papers?subject=${encodeURIComponent(r.subject)}`}>
              <Bookmark className="h-4 w-4" /> Related Past Papers
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ResourceRow({ r }: { r: Resource }) {
  return (
    <Card className="border-muted/40">
      <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-medium">{r.title}</span>
            <Badge variant="secondary">{r.type}</Badge>
            {r.featured && (
              <Badge variant="outline" className="gap-1">
                <Star className="h-3.5 w-3.5" /> Featured
              </Badge>
            )}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <BookOpen className="h-4 w-4" /> {r.subject}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" /> ~{r.minutes} min
            </span>
            <span className="inline-flex items-center gap-1">
              <Download className="h-4 w-4" /> {r.sizeMB} MB
            </span>
            <Badge className="bg-emerald-600 hover:bg-emerald-600/90">{r.lang}</Badge>
          </div>
          <div className="mt-1 flex flex-wrap gap-2">
            {r.tags.map((t) => (
              <Badge key={t} variant="secondary" className="font-normal">{t}</Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline" className="gap-2">
            <Link href={r.href} download>
              <Download className="h-4 w-4" /> Download
            </Link>
          </Button>
          <Button asChild size="sm" className="gap-2">
            <Link href={r.href} target="_blank">
              <FileText className="h-4 w-4" /> View
            </Link>
          </Button>
          <Button asChild size="sm" variant="ghost" className="gap-2">
            <Link href={`/papers?subject=${encodeURIComponent(r.subject)}`}>
              <CheckCircle2 className="h-4 w-4" /> Past Papers
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
