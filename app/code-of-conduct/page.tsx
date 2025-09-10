"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, ShieldCheck, Sparkles, XCircle, AlertTriangle, Mail, Scale, Handshake, Users } from "lucide-react";

// ------------------------------------------------------------
// SomDevz — Code of Conduct (app/code-of-conduct/page.tsx)
// Expert, clear, shadcn-inspired. Anchored sections, guidelines, reporting.
// ------------------------------------------------------------

export default function CodeOfConductPage() {
  return (
    <main className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      {/* Header */}
      <section>
        <Badge variant="secondary" className="mb-4 inline-flex items-center gap-1">
          <Sparkles className="h-4 w-4" /> Community
        </Badge>
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">SomDevz Code of Conduct</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We’re building an inclusive, kind, and professional community. This Code of Conduct sets expectations for all spaces where SomDevz activities occur.
        </p>
        <div className="mt-4 text-xs text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</div>
      </section>

      <Separator className="my-8" />

      {/* Quick summary */}
      <Alert>
        <AlertTitle className="flex items-center gap-2 text-base font-semibold"><ShieldCheck className="h-4 w-4" /> TL;DR</AlertTitle>
        <AlertDescription className="mt-2 text-sm">
          Be kind. Assume good intent. No harassment or discrimination. Respect boundaries. Use inclusive language. Follow maintainers’ directions. If something feels off, report it.
        </AlertDescription>
      </Alert>

      {/* Table of contents */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Contents</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {[
            { href: "#our-pledge", label: "1. Our Pledge" },
            { href: "#our-standards", label: "2. Our Standards" },
            { href: "#responsibilities", label: "3. Enforcement Responsibilities" },
            { href: "#scope", label: "4. Scope" },
            { href: "#enforcement", label: "5. Enforcement" },
            { href: "#reporting", label: "6. Reporting Guidelines" },
            { href: "#guidelines", label: "7. Enforcement Guidelines" },
            { href: "#attribution", label: "8. Attribution" },
          ].map((i) => (
            <li key={i.href}>
              <Link href={i.href} className="hover:text-foreground">{i.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 1. Our Pledge */}
      <section id="our-pledge" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">1. Our Pledge</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          We pledge to make participation in our community a harassment‑free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.
        </p>
      </section>

      {/* 2. Standards */}
      <section id="our-standards" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">2. Our Standards</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Card className="border-muted/40">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <div className="rounded-xl border bg-muted/40 p-2"><Users className="h-5 w-5" /></div>
              <CardTitle className="text-base">Positive behavior includes</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-muted-foreground">
              <ul className="space-y-3">
                {[
                  "Using welcoming and inclusive language",
                  "Being respectful of differing viewpoints and experiences",
                  "Giving and gracefully accepting constructive feedback",
                  "Focusing on what is best for the community",
                  "Showing empathy towards other community members",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" /> <span>{t}</span></li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-muted/40">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <div className="rounded-xl border bg-muted/40 p-2"><XCircle className="h-5 w-5" /></div>
              <CardTitle className="text-base">Unacceptable behavior includes</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-muted-foreground">
              <ul className="space-y-3">
                {[
                  "Harassment, abuse, or exclusionary jokes",
                  "Trolling, insulting/derogatory comments, and personal or political attacks",
                  "Public or private harassment, doxxing, or publishing others’ private information",
                  "Sexualized language or imagery and unwelcome sexual attention",
                  "Sustained disruption of talks, discussions, or online spaces",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 text-destructive" /> <span>{t}</span></li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. Responsibilities */}
      <section id="responsibilities" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">3. Enforcement Responsibilities</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Community leaders (maintainers, moderators, event organizers) are responsible for clarifying standards and taking appropriate and fair corrective action in response to any behavior they deem inappropriate, threatening, offensive, or harmful.
        </p>
      </section>

      {/* 4. Scope */}
      <section id="scope" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">4. Scope</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          This Code applies within all community spaces—online and offline—and also applies when an individual is officially representing the community in public spaces.
        </p>
      </section>

      {/* 5. Enforcement */}
      <section id="enforcement" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">5. Enforcement</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the community leaders responsible for enforcement.
        </p>
        <Card className="mt-4 border-muted/40">
          <CardContent className="p-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <div className="font-medium text-foreground">Report via email</div>
                <div>Send details to <Link href="mailto:conduct@somdevz.org" className="underline">conduct@somdevz.org</Link>. We will acknowledge receipt within 72 hours.</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 6. Reporting Guidelines */}
      <section id="reporting" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">6. Reporting Guidelines</h2>
        <Accordion type="single" collapsible className="mt-4 w-full">
          <AccordionItem value="r1">
            <AccordionTrigger>What to include in a report</AccordionTrigger>
            <AccordionContent>
              Please share: (1) your contact info, (2) names of the people involved, (3) when and where it happened, (4) what happened (with links/screenshots if possible), and (5) any context you think is relevant.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="r2">
            <AccordionTrigger>Confidentiality</AccordionTrigger>
            <AccordionContent>
              We will respect reporter privacy. We may need to share minimal details with specific leaders to investigate and act.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="r3">
            <AccordionTrigger>Appeals</AccordionTrigger>
            <AccordionContent>
              If you disagree with an action or decision, contact <Link href="mailto:conduct@somdevz.org" className="underline">conduct@somdevz.org</Link> with context. A different set of leaders will review.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* 7. Enforcement Guidelines */}
      <section id="guidelines" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">7. Enforcement Guidelines</h2>
        <div className="mt-6 space-y-6">
          {[
            {
              title: "Correction",
              impact: "Use when impact is minor and unintentional.",
              example: "A one‑off inappropriate word; a misunderstanding.",
              consequence: "A private, written or verbal warning with clarity on expectations.",
            },
            {
              title: "Warning",
              impact: "Use when behavior has ongoing impact or after a pattern of minor incidents.",
              example: "Repeatedly interrupting reviews; dismissive tone after feedback.",
              consequence: "A formal warning. Continued behavior may result in temporary restrictions.",
            },
            {
              title: "Temporary Ban",
              impact: "Use for severe or repeated violations.",
              example: "Harassment; use of slurs; posting private information.",
              consequence: "Restricted participation from community spaces for a set period.",
            },
            {
              title: "Permanent Ban",
              impact: "Use for an ongoing pattern of harassment or a severe single incident.",
              example: "Threats of violence; persistent sexual harassment; coordinated abuse.",
              consequence: "Permanent removal from community spaces and projects.",
            },
          ].map((g, idx) => (
            <Card key={g.title} className="border-muted/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Scale className="h-4 w-4" /> {idx + 1}. {g.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm text-muted-foreground md:grid-cols-3">
                <div>
                  <div className="text-foreground font-medium">Community Impact</div>
                  <div>{g.impact}</div>
                </div>
                <div>
                  <div className="text-foreground font-medium">Example</div>
                  <div>{g.example}</div>
                </div>
                <div>
                  <div className="text-foreground font-medium">Consequence</div>
                  <div>{g.consequence}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 8. Attribution */}
      <section id="attribution" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">8. Attribution</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          This Code of Conduct is adapted from well‑known open‑source community practices and community guidelines. You are welcome to reuse and modify this page for your projects.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="#top">Back to top</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/join">Agree & join</Link>
          </Button>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Footer note */}
      <p className="text-center text-xs text-muted-foreground">
        Questions? Contact <Link href="mailto:conduct@somdevz.org" className="underline">conduct@somdevz.org</Link>.
      </p>
    </main>
  );
}