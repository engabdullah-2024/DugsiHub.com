"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Checkbox
} from "@/components/ui/checkbox";

// ---------------------------------------------------------------------
// Dugsi Hub — Login (shadcn/ui + Tailwind), matches the provided design
// Left: brand panel with logo + quote.
// Right: form card with heading, inputs (icons), remember me, CTA.
// Instructor note: Eng Abdullah
// ---------------------------------------------------------------------

type LoginResponse = { ok: boolean; error?: string };

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    const remember = fd.get("remember") === "on";

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });
      const json: LoginResponse = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to sign in");
      // success: redirect to dashboard (adjust as needed)
      window.location.href = "/dashboard";
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Left: Brand panel */}
      <section
        className="relative hidden md:block"
        aria-label="Brand panel"
        // subtle grid background to match the reference
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      >
        <div className="absolute left-8 top-8">
          <Link href="/" aria-label="Back to home">
            <div className="relative h-10 w-[150px] sm:h-12 sm:w-[180px]">
              <Image
                src="/dugsihub.png"
                alt="Dugsi Hub"
                fill
                priority
                className="object-contain logo-stroked"
                sizes="180px"
              />
            </div>
          </Link>
        </div>

        <figure className="absolute bottom-10 left-8 max-w-xl pr-8">
          <blockquote className="text-lg leading-relaxed text-muted-foreground">
            “Dugsi Hub has transformed how we deliver education, making it more
            accessible and engaging than ever before.”
          </blockquote>
          <figcaption className="mt-3 text-sm text-muted-foreground">
            Eng Abdullah, Instructor
          </figcaption>
        </figure>
      </section>

      {/* Right: Form */}
      <section className="relative flex min-h-screen items-center justify-center bg-background px-4 py-10">
        <div className="w-full max-w-md">
          {/* back link */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>

          {/* headings */}
          <div className="mb-6 space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to sign in to your account
            </p>
          </div>

          {/* form */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                </span>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="pl-9"
                />
              </div>
            </div>

            {/* password + forgot */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </span>
                <Input
                  id="password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="pl-9 pr-10"
                />
                <button
                  type="button"
                  aria-label={showPw ? "Hide password" : "Show password"}
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* remember me */}
            <div className="flex items-center gap-2">
              <Checkbox id="remember" name="remember" />
              <Label htmlFor="remember" className="text-sm text-muted-foreground">
                Remember me
              </Label>
            </div>

            {/* error */}
            {err && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{err}</AlertDescription>
              </Alert>
            )}

            {/* cta */}
            <Button
              type="submit"
              disabled={loading}
              className="mt-2 w-full gap-2 bg-emerald-600 hover:bg-emerald-600/90"
            >
              {loading ? "Signing in..." : "Sign in"}
              <ArrowRight className="h-4 w-4" />
            </Button>

            {/* bottom links */}
            <div className="mt-6 text-center">
              <p className="text-[10px] font-medium tracking-wider text-muted-foreground">
                NEW TO DUGSI HUB?
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-medium text-emerald-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* dark-mode logo stroke (subtle) */}
        <style jsx global>{`
          :root {
            --logo-stroke: transparent;
          }
          .dark {
            --logo-stroke: rgba(255, 255, 255, 0.9);
          }
          .logo-stroked {
            filter: drop-shadow(0 1px 0 var(--logo-stroke))
              drop-shadow(0 -1px 0 var(--logo-stroke))
              drop-shadow(1px 0 0 var(--logo-stroke))
              drop-shadow(-1px 0 0 var(--logo-stroke));
          }
          .dark .logo-stroked {
            filter: drop-shadow(0 1px 0 var(--logo-stroke))
              drop-shadow(0 -1px 0 var(--logo-stroke))
              drop-shadow(1px 0 0 var(--logo-stroke))
              drop-shadow(-1px 0 0 var(--logo-stroke))
              brightness(1.06) contrast(1.05);
          }
        `}</style>
      </section>
    </main>
  );
}
