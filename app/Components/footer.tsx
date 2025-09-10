"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
 
  FileText,
  GraduationCap,
  Newspaper,
  Timer,
  Globe2,
  ArrowRight,
  Youtube,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
  ShieldCheck,
  Cookie,
  Scale,
  Sparkles,
} from "lucide-react";

// ------------------------------------------------------------
// Dugsi Hub — Footer (components/footer.tsx)
// 4-column responsive layout with brand, quick links, popular,
// latest posts, and policies. Brand green accents (emerald).
// ------------------------------------------------------------

const quickLinks = [
  { href: "/papers", label: "Past Papers" },
  { href: "/quizzes", label: "Quizzes" },
  { href: "/subjects", label: "Subjects" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

const popular = [
  { href: "/papers/mathematics/2024", label: "Math Past Papers 2024", meta: "12 papers  ·  4 ms" },
  { href: "/quizzes/physics/kinematics", label: "Physics: Kinematics Quiz", meta: "18 mins  ·  15 Qs" },
  { href: "/resources/chemistry-notes", label: "Chemistry Summary Notes", meta: "Unit notes  ·  PDF" },
  { href: "/quizzes/english/comprehension", label: "English: Comprehension Quiz", meta: "15 mins  ·  12 Qs" },
  { href: "/subjects/biology", label: "Biology Subject Hub", meta: "Papers · Quizzes · Notes" },
];

const latest = [
  { href: "/blog/how-to-revise-effectively", label: "Sidee Ugu Diyaargarowdaa Imtixaanka Qaran", date: "Feb 27, 2025" },
  { href: "/blog/how-to-use-past-papers", label: "Sida Ugu Wanaagsan Ee Looga Faa’iideysto Past Papers", date: "Jan 14, 2025" },
  { href: "/blog/time-management", label: "Maaraynta Waqtiga Imtixaanka", date: "Jan 14, 2025" },
  { href: "/blog/study-timetable", label: "Samee Jadwal Waxbarasho oo Wax Ku Ool ah", date: "Jan 14, 2025" },
  { href: "/blog/exam-day-checklist", label: "Waxyaabaha Muhiimka ah Ee Maalinta Imtixaanka", date: "Jan 14, 2025" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand & social */}
          <div className="lg:col-span-3">
            <div className="relative h-32 w-44">
              <Image
                src="/dugsihub.png" // swap for your SVG if available
                alt="Dugsi Hub"
                fill
                className="object-contain"
                priority
                sizes="176px"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Empowering Grade 12 students in Somalia with{" "}
              <span className="font-medium text-foreground">Past Papers</span>,
              {" "}
              <span className="font-medium text-foreground">Quizzes</span>, and{" "}
              <span className="font-medium text-foreground">Resources</span> — dhammaantood Af-Soomaali.
            </p>

            {/* Social icons */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { href: "https://youtube.com", Icon: Youtube, label: "YouTube" },
                { href: "https://t.me/dugsihub", Icon: MessageCircle, label: "Telegram" },
                { href: "https://facebook.com", Icon: Facebook, label: "Facebook" },
                { href: "https://x.com", Icon: Twitter, label: "Twitter/X" },
                { href: "https://instagram.com", Icon: Instagram, label: "Instagram" },
                { href: "https://linkedin.com", Icon: Linkedin, label: "LinkedIn" },
              ].map(({ href, Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-muted/50 hover:bg-muted"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>

            {/* Promo card */}
            <Card className="mt-6 border-emerald-200/50 bg-emerald-50/60 dark:border-emerald-900/40 dark:bg-emerald-950/20">
              <CardContent className="flex items-start gap-3 p-4">
                <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <GraduationCap className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-medium">
                    National Exam Prep Path (Af-Soomaali)
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Jadwal diyaarsan: Past Papers → Quizzes → Notes. Ku tababar si caqli badan.
                  </p>
                  <Link
                    href="/study"
                    className="mt-2 inline-flex items-center gap-1 text-sm text-emerald-700 hover:underline dark:text-emerald-400"
                  >
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold tracking-wide text-foreground">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted-foreground hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="mt-8 text-sm font-semibold tracking-wide text-foreground">Resources</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <ShieldCheck className="h-4 w-4" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <Scale className="h-4 w-4" /> Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <Cookie className="h-4 w-4" /> Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <FileText className="h-4 w-4" /> Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold tracking-wide text-foreground">Popular</h4>
            <ul className="mt-4 space-y-3">
              {popular.map((p) => (
                <li key={p.href} className="group">
                  <Link href={p.href} className="block">
                    <div className="truncate text-sm text-foreground group-hover:underline">{p.label}</div>
                    <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                      <Timer className="h-3.5 w-3.5" />
                      <span>{p.meta}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/courses"
              className="mt-3 inline-flex items-center gap-2 text-sm text-emerald-700 hover:underline dark:text-emerald-400"
            >
              <Globe2 className="h-4 w-4" /> View All Resources
            </Link>
          </div>

          {/* Latest Articles */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold tracking-wide text-foreground">Latest Articles</h4>
            <ul className="mt-4 space-y-3">
              {latest.map((a) => (
                <li key={a.href} className="group">
                  <Link href={a.href} className="block">
                    <div className="truncate text-sm text-foreground group-hover:underline">{a.label}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{a.date}</div>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/blog"
              className="mt-3 inline-flex items-center gap-2 text-sm text-emerald-700 hover:underline dark:text-emerald-400"
            >
              <Newspaper className="h-4 w-4" /> Read More Articles
            </Link>
          </div>
        </div>

        <Separator className="my-10" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Dugsi Hub. All rights reserved.</div>
          <div className="inline-flex items-center gap-1">
            Proudly engineered with <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> in Somalia
          </div>
        </div>
      </div>
    </footer>
  );
}
