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
  Calendar,
  Download,
  FileText,
  Filter,
  Grid2X2,
  Layers,
  Search,
  Sparkles,
  BookOpenCheck,
} from "lucide-react";

// ------------------------------------------------------------
// Dugsi Hub — Past Papers (app/papers/page.tsx)
// Modern, filterable list of Somali National Exam PDFs with actions.
// Desktop: sticky sidebar filters. Mobile: filter drawer.
// ------------------------------------------------------------

type Paper = {
  id: string;
  subject: string;
  year: number;
  type: "Paper 1" | "Paper 2" | "Marking Scheme";
  lang: "Somali" | "English";
  sizeMB: number;
  pages: number;
  href: string;      // PDF URL
  quizHref?: string; // Optional quiz route
};

const DATA: Paper[] = [
  {
    id: "phy-2024-p1",
    subject: "Physics",
    year: 2024,
    type: "Paper 1",
    lang: "Somali",
    sizeMB: 1.8,
    pages: 14,
    href: "/pdf/physics-2024-p1.pdf",
    quizHref: "/quizzes/physics-2024-p1",
  },
  {
    id: "phy-2024-ms",
    subject: "Physics",
    year: 2024,
    type: "Marking Scheme",
    lang: "Somali",
    sizeMB: 0.9,
    pages: 6,
    href: "/pdf/physics-2024-ms.pdf",
  },
  {
    id: "math-2023-p2",
    subject: "Mathematics",
    year: 2023,
    type: "Paper 2",
    lang: "Somali",
    sizeMB: 2.3,
    pages: 16,
    href: "/pdf/math-2023-p2.pdf",
    quizHref: "/quizzes/math-2023-p2",
  },
  {
    id: "bio-2022-p1",
    subject: "Biology",
    year: 2022,
    type: "Paper 1",
    lang: "Somali",
    sizeMB: 1.4,
    pages: 12,
    href: "/pdf/biology-2022-p1.pdf",
  },
  {
    id: "eng-2024-p1",
    subject: "English",
    year: 2024,
    type: "Paper 1",
    lang: "English",
    sizeMB: 1.1,
    pages: 10,
    href: "/pdf/english-2024-p1.pdf",
  },
  {
    id: "chem-2023-p1",
    subject: "Chemistry",
    year: 2023,
    type: "Paper 1",
    lang: "Somali",
    sizeMB: 1.9,
    pages: 13,
    href: "/pdf/chemistry-2023-p1.pdf",
  },
];

const SUBJECTS = [
  "All subjects",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "ICT",
] as const;

const YEARS = ["All years", "2024", "2023", "2022", "2021", "2020"] as const;

export default function PapersPage() {
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState<string>("All subjects");
  const [year, setYear] = useState<string>("All years");
  const [view, setView] = useState<"grid" | "list">("grid");

  const visible = useMemo(() => {
    const term = q.toLowerCase().trim();
    return DATA.filter((p) => {
      const matchesQ =
        !term ||
        [p.subject, p.type, p.lang, String(p.year)]
          .join(" ")
          .toLowerCase()
          .includes(term);
      const matchesSubject = subject === "All subjects" || p.subject === subject;
      const matchesYear = year === "All years" || String(p.year) === year;
      return matchesQ && matchesSubject && matchesYear;
    });
  }, [q, subject, year]);

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
            <Sparkles className="h-4 w-4" /> Past Papers (Grade 12)
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Download Somali National Exam Papers
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Filter by subject & year. View PDFs, take auto-graded quizzes, and
            study with marking schemes.
          </p>
        </div>
      </motion.section>

      <section className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12">
        {/* Sidebar (desktop) */}
        <aside className="sticky top-20 hidden self-start lg:col-span-3 lg:block">
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
                  placeholder="Search papers…"
                  className="pl-8"
                  aria-label="Search past papers"
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
                <Label>Year</Label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map((y) => (
                      <SelectItem key={y} value={y}>
                        {y}
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
                placeholder="Search papers…"
                className="pl-8"
                aria-label="Search past papers"
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
                  <SheetTitle>Filter papers</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-4">
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
                    <Label>Year</Label>
                    <Select value={year} onValueChange={setYear}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {YEARS.map((y) => (
                          <SelectItem key={y} value={y}>
                            {y}
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

                  <div className="pt-2">
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
              No papers match your filters. Try a different subject or year.
            </div>
          ) : view === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((p) => (
                <Card key={p.id} className="group border-muted/40 transition-shadow hover:shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-base">
                      <span className="truncate" title={`${p.subject} ${p.year} ${p.type}`}>
                        {p.subject} — {p.year}
                      </span>
                      <Badge variant="secondary">{p.type}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-4 w-4" /> {p.year}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <FileText className="h-4 w-4" /> {p.pages} pages
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Download className="h-4 w-4" /> {p.sizeMB} MB
                      </span>
                      <Badge className="bg-emerald-600 hover:bg-emerald-600/90">{p.lang}</Badge>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <Button asChild size="sm" className="flex-1">
                        <Link href={p.href} target="_blank" className="gap-2">
                          <FileText className="h-4 w-4" /> View PDF
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline" className="flex-1">
                        <Link href={p.href} download className="gap-2">
                          <Download className="h-4 w-4" /> Download
                        </Link>
                      </Button>
                    </div>

                    {p.quizHref && (
                      <Button asChild size="sm" variant="ghost" className="w-full justify-center gap-2">
                        <Link href={p.quizHref}>
                          <BookOpenCheck className="h-4 w-4" /> Start Quiz
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {visible.map((p) => (
                <Card key={p.id} className="border-muted/40">
                  <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">
                          {p.subject} — {p.year}
                        </span>
                        <Badge variant="secondary">{p.type}</Badge>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-4 w-4" /> {p.year}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <FileText className="h-4 w-4" /> {p.pages} pages
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Download className="h-4 w-4" /> {p.sizeMB} MB
                        </span>
                        <Badge className="bg-emerald-600 hover:bg-emerald-600/90">{p.lang}</Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {p.quizHref && (
                        <Button asChild size="sm" variant="ghost" className="gap-2">
                          <Link href={p.quizHref}>
                            <BookOpenCheck className="h-4 w-4" /> Quiz
                          </Link>
                        </Button>
                      )}
                      <Button asChild size="sm" variant="outline" className="gap-2">
                        <Link href={p.href} download>
                          <Download className="h-4 w-4" /> Download
                        </Link>
                      </Button>
                      <Button asChild size="sm" className="gap-2">
                        <Link href={p.href} target="_blank">
                          <FileText className="h-4 w-4" /> View
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Load more (placeholder) */}
          <div className="mt-8 flex items-center justify-center">
            <Button variant="outline" size="lg" className="gap-2">
              <Download className="h-4 w-4" /> Load more papers
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
