"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpenCheck,
  Search,
  Filter,
  Timer,
  CheckCircle2,
  Play,
  Layers,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

/** ---------- Types & Data ---------- */

type Difficulty = "Easy" | "Moderate" | "Hard";
type Subject =
  | "Math"
  | "Physics"
  | "Biology"
  | "Chemistry"
  | "English"
  | "Somali"
  | "History";

type Quiz = {
  id: string;
  title: string;
  subject: Subject;
  difficulty: Difficulty;
  durationMin: number;
  questions: number;
  progress: number;
  isActive: boolean;
};

const SUBJECTS: Subject[] = [
  "Math",
  "Physics",
  "Biology",
  "Chemistry",
  "English",
  "Somali",
  "History",
];

const DIFFICULTIES: Difficulty[] = ["Easy", "Moderate", "Hard"];

const QUIZZES: Quiz[] = [
  { id: "qz-math-mechanics", title: "Mechanics Fundamentals", subject: "Physics", difficulty: "Moderate", durationMin: 20, questions: 20, progress: 35, isActive: true },
  { id: "qz-phy-waves", title: "Waves & Optics", subject: "Physics", difficulty: "Hard", durationMin: 25, questions: 22, progress: 68, isActive: true },
  { id: "qz-bio-cells", title: "Cell Biology Basics", subject: "Biology", difficulty: "Easy", durationMin: 15, questions: 15, progress: 10, isActive: true },
  { id: "qz-math-algebra", title: "Algebra Drills", subject: "Math", difficulty: "Moderate", durationMin: 18, questions: 18, progress: 0, isActive: true },
  { id: "qz-eng-grammar", title: "English Grammar Essentials", subject: "English", difficulty: "Easy", durationMin: 12, questions: 12, progress: 100, isActive: true },
  { id: "qz-chem-bonds", title: "Chemical Bonding", subject: "Chemistry", difficulty: "Moderate", durationMin: 20, questions: 20, progress: 52, isActive: true },
];

/** ---------- UI helpers ---------- */

function subjectAccent(subject: Subject): string {
  // Light + Dark variants
  switch (subject) {
    case "Math":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:ring-emerald-800";
    case "Physics":
      return "bg-teal-50 text-teal-700 ring-1 ring-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:ring-teal-800";
    case "Biology":
      return "bg-green-50 text-green-700 ring-1 ring-green-200 dark:bg-green-900/30 dark:text-green-200 dark:ring-green-800";
    case "Chemistry":
      return "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-200 dark:ring-cyan-800";
    case "English":
      return "bg-sky-50 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-900/30 dark:text-sky-200 dark:ring-sky-800";
    case "Somali":
      return "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-200 dark:ring-indigo-800";
    case "History":
      return "bg-amber-50 text-amber-800 ring-1 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:ring-amber-800";
  }
}

function difficultyBadge(d: Difficulty): JSX.Element {
  const base = "rounded-full px-2.5 py-0.5 text-xs font-medium";
  if (d === "Easy")
    return (
      <span className={`${base} bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200`}>
        Easy
      </span>
    );
  if (d === "Moderate")
    return (
      <span className={`${base} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200`}>
        Moderate
      </span>
    );
  return (
    <span className={`${base} bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200`}>
      Hard
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-muted dark:bg-slate-800">
      <div
        className="h-2 rounded-full bg-emerald-500 transition-all dark:bg-emerald-400"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        role="progressbar"
      />
    </div>
  );
}

/** ---------- Quiz Card ---------- */

