"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Search, Home, BookOpenCheck, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative">
      {/* page glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-emerald-50/70 via-white to-white dark:from-emerald-500/12 dark:via-slate-950 dark:to-slate-950" />

      <section className="mx-auto flex min-h-[70svh] max-w-3xl flex-col items-center px-4 pb-16 pt-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
          <Sparkles className="size-3.5" />
          Somalia’s Grade 12 Exam Prep
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-2 text-4xl font-semibold sm:text-5xl"
        >
          Page Not Found
        </motion.h1>

        <p className="mb-8 max-w-xl text-muted-foreground">
          Eegay, we couldn’t find that page. Try searching for a quiz or go back
          to the main sections.
        </p>

        <Card className="w-full border-muted-foreground/10 dark:border-slate-800">
          <CardContent className="space-y-6 p-6">
            {/* Search */}
            <div className="grid gap-3 sm:grid-cols-[1fr,auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search quizzes or subjects…"
                  className="pl-9"
                  aria-label="Search quizzes"
                />
              </div>
              <Button asChild>
                <Link href="/quizzes">Search</Link>
              </Button>
            </div>

            <Separator />

            {/* Quick links */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="secondary" className="gap-1.5">
                <Link href="/" aria-label="Back to Home">
                  <Home className="size-4" />
                  Home
                </Link>
              </Button>
              <Button asChild className="gap-1.5">
                <Link href="/quizzes" aria-label="Browse Quizzes">
                  <BookOpenCheck className="size-4" />
                  Browse Quizzes
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-1.5">
                <Link href="/subjects" aria-label="View Subjects">
                  <ArrowLeft className="size-4" />
                  Subjects
                </Link>
              </Button>
              <Badge
                variant="secondary"
                className="border-none bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
              >
                Always in Somali
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* small helper block */}
        <p className="mt-6 text-xs text-muted-foreground">
          If you think this is an error, please check the URL or return to the
          dashboard.
        </p>
      </section>
    </main>
  );
}
