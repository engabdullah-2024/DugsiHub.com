"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type RegisterResponse = { ok?: boolean; error?: string };

const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
    email: z.string().email("Invalid email"),
    phone: z.string().optional(),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[a-z]/, "Lowercase required")
      .regex(/[A-Z]/, "Uppercase required")
      .regex(/[0-9]/, "Number required")
      .regex(/[^A-Za-z0-9]/, "Special character required"),
    confirm: z.string(),
    accept: z.literal(true, {
      errorMap: () => ({ message: "Please accept the Terms and Conditions" }),
    }),
  })
  .refine((v) => v.password === v.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

// Safe JSON reader so HTML error/redirect pages don't crash the client
async function readJsonSafe(res: Response): Promise<RegisterResponse> {
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    return (await res.json()) as RegisterResponse;
  }
  const text = await res.text();
  return { ok: false, error: text?.slice(0, 200) || "Unexpected response" };
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // local state to drive strength checklist
  const [pw, setPw] = useState("");
  const checks = useMemo(
    () => ({
      len: pw.length >= 8,
      up: /[A-Z]/.test(pw),
      low: /[a-z]/.test(pw),
      num: /[0-9]/.test(pw),
      sp: /[^A-Za-z0-9]/.test(pw),
    }),
    [pw]
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    const fd = new FormData(e.currentTarget);
    const data = {
      firstName: String(fd.get("firstName") || ""),
      lastName: String(fd.get("lastName") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      password: String(fd.get("password") || ""),
      confirm: String(fd.get("confirm") || ""),
      accept: fd.get("accept") === "on",
    };

    // client-side validation (matches server)
    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
      const first = parsed.error.issues[0]?.message ?? "Invalid form data";
      setErr(first);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        // NOTE: backend enforces single super-admin; username optional by design
        body: JSON.stringify({
          firstName: parsed.data.firstName,
          lastName: parsed.data.lastName,
          email: parsed.data.email,
          phone: parsed.data.phone || undefined,
          password: parsed.data.password,
        }),
        // include is not required for register, but safe for same-origin
        credentials: "same-origin",
      });

      const json = await readJsonSafe(res);

      if (!res.ok || !json.ok) {
        // Show a friendly message for the "only one admin" rule
        if (res.status === 409) {
          throw new Error(
            json.error ||
              "Registration is locked: a super admin already exists."
          );
        }
        throw new Error(json.error || "Failed to create account");
      }

      // success → go to login
      router.push("/login");
    } catch (e) {
      setErr(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }

  const bar = (ok: boolean, label: string) => (
    <div className="flex items-center gap-2" key={label}>
      <div className={`h-1.5 w-16 rounded ${ok ? "bg-emerald-600" : "bg-muted"}`} />
      <span className={`text-[11px] ${ok ? "text-emerald-600" : "text-muted-foreground"}`}>
        {label}
      </span>
    </div>
  );

  return (
    <main className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Left: Brand panel with grid bg and quote */}
      <section
        className="relative hidden md:block"
        aria-label="Brand panel"
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

      {/* Right: Form column */}
      <section className="relative flex min-h-screen items-center justify-center bg-background px-4 py-10">
        <div className="w-full max-w-md">
          {/* Back link */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>

          {/* Headings */}
          <div className="mb-6 space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            {/* Names */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <User className="h-4 w-4" />
                  </span>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="Kadija"
                    autoComplete="given-name"
                    disabled={loading}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <User className="h-4 w-4" />
                  </span>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Mohamed"
                    autoComplete="family-name"
                    disabled={loading}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
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
                  autoComplete="email"
                  disabled={loading}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                </span>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+252 61-*******"
                  autoComplete="tel"
                  disabled={loading}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
                  autoComplete="new-password"
                  disabled={loading}
                  className="pl-9 pr-10"
                  onChange={(e) => setPw(e.currentTarget.value)}
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

              {/* Strength checklist */}
              <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2 text-[11px]">
                {bar(checks.len, "8+ characters")}
                {bar(checks.up, "Uppercase")}
                {bar(checks.low, "Lowercase")}
                {bar(checks.num, "Number")}
                {bar(checks.sp, "Special character")}
              </div>
            </div>

            {/* Confirm */}
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm password</Label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </span>
                <Input
                  id="confirm"
                  name="confirm"
                  type={showPw2 ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  autoComplete="new-password"
                  disabled={loading}
                  className="pl-9 pr-10"
                />
                <button
                  type="button"
                  aria-label={showPw2 ? "Hide password" : "Show password"}
                  onClick={() => setShowPw2((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
                >
                  {showPw2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <Checkbox id="accept" name="accept" disabled={loading} />
              <Label htmlFor="accept" className="text-sm text-muted-foreground">
                I accept the <Link href="/terms" className="underline">Terms and Conditions</Link>.
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="underline">terms</Link> and{" "}
                <Link href="/privacy" className="underline">privacy policy</Link>.
              </Label>
            </div>

            {/* Error */}
            {err && (
              <Alert variant="destructive" role="status">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription aria-live="polite">{err}</AlertDescription>
              </Alert>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="mt-1 w-full gap-2 bg-emerald-600 hover:bg-emerald-600/90"
            >
              {loading ? "Creating..." : "Create account"} <ArrowRight className="h-4 w-4" />
            </Button>

            {/* Bottom links */}
            <div className="mt-6 text-center">
              <p className="text-[10px] font-medium tracking-wider text-muted-foreground">
                OR CONTINUE WITH
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-emerald-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* dark-mode logo stroke (same as login) */}
        <style jsx global>{`
          :root { --logo-stroke: transparent; }
          .dark { --logo-stroke: rgba(255, 255, 255, 0.9); }
          .logo-stroked {
            filter:
              drop-shadow(0 1px 0 var(--logo-stroke))
              drop-shadow(0 -1px 0 var(--logo-stroke))
              drop-shadow(1px 0 0 var(--logo-stroke))
              drop-shadow(-1px 0 0 var(--logo-stroke));
          }
          .dark .logo-stroked {
            filter:
              drop-shadow(0 1px 0 var(--logo-stroke))
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
