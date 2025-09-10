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
  Timer,
  BookOpenCheck,
  CheckCircle2,
  Flame,
  Grid2X2,
  Layers,
  BarChart3,
} from "lucide-react";

// ------------------------------------------------------------
// Dugsi Hub — Quizzes (app/quizzes/page.tsx)
// Filterable quizzes with difficulty, subject, time, questions.
// Desktop: sticky sidebar filters. Mobile: filter drawer.
// ------------------------------------------------------------

type Quiz = {
  id: string;
  title: string;
  subject: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  questions: number;
  estMinutes: number;
  tags: string[];
  href: string;
  attempts?: number;     // optional stat
  accuracy?: number;     // % average accuracy
};

const QUIZZES: Quiz[] = [
  {
    id: "phy-kinematics-beg",
    title: "Physics: Kinematics Basics",
    subject: "Physics",
    difficulty: "Beginner",
    questions: 15,
    estMinutes: 18,
    tags: ["Vectors", "Motion", "Formulae"],
    href: "/quiz/physics/kinematics-basics",
    attempts: 1240,
    accuracy: 72,
  },
  {
    id: "math-algebra-int",
    title: "Mathematics: Algebra & Functions",
    subject: "Mathematics",
    difficulty: "Intermediate",
    questions: 20,
    estMinutes: 25,
    tags: ["Equations", "Graphs"],
    href: "/quiz/mathematics/algebra-functions",
    attempts: 980,
    accuracy: 66,
  },
  {
    id: "chem-stoich-adv",
    title: "Chemistry: Stoichiometry Challenge",
    subject: "Chemistry",
    difficulty: "Advanced",
    questions: 25,
    estMinutes: 30,
    tags: ["Moles", "Limiting Reactant"],
    href: "/quiz/chemistry/stoichiometry",
    attempts: 610,
    accuracy: 54,
  },
  {
    id: "bio-genetics-int",
    title: "Biology: Genetics & Heredity",
    subject: "Biology",
    difficulty: "Intermediate",
    questions: 18,
    estMinutes: 22,
    tags: ["Punnett", "DNA"],
    href: "/quiz/biology/genetics",
    attempts: 730,
    accuracy: 69,
  },
  {
    id: "eng-comp-beg",
    title: "English: Reading Comprehension",
    subject: "English",
    difficulty: "Beginner",
    questions: 12,
    estMinutes: 15,
    tags: ["Inference", "Vocabulary"],
    href: "/quiz/english/reading-comprehension",
    attempts: 1420,
    accuracy: 75,
  },
  {
    id: "geo-maps-int",
    title: "Geography: Maps & Coordinates",
    subject: "Geography",
    difficulty: "Intermediate",
    questions: 16,
    estMinutes: 20,
    tags: ["Latitude", "Scale"],
    href: "/quiz/geography/maps",
    attempts: 520,
    accuracy: 68,
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

const DIFFICULTIES = ["All levels", "Beginner", "Intermediate", "Advanced"] as const;

export default function QuizzesPage() {
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState<string>("All subjects");
  const [difficulty, setDifficulty] = useState<string>("All levels");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<"popular" | "recent" | "time" | "difficulty">("popular");

  const visible = useMemo(() => {
    const term = q.toLowerCase().trim();
    let res = QUIZZES.filter((z) => {
      const matchesQ =
        !term ||
        [z.title, z.subject, z.tags.join(" "), z.difficulty].join(" ").toLowerCase().includes(term);
      const matchesSubject = subject === "All subjects" || z.subject === subject;
      const matchesDiff = difficulty === "All levels" || z.difficulty === (difficulty as Quiz["difficulty"]);
      return matchesQ && matchesSubject && matchesDiff;
    });

    // sorting
    res = [...res].sort((a, b) => {
      if (sort === "popular") return (b.attempts ?? 0) - (a.attempts ?? 0);
      if (sort === "recent") return b.id.localeCompare(a.id); // placeholder
      if (sort === "time") return a.estMinutes - b.estMinutes;
      if (sort === "difficulty") {
        const order = { Beginner: 0, Intermediate: 1, Advanced: 2 };
        return order[a.difficulty] - order[b.difficulty];
      }
      return 0;
    });

    return res;
  }, [q, subject, difficulty, sort]);

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
            <Sparkles className="h-4 w-4" /> Quizzes (Auto-graded)
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Practice Somali National Exam Questions
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Timed quizzes with instant feedback and explanations in Somali. Filter by subject and difficulty.
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
                  placeholder="Search quizzes…"
                  className="pl-8"
                  aria-label="Search quizzes"
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
                <Label>Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTIES.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />
              <div className="space-y-2">
                <Label>Sort by</Label>
                <Select value={sort} onValueChange={(v: any) => setSort(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most popular</SelectItem>
                    <SelectItem value="recent">Most recent</SelectItem>
                    <SelectItem value="time">Shortest time</SelectItem>
                    <SelectItem value="difficulty">Difficulty</SelectItem>
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
                placeholder="Search quizzes…"
                className="pl-8"
                aria-label="Search quizzes"
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
                  <SheetTitle>Filter quizzes</SheetTitle>
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
                    <Label>Difficulty</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {DIFFICULTIES.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Sort by</Label>
                    <Select value={sort} onValueChange={(v: any) => setSort(v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">Most popular</SelectItem>
                        <SelectItem value="recent">Most recent</SelectItem>
                        <SelectItem value="time">Shortest time</SelectItem>
                        <SelectItem value="difficulty">Difficulty</SelectItem>
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
              No quizzes match your filters. Try another subject or difficulty.
            </div>
          ) : view === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((z) => (
                <Card key={z.id} className="group border-muted/40 transition-shadow hover:shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-base">
                      <span className="truncate" title={z.title}>{z.title}</span>
                      <Badge className="bg-emerald-600 hover:bg-emerald-600/90">{z.difficulty}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <BookOpenCheck className="h-4 w-4" /> {z.questions} questions
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Timer className="h-4 w-4" /> ~{z.estMinutes} min
                      </span>
                      <Badge variant="secondary">{z.subject}</Badge>
                    </div>

                    {/* stats */}
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      {typeof z.attempts === "number" && (
                        <span className="inline-flex items-center gap-1">
                          <Flame className="h-3.5 w-3.5" /> {z.attempts.toLocaleString()} attempts
                        </span>
                      )}
                      {typeof z.accuracy === "number" && (
                        <span className="inline-flex items-center gap-1">
                          <BarChart3 className="h-3.5 w-3.5" /> {z.accuracy}% avg. accuracy
                        </span>
                      )}
                    </div>

                    {/* tags */}
                    <div className="mt-1 flex flex-wrap gap-2">
                      {z.tags.map((t) => (
                        <Badge key={t} variant="secondary">{t}</Badge>
                      ))}
                    </div>

                    <div className="pt-1">
                      <Button asChild className="w-full gap-2">
                        <Link href={z.href}>
                          <CheckCircle2 className="h-4 w-4" /> Start Quiz
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {visible.map((z) => (
                <Card key={z.id} className="border-muted/40">
                  <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">{z.title}</span>
                        <Badge className="bg-emerald-600 hover:bg-emerald-600/90">{z.difficulty}</Badge>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <BookOpenCheck className="h-4 w-4" /> {z.questions} Qs
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Timer className="h-4 w-4" /> ~{z.estMinutes} min
                        </span>
                        <Badge variant="secondary">{z.subject}</Badge>
                        {typeof z.attempts === "number" && (
                          <span className="inline-flex items-center gap-1">
                            <Flame className="h-3.5 w-3.5" /> {z.attempts.toLocaleString()} attempts
                          </span>
                        )}
                        {typeof z.accuracy === "number" && (
                          <span className="inline-flex items-center gap-1">
                            <BarChart3 className="h-3.5 w-3.5" /> {z.accuracy}% accuracy
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {z.tags.map((t) => (
                          <Badge key={t} variant="secondary">{t}</Badge>
                        ))}
                      </div>
                    </div>

                    <Button asChild size="sm" className="gap-2">
                      <Link href={z.href}>
                        <CheckCircle2 className="h-4 w-4" /> Start
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-8 flex items-center justify-center">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/papers">
                Browse Past Papers
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
