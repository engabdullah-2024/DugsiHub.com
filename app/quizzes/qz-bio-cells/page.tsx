"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flag,
  Home,
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

/* --------------------------- Types & Quiz Data --------------------------- */

type Difficulty = "Easy" | "Moderate" | "Hard";

type Question = {
  id: string;
  prompt: string;
  choices: { id: string; text: string }[];
  answerId: string;
  explanation: string;
};

type QuizSpec = {
  id: string;
  title: string;
  subject: "Biology";
  difficulty: Difficulty;
  durationMin: number;
  questions: Question[];
};

const QUIZ: QuizSpec = {
  id: "qz-bio-cells",
  title: "Cell Biology Basics",
  subject: "Biology",
  difficulty: "Easy",
  durationMin: 15,
  questions: [
    {
      id: "q1",
      prompt: "Which organelle is known as the powerhouse of the cell?",
      choices: [
        { id: "a", text: "Golgi apparatus" },
        { id: "b", text: "Mitochondrion" },
        { id: "c", text: "Endoplasmic reticulum" },
        { id: "d", text: "Lysosome" },
      ],
      answerId: "b",
      explanation:
        "Mitochondria generate ATP via cellular respiration, providing energy for cellular processes.",
    },
    {
      id: "q2",
      prompt:
        "What is the primary component of the cell membrane that forms a bilayer?",
      choices: [
        { id: "a", text: "Phospholipids" },
        { id: "b", text: "Cellulose" },
        { id: "c", text: "Cholesterol" },
        { id: "d", text: "Proteins" },
      ],
      answerId: "a",
      explanation:
        "The plasma membrane is a phospholipid bilayer with embedded proteins and cholesterol.",
    },
    {
      id: "q3",
      prompt:
        "Which structure is present in plant cells but absent in animal cells?",
      choices: [
        { id: "a", text: "Nucleus" },
        { id: "b", text: "Centrioles" },
        { id: "c", text: "Chloroplasts" },
        { id: "d", text: "Ribosomes" },
      ],
      answerId: "c",
      explanation:
        "Chloroplasts perform photosynthesis and are unique to plants and some protists.",
    },
    {
      id: "q4",
      prompt: "Ribosomes are the sites of which cellular process?",
      choices: [
        { id: "a", text: "DNA replication" },
        { id: "b", text: "Protein synthesis" },
        { id: "c", text: "Lipid metabolism" },
        { id: "d", text: "Cell division" },
      ],
      answerId: "b",
      explanation:
        "Ribosomes translate mRNA to build polypeptide chains (proteins).",
    },
    {
      id: "q5",
      prompt: "Which organelle modifies, sorts, and packages proteins?",
      choices: [
        { id: "a", text: "Golgi apparatus" },
        { id: "b", text: "Nucleolus" },
        { id: "c", text: "Vacuole" },
        { id: "d", text: "Peroxisome" },
      ],
      answerId: "a",
      explanation:
        "The Golgi receives proteins from the ER and packages them into vesicles for transport.",
    },
  ],
};

/* ------------------------------- Utilities ------------------------------ */

function subjectAccent(): string {
  // Biology accent: soft green/teal, consistent with the list page.
  return "bg-green-50 text-green-700 ring-1 ring-green-200";
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-muted">
      <div
        className="h-2 rounded-full bg-emerald-500 transition-all"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        role="progressbar"
      />
    </div>
  );
}

function difficultyBadge(d: Difficulty): JSX.Element {
  const base = "rounded-full px-2.5 py-0.5 text-xs font-medium";
  if (d === "Easy")
    return <span className={`${base} bg-emerald-100 text-emerald-800`}>Easy</span>;
  if (d === "Moderate")
    return <span className={`${base} bg-yellow-100 text-yellow-800`}>Moderate</span>;
  return <span className={`${base} bg-rose-100 text-rose-800`}>Hard</span>;
}

/* --------------------------------- Page --------------------------------- */

