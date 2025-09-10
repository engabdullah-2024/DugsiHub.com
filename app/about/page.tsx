"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sparkles,
  School,
  BookOpen,
  FileText,
  CheckCircle2,
  Users2,
  Globe2,
  HeartHandshake,
  BarChart3,
  ShieldCheck,
  Target,
  CalendarDays,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl text-center"
      >
        <Badge variant="secondary" className="mb-4 inline-flex items-center gap-1">
          <Sparkles className="h-4 w-4" /> About Dugsi Hub
        </Badge>
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Helping Grade 12 students ace the Somali National Exams
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Dugsi Hub centralizes <span className="font-medium text-foreground">Past Papers</span>,{" "}
          <span className="font-medium text-foreground">Auto-graded Quizzes</span>, and{" "}
          <span className="font-medium text-foreground">Study Resources</span>—in Af-Soomaali when possible—
          so learners can revise smarter, together.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild className="bg-emerald-600 hover:bg-emerald-600/90">
            <Link href="/get-started">Get Started</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/community">Join Community</Link>
          </Button>
        </div>
      </motion.section>

      {/* Stats strip */}
      <section className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Learners", value: "5,000+", Icon: Users2 },
          { label: "Past Papers", value: "400+", Icon: FileText },
          { label: "Quizzes", value: "250+", Icon: BookOpen },
          { label: "Subjects", value: "8", Icon: School },
        ].map(({ label, value, Icon }) => (
          <div key={label} className="rounded-xl border bg-card/50 p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-foreground">
              <Icon className="h-4 w-4" />
              <span className="text-sm">{label}</span>
            </div>
            <div className="mt-1 text-2xl font-semibold">{value}</div>
          </div>
        ))}
      </section>

      {/* Mission & What we do */}
      <section className="mt-12 grid gap-6 lg:grid-cols-12 md:mt-16">
        <Card className="lg:col-span-5 border-muted/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-4 w-4" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              We believe top-tier exam prep should be accessible to every Somali learner. Our goal is to
              provide reliable materials, clear explanations, and a supportive community that elevates
              outcomes across the country.
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Local language first — Af-Soomaali when possible</li>
              <li>Quality over quantity — curated, verified content</li>
              <li>Learn together — community help and peer review</li>
            </ul>
          </CardContent>
        </Card>

        <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Past Papers (PDF)",
              desc: "Year-by-year papers with clean layouts to practice exam conditions.",
              Icon: FileText,
              href: "/papers",
            },
            {
              title: "Auto-graded Quizzes",
              desc: "Timed questions, instant feedback, and solution hints in Somali.",
              Icon: BookOpen,
              href: "/quizzes",
            },
            {
              title: "Subject Hubs",
              desc: "One place per subject: papers, quizzes, notes, and progress.",
              Icon: School,
              href: "/subjects",
            },
            {
              title: "Guides & Notes",
              desc: "Concise summaries, formula sheets, and study planners.",
              Icon: CheckCircle2,
              href: "/resources",
            },
          ].map(({ title, desc, Icon, href }) => (
            <Card key={title} className="border-muted/40">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border bg-muted/40">
                    <Icon className="h-4 w-4" />
                  </span>
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>{desc}</p>
                <Button asChild variant="link" className="px-0">
                  <Link href={href}>Explore</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mt-12 md:mt-16">
        <h3 className="text-xl font-semibold">Our Journey</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Idea",
              text: "Started as a shared folder of papers and notes for friends.",
              meta: "2023",
            },
            {
              title: "Beta",
              text: "Launched the first site with search and downloadable PDFs.",
              meta: "2024",
            },
            {
              title: "Community",
              text: "Added quizzes, discussion threads, and study events.",
              meta: "2025",
            },
            {
              title: "Today",
              text: "Growing content and partnerships across schools in Somalia.",
              meta: "Now",
            },
          ].map((t) => (
            <Card key={t.title} className="border-muted/40">
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">{t.meta}</div>
                <div className="mt-1 text-sm font-medium">{t.title}</div>
                <p className="mt-1 text-xs text-muted-foreground">{t.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Principles strip */}
      <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Accessible", text: "Mobile-first, low-bandwidth, and free core content.", Icon: Globe2 },
          { title: "Trusted", text: "Reviewed materials with clear sources.", Icon: ShieldCheck },
          { title: "Community-led", text: "Learners and mentors improve content together.", Icon: HeartHandshake },
          { title: "Impact", text: "We measure outcomes and keep improving.", Icon: BarChart3 },
        ].map(({ title, text, Icon }) => (
          <Card key={title} className="border-muted/40">
            <CardContent className="flex items-start gap-3 p-4">
              <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-md border bg-muted/40">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-medium">{title}</div>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Team preview (optional avatars if you have them) */}
      <section className="mt-12 md:mt-16">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">The Team</h3>
          <Button asChild variant="outline" size="sm">
            <Link href="/community">Meet the community</Link>
          </Button>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-muted/40">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border bg-muted/50">
                  <Image src={`/avatars/${i}.png`} alt="" fill className="object-cover" />
                </div>
                <div>
                  <div className="text-sm font-medium">Member {i}</div>
                  <div className="text-xs text-muted-foreground">Contributor • Volunteer</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-3xl md:mt-16">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="q1">
            <AccordionTrigger>Is Dugsi Hub free?</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Core resources (many past papers, selected quizzes, and notes) are free. We may add premium
              features later to sustain the platform—student discounts guaranteed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>Are papers verified?</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Yes. We organize from official or reputable sources and continuously review with teachers
              and contributors. See each paper’s source note.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>How do I contribute resources?</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Join the community and submit via <Link href="/resources/new" className="underline">Resources → New</Link>{" "}
              or share in discussions. Editors review for accuracy and clarity.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q4">
            <AccordionTrigger>Do you run live study events?</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Yes—weekly online sessions and periodic workshops. Check{" "}
              <Link href="/events" className="underline">Events</Link> for the schedule.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <Separator className="my-12" />

      {/* Callouts */}
      <section className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
        <Card className="border-muted/40">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div className="max-w-[70%]">
              <div className="text-sm font-semibold">Start revising now</div>
              <p className="text-sm text-muted-foreground">
                Jump into papers and quizzes aligned to the syllabus.
              </p>
            </div>
            <Button asChild>
              <Link href="/papers">Browse Papers</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-muted/40">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div className="max-w-[70%]">
              <div className="text-sm font-semibold">Join a study event</div>
              <p className="text-sm text-muted-foreground">
                Weekly sessions with mentors and peers—Af-Soomaali.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/events">
                <CalendarDays className="mr-2 h-4 w-4" /> See Events
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
