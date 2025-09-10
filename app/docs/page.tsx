"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, FileText, Search, Sparkles, Terminal, BookOpenText, LinkIcon, ShieldCheck, Users } from "lucide-react";

// ------------------------------------------------------------
// SomDevz — Documentation (app/docs/page.tsx)
// Expert docs page: sticky sidebar nav + searchable sections + MDX‑like content blocks.
// ------------------------------------------------------------

type Section = {
  id: string;
  title: string;
  body: string;
};

const SECTIONS: Section[] = [
  {
    id: "getting-started",
    title: "Getting started",
    body:
      "Install dependencies, run the dev server, and open your first issue. This guide covers repo setup, conventions, and tools we use.",
  },
  {
    id: "contributing",
    title: "Contributing guide",
    body:
      "How to pick issues, branch naming, writing good commit messages, and opening a PR that’s easy to review.",
  },
  {
    id: "community",
    title: "Community & etiquette",
    body:
      "Where to ask questions, how to join review clubs, and our expectations in chat and discussions.",
  },
  {
    id: "security",
    title: "Security & reporting",
    body:
      "Responsible disclosure process, private reporting channels, and hardening tips for maintainers.",
  },
  {
    id: "faq",
    title: "FAQ",
    body:
      "Answers to the most common questions about setup, stack choices, and contribution pathways.",
  },
];

export default function DocsPage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    if (!query) return SECTIONS;
    const q = query.toLowerCase();
    return SECTIONS.filter((s) =>
      [s.title, s.body, s.id].some((x) => x.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <main className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
      {/* Header */}
      <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4 inline-flex items-center gap-1">
            <Sparkles className="h-4 w-4" /> Documentation
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">SomDevz Documentation</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Learn how to set up your dev environment, contribute effectively, and collaborate with the community.
          </p>
        </div>
      </motion.section>

      <section className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12">
        {/* Sidebar nav */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24 rounded-xl border bg-card/50 p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search docs…"
                className="pl-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search documentation"
              />
            </div>
            <Separator className="my-3" />
            <nav className="flex flex-col gap-1">
              {SECTIONS.map((s) => (
                <Link
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {s.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-9">
          {/* Getting started */}
          <Card id="getting-started" className="scroll-mt-24 border-muted/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><BookOpenText className="h-4 w-4" /> Getting started</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>Clone the repo, install dependencies, and spin up the dev server. Use Node 20+ and pnpm.</p>
              <div className="rounded-xl border bg-muted/40 p-4">
                <pre className="overflow-x-auto text-xs leading-6">{`$ git clone https://github.com/somdevz/hub\n$ cd hub\n$ pnpm i\n$ pnpm dev`}</pre>
              </div>
              <p>
                Follow our <Link href="/code-of-conduct" className="underline">Code of Conduct</Link>. If you hit issues, open a discussion or ask in chat.
              </p>
            </CardContent>
          </Card>

          {/* Contributing */}
          <Card id="contributing" className="mt-8 scroll-mt-24 border-muted/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><FileText className="h-4 w-4" /> Contributing guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <Tabs defaultValue="workflow" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="workflow">Workflow</TabsTrigger>
                  <TabsTrigger value="commits">Commits</TabsTrigger>
                  <TabsTrigger value="prs">PRs</TabsTrigger>
                </TabsList>
                <TabsContent value="workflow" className="space-y-3">
                  <p>Pick a <span className="font-medium text-foreground">good‑first‑issue</span>, create a branch, push, and open a PR.</p>
                  <div className="rounded-xl border bg-muted/40 p-4">
                    <pre className="overflow-x-auto text-xs leading-6">{`# create branch\n$ git checkout -b feat/your-change\n\n# push\n$ git push -u origin HEAD`}</pre>
                  </div>
                </TabsContent>
                <TabsContent value="commits" className="space-y-3">
                  <p>Use <span className="font-medium text-foreground">conventional commits</span> to keep history clean.</p>
                  <div className="rounded-xl border bg-muted/40 p-4">
                    <pre className="overflow-x-auto text-xs leading-6">{`feat: add SomUI Avatar component\nfix: handle null session in auth middleware\ndocs: improve contributing guide`}</pre>
                  </div>
                </TabsContent>
                <TabsContent value="prs" className="space-y-3">
                  <p>Keep PRs focused (≤ 300 lines), add context, screenshots, and check CI.</p>
                  <ul className="list-disc pl-5">
                    <li>Link related issues</li>
                    <li>Explain trade‑offs</li>
                    <li>Ask for specific feedback</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Community */}
          <Card id="community" className="mt-8 scroll-mt-24 border-muted/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><Users className="h-4 w-4" /> Community & etiquette</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>Say salaam, introduce yourself, and help others. Disagree with ideas, not people. Be generous with context and examples.</p>
              <Accordion type="single" collapsible>
                <AccordionItem value="a1">
                  <AccordionTrigger>Where do we chat?</AccordionTrigger>
                  <AccordionContent>
                    Join our community chat (see the <Link href="/community" className="underline">Community page</Link>) and follow the <Link href="/code-of-conduct" className="underline">Code of Conduct</Link>.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="a2">
                  <AccordionTrigger>How do review clubs work?</AccordionTrigger>
                  <AccordionContent>
                    Weekly sessions on Zoom/Meet where mentors walk through PRs, architecture, and testing techniques.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Security */}
          <Card id="security" className="mt-8 scroll-mt-24 border-muted/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><ShieldCheck className="h-4 w-4" /> Security & reporting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>Report vulnerabilities privately. Do not open a public issue for security findings.</p>
              <div className="rounded-xl border bg-muted/40 p-4">
                <pre className="overflow-x-auto text-xs leading-6">{`Email: security@somdevz.org\nPGP: (paste your key fingerprint here)`}</pre>
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card id="faq" className="mt-8 scroll-mt-24 border-muted/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><LinkIcon className="h-4 w-4" /> FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="f1">
                  <AccordionTrigger>Which stack does SomDevz prefer?</AccordionTrigger>
                  <AccordionContent>
                    Many projects use Next.js, TypeScript, Tailwind, and shadcn/ui—but all stacks are welcome.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="f2">
                  <AccordionTrigger>Do I need prior experience?</AccordionTrigger>
                  <AccordionContent>
                    No. We label issues for beginners and pair you with mentors.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="f3">
                  <AccordionTrigger>How do I get recognition?</AccordionTrigger>
                  <AccordionContent>
                    We feature contributors on the homepage and weekly highlights. Ship small, consistent improvements.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Separator className="my-12" />

          {/* CTA */}
          <section className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">Ready to contribute?</h3>
            <p className="mt-2 text-muted-foreground">Start with a good‑first‑issue and say hi in chat.</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="https://github.com/somdevz" target="_blank">Browse issues</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/join">Join the community</Link>
              </Button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}