export default function QuizStartPage() {
  // answers keyed by question id
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [index, setIndex] = useState<number>(0); // current question
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState<number>(QUIZ.durationMin * 60);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // countdown (Vercel-safe: client-only)
  useEffect(() => {
    if (submitted) return;
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          setSubmitted(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [submitted]);

  const current = QUIZ.questions[index];

  const attemptedCount = useMemo(
    () => Object.keys(answers).length,
    [answers]
  );

  const progressPercent = useMemo(() => {
    const total = QUIZ.questions.length;
    return Math.round((attemptedCount / total) * 100);
  }, [attemptedCount]);

  const score = useMemo(() => {
    if (!submitted) return 0;
    return QUIZ.questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.answerId ? 1 : 0);
    }, 0);
  }, [submitted, answers]);

  const timeMMSS = useMemo(() => {
    const m = Math.floor(secondsLeft / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(secondsLeft % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  }, [secondsLeft]);

  function choose(qid: string, cid: string) {
    setAnswers((prev) => ({ ...prev, [qid]: cid }));
  }

  function toggleFlag(qid: string) {
    setFlagged((prev) => ({ ...prev, [qid]: !prev[qid] }));
  }

  function submitNow() {
    setSubmitted(true);
  }

  const done = submitted || secondsLeft === 0;

  return (
    <main className="relative">
      {/* soft page glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-emerald-50/70 via-white to-white" />

      {/* Top Bar */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="gap-1.5">
              <Link href="/quizzes">
                <ArrowLeft className="size-4" />
                Back to Quizzes
              </Link>
            </Button>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
              <Sparkles className="size-3.5" />
              Biology — Always in Somali
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className={`border-none ${subjectAccent()}`}
            >
              {QUIZ.subject}
            </Badge>
            {difficultyBadge(QUIZ.difficulty)}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
              <Clock3 className="size-3.5" />
              {timeMMSS}
            </div>
          </div>
        </div>
      </section>

      {/* Header */}
      <section className="mx-auto max-w-6xl px-4 pb-4 pt-6 sm:pt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold sm:text-3xl">
              {QUIZ.title}
            </h1>
            <p className="text-muted-foreground">
              {QUIZ.questions.length} questions • {QUIZ.durationMin} min • Auto-graded
              with explanations
            </p>
          </div>
          <div className="w-full sm:w-[360px]">
            <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <ProgressBar value={progressPercent} />
          </div>
        </div>
      </section>

      <Separator className="mb-6" />

      {/* Main Content */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 pb-10 lg:grid-cols-[1fr,360px]">
        {/* Question Card */}
        <Card className="border-muted-foreground/10">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-3">
              <span className="text-lg">
                Question {index + 1} of {QUIZ.questions.length}
              </span>
              <Button
                variant={flagged[current.id] ? "default" : "secondary"}
                size="sm"
                className="gap-1.5"
                onClick={() => toggleFlag(current.id)}
              >
                <Flag className="size-4" />
                {flagged[current.id] ? "Flagged" : "Flag"}
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <p className="text-base">{current.prompt}</p>

            <div className="space-y-3">
              {current.choices.map((c) => {
                const checked = answers[current.id] === c.id;
                const inputId = `${current.id}-${c.id}`;
                return (
                  <label
                    key={c.id}
                    htmlFor={inputId}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${
                      checked
                        ? "border-emerald-400 bg-emerald-50"
                        : "border-muted-foreground/10 hover:bg-muted/40"
                    }`}
                  >
                    <Input
                      id={inputId}
                      type="radio"
                      name={`q-${current.id}`}
                      value={c.id}
                      checked={checked}
                      onChange={() => choose(current.id, c.id)}
                      className="size-4"
                    />
                    <span>{c.text}</span>
                  </label>
                );
              })}
            </div>

            {done ? (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                <div className="mb-1 font-medium">Explanation</div>
                <div>{current.explanation}</div>
              </div>
            ) : null}
          </CardContent>

          <CardFooter className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={index === 0}
                className="gap-1.5"
              >
                <ChevronLeft className="size-4" />
                Prev
              </Button>
              <Button
                size="sm"
                onClick={() =>
                  setIndex((i) => Math.min(QUIZ.questions.length - 1, i + 1))
                }
                disabled={index === QUIZ.questions.length - 1}
                className="gap-1.5"
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="secondary" asChild size="sm">
                <Link href="/">
                  <Home className="size-4" />
                  Home
                </Link>
              </Button>
              <Button
                onClick={submitNow}
                disabled={done}
                className="gap-1.5"
                size="sm"
              >
                <CheckCircle2 className="size-4" />
                Submit
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Sidebar: Navigator / Summary */}
        <div className="space-y-6">
          <Card className="border-muted-foreground/10">
            <CardHeader>
              <CardTitle className="text-base">Question Navigator</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-8 gap-2">
              {QUIZ.questions.map((q, i) => {
                const attempted = answers[q.id] !== undefined;
                const isFlagged = flagged[q.id];
                const active = index === i;
                return (
                  <button
                    key={q.id}
                    type="button"
                    aria-label={`Question ${i + 1}${
                      isFlagged ? " flagged" : ""
                    }${attempted ? " answered" : ""}`}
                    onClick={() => setIndex(i)}
                    className={[
                      "flex h-9 items-center justify-center rounded-md border text-sm transition",
                      active
                        ? "border-emerald-400 bg-emerald-50 font-medium"
                        : "border-muted-foreground/10 hover:bg-muted/40",
                      attempted ? "ring-1 ring-emerald-300" : "",
                      isFlagged ? "relative" : "",
                    ].join(" ")}
                  >
                    {i + 1}
                    {isFlagged ? (
                      <span className="absolute -right-1 -top-1 inline-block size-2 rounded-full bg-amber-500" />
                    ) : null}
                  </button>
                );
              })}
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Tap a number to jump. Yellow dot = flagged.
            </CardFooter>
          </Card>

          <Card className="border-muted-foreground/10">
            <CardHeader>
              <CardTitle className="text-base">Your Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Attempted</span>
                <span className="font-medium">
                  {attemptedCount}/{QUIZ.questions.length}
                </span>
              </div>
              <div className="space-y-1">
                <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{progressPercent}%</span>
                </div>
                <ProgressBar value={progressPercent} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Time Left</span>
                <span className="font-medium">{timeMMSS}</span>
              </div>
              {done ? (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900"
                >
                  <div className="mb-1 font-medium">Result</div>
                  <div>
                    Score:{" "}
                    <span className="font-semibold">
                      {score}/{QUIZ.questions.length}
                    </span>
                  </div>
                </motion.div>
              ) : null}
            </CardContent>
            <CardFooter className="flex flex-wrap items-center justify-between gap-2">
              <Button asChild variant="secondary" size="sm">
                <Link href="/quizzes">Exit</Link>
              </Button>
              {!done ? (
                <Button onClick={submitNow} size="sm">
                  Submit Quiz
                </Button>
              ) : (
                <Button asChild size="sm">
                  <Link href="/quizzes/qz-bio-cells/review">Review Answers</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
}
