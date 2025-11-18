"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  FileText,
  GraduationCap,
  BookOpen,
  Layers,
  Clock,
  Download,
  CheckCircle2,
} from "lucide-react";

type Subject = {
  name: string;
  slug: string;
  progress?: number;
  short?: string;
};

const SUBJECTS: Subject[] = [
  { name: "Islamic", slug: "islamic", progress: 12, short: "Fiqh, Tafseer, Hadith highlights." },
  { name: "Somali", slug: "somali", progress: 30, short: "Grammar, comprehension & essay practice." },
  { name: "Arabic", slug: "arabic", progress: 8, short: "Reading, translation & key vocabulary." },
  { name: "English", slug: "english", progress: 45, short: "Comprehension, grammar and writing." },
  { name: "Math", slug: "math", progress: 22, short: "Algebra, calculus basics & problem solving." },
  { name: "Physics", slug: "physics", progress: 68, short: "Mechanics, electricity & past-paper drills." },
  { name: "History", slug: "history", progress: 14, short: "Events, timelines & question techniques." },
  { name: "Geography", slug: "geography", progress: 9, short: "Maps, climate systems & case studies." },
  { name: "Biology", slug: "biology", progress: 50, short: "Cells, ecology and practical reasoning." },
  { name: "Chemistry", slug: "chemistry", progress: 18, short: "Equations, reactions & mark schemes." },
  { name: "Business", slug: "business", progress: 5, short: "Key concepts, case questions & practice." },
  { name: "ICT", slug: "ict", progress: 27, short: "Theory, practical tasks & exam tips." },
];

const listVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.05, ease: "easeOut" } },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.28 } },
} as const;

export default function SubjectsPage(): JSX.Element {
  const [query, setQuery] = useState<string>("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SUBJECTS;
    return SUBJECTS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.short ?? "").toLowerCase().includes(q) ||
        s.slug.includes(q)
    );
  }, [query]);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-white to-emerald-50 dark:from-zinc-900 dark:to-zinc-800 overflow-hidden">
      {/* Decorative background gradients */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-400/20 via-sky-300/20 to-teal-300/20 blur-3xl animate-blob" />
        <div className="absolute right-[-10%] top-1/3 h-[50vh] w-[50vh] rounded-full bg-gradient-to-tr from-lime-300/20 via-emerald-400/10 to-sky-300/10 blur-3xl animate-blob" />
      </div>

      <section className="relative px-6 py-16 sm:px-8 lg:px-12 lg:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT: Hero + Explainer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >
          <Badge variant="secondary" className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> Grade 12 Subjects — Explained
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Learn <span className="text-emerald-600">smarter</span>, not harder.
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Explore every Grade 12 subject with clear explanations, practical exercises, and exam-focused resources.
            Get instant feedback from quizzes, review past papers, and follow step-by-step study plans in Somali.
          </p>

          {/* Key benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start gap-3 rounded-xl border p-4 bg-white shadow hover:shadow-md transition">
              <FileText className="h-6 w-6 text-emerald-600 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Past Papers Simplified</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Access papers by year and subject, view marking schemes, and master exam techniques.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border p-4 bg-white shadow hover:shadow-md transition">
              <BookOpen className="h-6 w-6 text-emerald-600 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Smart Quizzes</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Test yourself with instant scoring, hints, and feedback in Somali.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border p-4 bg-white shadow hover:shadow-md transition">
              <Layers className="h-6 w-6 text-emerald-600 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Concise Notes</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Short, targeted notes help you revise faster and grasp concepts clearly.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border p-4 bg-white shadow hover:shadow-md transition">
              <GraduationCap className="h-6 w-6 text-emerald-600 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Structured Plans</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Follow 4–12 week study plans combining notes, quizzes, and past-paper practice.
                </p>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button asChild size="lg">
              <Link href="/study">
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/papers">View Papers</Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/study#tips">Study Tips</Link>
            </Button>
          </div>
        </motion.div>

        {/* RIGHT: Subjects dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-lg border border-zinc-100 dark:border-zinc-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-sm">Subjects Dashboard</h3>
              <div className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
                <GraduationCap className="h-3.5 w-3.5" /> Grade 12
              </div>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {filtered.map((s) => (
                <motion.div
                  key={s.slug}
                  variants={itemVariants}
                  className="flex justify-between items-start p-3 bg-emerald-50/20 border border-emerald-100 rounded-lg hover:bg-emerald-50 transition"
                >
                  <div className="flex gap-3 items-center">
                    <Layers className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium">{s.name}</h4>
                      <p className="text-xs text-muted-foreground">{s.short}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-xs text-muted-foreground">{s.progress ?? 0}%</span>
                    <div className="h-1.5 w-24 rounded-full bg-border mt-1">
                      <div
                        className="h-1.5 rounded-full bg-emerald-500"
                        style={{ width: `${s.progress ?? 0}%` }}
                      />
                    </div>
                    <div className="mt-2 flex gap-2 text-xs">
                      <Link href={`/subjects/${s.slug}`} className="text-emerald-700 hover:underline">
                        Open
                      </Link>
                      <Link href={`/subjects/${s.slug}#papers`} className="text-muted-foreground hover:underline">
                        Papers
                      </Link>
                      <Link href={`/subjects/${s.slug}#quizzes`} className="text-muted-foreground hover:underline">
                        Quizzes
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom info */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-xs bg-emerald-50 border border-emerald-100 rounded-lg p-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Always in Somali
              </div>
              <div className="flex items-center gap-2 text-xs bg-emerald-50 border border-emerald-100 rounded-lg p-2">
                <Download className="h-4 w-4 text-emerald-600" /> Offline PDFs
              </div>
            </div>

            <div className="mt-3 text-center text-xs">
              <Link href="/curriculum" className="text-emerald-700 hover:underline dark:text-emerald-400">
                View Full Curriculum →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
