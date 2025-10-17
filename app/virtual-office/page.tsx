// app/virtual-office/page.tsx
import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Video,
  Calendar,
  MessageSquare,
  BookOpen,
  Headphones,
  Clock3,
  ArrowRight,
} from "lucide-react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Optional: configure one or both in your Vercel env for “Join Room” buttons
const MEET_URL = process.env.NEXT_PUBLIC_MEET_URL ?? "";
const ZOOM_URL = process.env.NEXT_PUBLIC_ZOOM_URL ?? "";

// Simple office-hours data (adjust as needed or wire to DB later)
const HOURS: { day: string; time: string; note?: string }[] = [
  { day: "Monday", time: "4:00 PM – 6:00 PM", note: "Virtual only" },
  { day: "Wednesday", time: "4:00 PM – 6:00 PM", note: "Virtual only" },
  { day: "Saturday", time: "10:00 AM – 12:00 PM", note: "Virtual + In-person" },
];

export default async function VirtualOfficePage() {
  const user = await currentUser(); // undefined when logged out
  const firstName = user?.firstName ?? null;

  const hasAnyRoom = Boolean(MEET_URL || ZOOM_URL);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero / Heading */}
      <section className="border-b bg-grid">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="rounded-2xl border bg-gradient-to-br from-emerald-50 via-background to-background p-5 dark:from-emerald-950/20">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <Badge variant="secondary" className="mb-2">
                  Virtual Office
                </Badge>
                <h1 className="text-2xl font-semibold tracking-tight">
                  {firstName ? `Welcome, ${firstName} 👋` : "Welcome 👋"}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Join the live room, book time, or drop us a message — all in one place.
                </p>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="gap-2">
                  <Link href="/papers">
                    <BookOpen className="h-4 w-4" />
                    Browse Papers
                  </Link>
                </Button>
                {user ? (
                  <Button asChild className="gap-2 bg-emerald-600 hover:bg-emerald-600/90">
                    <Link href="/dashboard">
                      Go to Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild className="gap-2 bg-emerald-600 hover:bg-emerald-600/90">
                    <Link href="/login">
                      Sign In
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Live Room */}
          <Card className="border-muted/40 lg:col-span-2">
            <CardHeader className="flex items-center justify-between gap-2 sm:flex-row">
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5 text-emerald-600" />
                <CardTitle>Live Room</CardTitle>
              </div>
              <Badge variant={hasAnyRoom ? "default" : "secondary"}>
                {hasAnyRoom ? "Online" : "Not configured"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                When office hours are active, you can join the live session using one of the links
                below.
              </p>

              <div className="flex flex-wrap gap-2">
                <Button
                  asChild
                  disabled={!MEET_URL}
                  variant={MEET_URL ? "secondary" : "outline"}
                  className="gap-2"
                >
                  <a href={MEET_URL || "#"} target={MEET_URL ? "_blank" : undefined} rel="noopener noreferrer">
                    Google Meet
                  </a>
                </Button>

                <Button
                  asChild
                  disabled={!ZOOM_URL}
                  variant={ZOOM_URL ? "secondary" : "outline"}
                  className="gap-2"
                >
                  <a href={ZOOM_URL || "#"} target={ZOOM_URL ? "_blank" : undefined} rel="noopener noreferrer">
                    Zoom
                  </a>
                </Button>

                {!hasAnyRoom && (
                  <span className="text-xs text-muted-foreground">
                    (Ask admin to set <code className="font-mono">NEXT_PUBLIC_MEET_URL</code> or{" "}
                    <code className="font-mono">NEXT_PUBLIC_ZOOM_URL</code>.)
                  </span>
                )}
              </div>

              <div className="rounded-lg border bg-muted/20 p-3 text-xs text-muted-foreground">
                Tip: Join a few minutes early to test your mic and camera. Use headphones for the best
                experience.
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-muted/40">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full gap-2 bg-emerald-600 hover:bg-emerald-600/90">
                <Link href="/contact">
                  <MessageSquare className="h-4 w-4" />
                  Send a Message
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full gap-2">
                <Link href="/papers">
                  <BookOpen className="h-4 w-4" />
                  View Past Papers
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full gap-2">
                <Link href="/about">
                  <Headphones className="h-4 w-4" />
                  Help & Support
                </Link>
              </Button>
              <div className="pt-2 text-xs text-muted-foreground">
                You can wire these to live features (DMs, tickets, bookings) anytime.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Office Hours + How it works */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="border-muted/40 lg:col-span-2">
            <CardHeader className="flex items-center gap-2 sm:flex-row">
              <Calendar className="h-5 w-5 text-emerald-600" />
              <CardTitle>Office Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {HOURS.map((h) => (
                  <li key={`${h.day}-${h.time}`} className="flex items-center justify-between gap-3 py-3">
                    <div className="flex items-center gap-3">
                      <Clock3 className="h-4 w-4 text-muted-foreground" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{h.day}</p>
                        <p className="text-xs text-muted-foreground">{h.time}</p>
                      </div>
                    </div>
                    {h.note ? <Badge variant="secondary">{h.note}</Badge> : null}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-muted/40">
            <CardHeader>
              <CardTitle>How it works</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>1) Check the office hours above.</p>
              <p>2) Join via Google Meet or Zoom during those times.</p>
              <p>3) Need help outside hours? Send a message — we’ll reply ASAP.</p>
              <div className="rounded-lg border bg-muted/20 p-3 text-xs">
                Admins can customize links, hours, and actions without changing the layout.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
