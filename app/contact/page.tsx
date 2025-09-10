"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Mail,
  Phone,
  MessageSquareMore,
  MapPin,
  ArrowRight,
  SendHorizonal,
  Sparkles,
} from "lucide-react";

// ------------------------------------------------------------
// Dugsi Hub — Contact (app/contact/page.tsx)
// Left: form in a soft card. Right: contact methods cards.
// Green accents to match brand.
// ------------------------------------------------------------

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: POST to /api/contact (JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))))
    setSubmitted(true);
  }

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
            <Sparkles className="h-4 w-4" /> Contact
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Send Us a Message
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Fill out the form below and we’ll get back to you as soon as possible.
          </p>
        </div>
      </motion.section>

      {/* Content */}
      <section className="mt-12 grid items-start gap-8 md:mt-16 lg:grid-cols-5">
        {/* Left: Form */}
        <Card className="border-muted/40 lg:col-span-3">
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <p className="text-sm text-muted-foreground">
              Fill out the form below and we’ll get back to you as soon as possible.
            </p>
          </CardHeader>

          <CardContent>
            {submitted ? (
              <Alert className="border-emerald-200/60 bg-emerald-50/50 dark:bg-emerald-950/30">
                <AlertTitle className="font-semibold">Thanks! Your message was sent.</AlertTitle>
                <AlertDescription className="text-sm">
                  We’ll reply within 24–48 hours. Meanwhile, you can{" "}
                  <Link href="/papers" className="underline">browse past papers</Link> or{" "}
                  <Link href="/quizzes" className="underline">try a quiz</Link>.
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" placeholder="+252 XXX XXX XXX" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about">About</Label>
                  <Input id="about" name="about" placeholder="What's this regarding?" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Tell us more about your inquiry…"
                    required
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-full gap-2 bg-emerald-600 hover:bg-emerald-600/90">
                    Send Message <SendHorizonal className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Right: Other ways to connect */}
        <div className="space-y-4 lg:col-span-2">
          <h3 className="text-lg font-semibold">Other Ways to Connect</h3>
          <p className="text-sm text-muted-foreground -mt-1">
            Choose the method that works best for you. We’re here to help!
          </p>

          <Link href="mailto:info@dugsihub.com" className="block">
            <Card className="group border-muted/40 transition-colors hover:border-emerald-200 dark:hover:border-emerald-900">
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-medium">Email Support</div>
                    <div className="text-xs text-muted-foreground">Get a response within 24 hours</div>
                    <div className="text-sm">info@dugsihub.com</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </CardContent>
            </Card>
          </Link>

          <Link href="https://wa.me/252614251112" target="_blank" className="block">
            <Card className="group border-muted/40 transition-colors hover:border-emerald-200 dark:hover:border-emerald-900">
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-medium">WhatsApp Chat</div>
                    <div className="text-xs text-muted-foreground">Quick responses on WhatsApp</div>
                    <div className="text-sm">+252 614 251112</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/virtual-office" className="block">
            <Card className="group border-muted/40 transition-colors hover:border-emerald-200 dark:hover:border-emerald-900">
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-medium">Virtual Office</div>
                    <div className="text-xs text-muted-foreground">Connect with us online</div>
                    <div className="text-sm">Always Available</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </main>
  );
}
