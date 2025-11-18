"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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

// ------------------------------------------------------------
// SomDevz — Hero (Grade 12 Exams)
// Modern left copy + right dashboard preview adapted to exams.
// ------------------------------------------------------------

export default function HeroPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* mesh blobs */}
        <div className="absolute left-1/2 top-[-20%] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-400/15 via-sky-300/15 to-teal-300/15 blur-3xl" />
        <div className="absolute right-[-10%] top-1/3 h-[50vh] w-[50vh] rounded-full bg-gradient-to-tr from-emerald-400/15 via-lime-300/15 to-sky-300/10 blur-3xl" />
        {/* grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.zinc.200/6)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.zinc.200/6)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(60%_60%_at_50%_30%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,theme(colors.zinc.800/35)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.zinc.800/35)_1px,transparent_1px)]" />
        {/* noise */}
        <div className="absolute inset-0 opacity-[0.03] [background-image:url('/noise.png')] [background-size:200px]" />
      </div>

      <section className="relative">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12">
          {/* LEFT: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-7"
          >
            <Badge variant="secondary" className="mb-4 inline-flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              Somalia’s Leading Grade 12 Exam Platform
            </Badge>

            <h1 className="text-balance bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-4xl font-bold leading-tight text-transparent sm:text-5xl md:text-6xl">
  Master <span className="text-[#00cc8f]">Grade 12</span> and Transform Your <span className="text-[#00cc8f]">Future</span> in One Year
</h1>


            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
  Everything you need to ace the Somali National Exams — past papers, instant quiz grading, marking schemes, and bite-sized study notes in Somali, all in one sleek platform.
</p>


            {/* bullets */}
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-emerald-600" />
                <span>
                  <span className="font-medium text-foreground">Past Papers & Marking Schemes</span> —
                  download PDFs by subject & year.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-emerald-600" />
                <span>
                  <span className="font-medium text-foreground">Smart Quizzes</span> — auto-grading with
                  explanations in Somali.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-emerald-600" />
                <span>
                  <span className="font-medium text-foreground">Resources & Notes</span> — concise topic
                  summaries aligned to the syllabus.
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group">
                <Link href="/study">
                  Start Studying
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/papers">View Papers</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="sm:ml-2">
                <Link href="/waitlist">Join Waitlist</Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">5,000+</span> Somali students
              </div>
              <div className="hidden h-4 w-px bg-border sm:block" />
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">12+</span> subjects
              </div>
              <div className="hidden h-4 w-px bg-border lg:block" />
              <div className="hidden items-center gap-2 lg:flex">
                <span className="font-medium text-foreground">Always in Somali</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Dashboard-like card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="col-span-5"
          >
            <div className="relative rounded-2xl border bg-card/60 p-5 shadow-sm backdrop-blur">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent" />

              {/* window top bar with traffic lights */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
                </div>
                <div className="text-xs text-muted-foreground">Week 6 of 12</div>
              </div>

              {/* Header row */}
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">
                  Somali National Exam Prep
                </div>
                <div className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
                  <GraduationCap className="h-3.5 w-3.5" />
                  Grade 12
                </div>
              </div>

              {/* Card: Exam Journey */}
              <div className="mt-3 rounded-xl border bg-muted/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Exam Prep Journey</div>
                  <div className="text-xs text-muted-foreground">25% Complete</div>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-3 text-xs">
                  {[
                    { label: "Somali", w: "w-3/3" },
                    { label: "Math", w: "w-1/3" },
                    { label: "Physics", w: "w-1/4" },
                    { label: "Biology", w: "w-1/2" },
                    { label: "English", w: "w-1/5" },
                  ].map((b) => (
                    <div key={b.label}>
                      <div className="mb-1 text-muted-foreground">{b.label}</div>
                      <div className="h-1.5 w-full rounded-full bg-border">
                        <div className={`h-1.5 rounded-full bg-emerald-500 ${b.w}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card: Past Papers Progress */}
              <div className="mt-3 rounded-xl border bg-muted/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <FileText className="h-4 w-4" /> Past Papers Progress
                  </div>
                  <div className="text-xs text-emerald-600">Active</div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  6/20 papers completed • Marking schemes included
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-border">
                  <div className="h-1.5 w-1/3 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* Card: Live Revision */}
              <div className="mt-3 rounded-xl border bg-muted/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <BookOpen className="h-4 w-4" /> Live Revision Session
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> Tomorrow • 14:00–15:30
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  {[1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="h-2.5 w-2.5 rounded-full bg-emerald-500/70 ring-2 ring-emerald-500/20"
                    />
                  ))}
                  <span className="text-xs text-muted-foreground">+18 joined</span>
                </div>
              </div>

              {/* Card: Current Subject */}
              <div className="mt-3 rounded-xl border bg-muted/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Layers className="h-4 w-4" /> Current Subject — Physics
                  </div>
                  <div className="text-xs">68% Complete</div>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-3 text-xs text-muted-foreground">
                  <div>
                    <div>Mechanics</div>
                    <div className="mt-1 h-1 w-full rounded bg-emerald-500/80" />
                  </div>
                  <div>
                    <div>Waves</div>
                    <div className="mt-1 h-1 w-1/2 rounded bg-emerald-500/80" />
                  </div>
                  <div>
                    <div>Electricity</div>
                    <div className="mt-1 h-1 w-2/3 rounded bg-emerald-500/80" />
                  </div>
                  <div>
                    <div>Optics</div>
                    <div className="mt-1 h-1 w-1/3 rounded bg-emerald-500/80" />
                  </div>
                </div>
              </div>

              {/* Bottom pills */}
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <div className="flex items-center gap-2 rounded-xl border bg-card p-3 text-xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Always in Somali
                </div>
                <div className="flex items-center gap-2 rounded-xl border bg-card p-3 text-xs">
                  <Download className="h-4 w-4 text-emerald-600" />
                  Offline PDFs
                </div>
              </div>

              {/* Footer link */}
              <div className="mt-4 text-center text-xs">
                <Link href="/curriculum" className="text-emerald-700 hover:underline dark:text-emerald-400">
                  View Full Curriculum →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