function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <Card className="group relative overflow-hidden border-muted-foreground/10 shadow-sm transition hover:shadow-md dark:border-slate-800">
      {/* soft corner gradient */}
      <div className="pointer-events-none absolute -right-24 -top-24 size-48 rounded-full bg-gradient-to-br from-emerald-200/30 to-teal-200/30 blur-2xl dark:from-emerald-500/10 dark:to-teal-400/10" />
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={`border-none ${subjectAccent(quiz.subject)}`}>
            {quiz.subject}
          </Badge>
          {difficultyBadge(quiz.difficulty)}
          {quiz.progress >= 100 ? (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="size-3.5" />
              Completed
            </span>
          ) : null}
        </div>
        <CardTitle className="text-lg">{quiz.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Timer className="size-4" />
            {quiz.durationMin} min
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Layers className="size-4" />
            {quiz.questions} questions
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpenCheck className="size-4" />
            Auto-graded
          </span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{quiz.progress}%</span>
          </div>
          <ProgressBar value={quiz.progress} />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button asChild size="sm" className="gap-1.5">
          <Link href={`/quizzes/${quiz.id}`}>
            <Play className="size-4" />
            Start Quiz
          </Link>
        </Button>
        <Button asChild size="sm" variant="secondary">
          <Link href={`/quizzes/${quiz.id}/review`}>Review</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

/** ---------- Page ---------- */

export default function QuizzesPage() {
  const [q, setQ] = useState<string>("");
  const [subject, setSubject] = useState<Subject | "All">("All");
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");
  const [maxDuration, setMaxDuration] = useState<number>(60);

  const filtered = useMemo(() => {
    const qLower = q.trim().toLowerCase();
    return QUIZZES.filter((item) => {
      const matchesQuery =
        qLower.length === 0 ||
        item.title.toLowerCase().includes(qLower) ||
        item.subject.toLowerCase().includes(qLower);
      const matchesSubject = subject === "All" || item.subject === subject;
      const matchesDiff = difficulty === "All" || item.difficulty === difficulty;
      const matchesDuration = item.durationMin <= maxDuration;
      return matchesQuery && matchesSubject && matchesDiff && matchesDuration;
    });
  }, [q, subject, difficulty, maxDuration]);

  const completedCount = useMemo(
    () => QUIZZES.filter((z) => z.progress >= 100).length,
    []
  );

  return (
    <main className="relative">
      {/* page bg glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-quiz-glow-light dark:bg-quiz-glow-dark" />

      {/* Header / Hero */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
              <Sparkles className="size-3.5" />
              Somalia’s Grade 12 Exam Prep
            </div>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Smart Quizzes — <span className="text-emerald-600 dark:text-emerald-400">Auto-Graded</span> with Explanations
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              Practice by subject, difficulty, and time. Track progress — all in Somali-friendly wording.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                {completedCount} completed
              </span>
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap className="size-4 text-emerald-600 dark:text-emerald-400" />
                Always in Somali
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BookOpenCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
                Past papers aligned
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-md rounded-2xl border bg-white/60 p-4 shadow-sm backdrop-blur md:w-[380px] dark:border-slate-800 dark:bg-slate-900/40"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="border-none bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                  Active
                </Badge>
                <span className="text-sm text-muted-foreground">Exam Prep Journey</span>
              </div>
              <div className="space-y-2">
                {["Math", "Physics", "Biology", "English"].map((s, i) => (
                  <div key={s} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{s}</span>
                      <span className="text-muted-foreground">{[32, 25, 60, 48][i]}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted dark:bg-slate-800">
                      <div
                        className="h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
                        style={{ width: `${[32, 25, 60, 48][i]}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Button asChild className="w-full">
                  <Link href="/curriculum">View Full Curriculum →</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Separator className="mb-6" />

      {/* Filters */}
      <section className="mx-auto max-w-6xl px-4">
        <Card className="border-muted-foreground/10 dark:border-slate-800">
          <CardContent className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="search" className="inline-flex items-center gap-1.5">
                <Search className="size-4" /> Search
              </Label>
              <Input
                id="search"
                inputMode="search"
                placeholder="Search quizzes or subjects…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="inline-flex items-center gap-1.5">
                <Filter className="size-4" /> Subject
              </Label>
              <Select value={subject} onValueChange={(v) => setSubject(v as Subject | "All")}>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
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
              <Select value={difficulty} onValueChange={(v) => setDifficulty(v as Difficulty | "All")}>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  {DIFFICULTIES.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Max Duration (min)</Label>
              <Input
                id="duration"
                type="number"
                min={5}
                max={120}
                value={maxDuration}
                onChange={(e) => setMaxDuration(Number(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground dark:border-slate-800">
            No quizzes match your filters.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{filtered.length}</span> of{" "}
            <span className="font-medium">{QUIZZES.length}</span> quizzes
          </p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" asChild>
              <Link href="/subjects">View Subjects</Link>
            </Button>
            <Button asChild>
              <Link href="/waitlist">Join Waitlist</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
