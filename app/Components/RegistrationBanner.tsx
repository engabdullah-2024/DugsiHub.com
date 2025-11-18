"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, AlertTriangle, Clock } from "lucide-react";
import Link from "next/link";

type PersistMode = "local" | "session" | "none";

type Props = {
  deadline: string; // e.g. "2025-11-19T23:59:59+03:00"
  ctaHref: string; // CTA link
  storageKey?: string; // dismissal key
  persist?: PersistMode; // "local" | "session" | "none"
};

function msToParts(ms: number) {
  const SEC = 1000;
  const MIN = 60 * SEC;
  const HOUR = 60 * MIN;
  const DAY = 24 * HOUR;

  const d = Math.max(0, Math.floor(ms / DAY));
  const h = Math.max(0, Math.floor((ms % DAY) / HOUR));
  const m = Math.max(0, Math.floor((ms % HOUR) / MIN));
  const s = Math.max(0, Math.floor((ms % MIN) / SEC));
  return { d, h, m, s };
}

// helper outside component → no hook dependency issues
function getStore(persist: PersistMode) {
  if (typeof window === "undefined") return null;

  if (persist === "local") return window.localStorage;
  if (persist === "session") return window.sessionStorage;
  return null;
}

export default function RegistrationBanner({
  deadline,
  ctaHref,
  storageKey = "regBannerDismissed_v1",
  persist = "none", // reappears after refresh by default
}: Props) {
  const [dismissed, setDismissed] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const target = useMemo(() => new Date(deadline).getTime(), [deadline]);
  const raf = useRef<number | null>(null);

  // normalize old flags
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (persist === "none") {
      try {
        window.localStorage.removeItem(storageKey);
        window.sessionStorage.removeItem(storageKey);
      } catch {
        /* ignore */
      }
      setDismissed(false);
      return;
    }

    if (persist === "session") {
      try {
        window.localStorage.removeItem(storageKey);
      } catch {
        /* ignore */
      }
    }

    const store = getStore(persist);
    if (!store) return;

    try {
      setDismissed(store.getItem(storageKey) === "1");
    } catch {
      /* ignore */
    }
  }, [persist, storageKey]);

  // clock tick
  useEffect(() => {
    if (typeof window === "undefined") return;

    const tick = () => setNow(Date.now());

    // smooth updates when motion is allowed
    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      const loop = () => {
        tick();
        raf.current = window.requestAnimationFrame(loop);
      };

      raf.current = window.requestAnimationFrame(loop);

      return () => {
        if (raf.current !== null) {
          window.cancelAnimationFrame(raf.current);
        }
      };
    }

    // fallback: simple interval
    const intervalId = window.setInterval(tick, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const remaining = Math.max(0, target - now);
  const { d, h, m, s } = msToParts(remaining);

  if (dismissed || !Number.isFinite(target) || remaining <= 0) return null;

  const handleClose = () => {
    setDismissed(true);
    const store = getStore(persist);
    if (store) {
      try {
        store.setItem(storageKey, "1");
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <div
      role="region"
      aria-label="Registration Notice"
      className="sticky top-0 z-50 w-full border-b border-emerald-500/10 bg-gradient-to-r from-emerald-950/90 via-slate-950/95 to-emerald-900/90 text-emerald-50 backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.55)]"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="relative overflow-hidden rounded-2xl border border-emerald-400/15 bg-gradient-to-r from-emerald-900/70 via-emerald-900/40 to-slate-900/60 px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-3.5">
          {/* subtle glow stripe */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-emerald-400/15 via-transparent to-transparent blur-2xl" />

          {/* Responsive grid: stack on mobile, 3 cols on md+ */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1.8fr)_auto_auto] md:items-center">
            {/* Left: icon + text */}
            <div className="flex min-w-0 items-start gap-3 sm:items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-400/30 shadow-sm shadow-emerald-900/60">
                <AlertTriangle
                  className="h-4.5 w-4.5 text-amber-300"
                  aria-hidden
                />
              </div>
              <div className="min-w-0 space-y-0.5">
                <div className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-emerald-200 ring-1 ring-emerald-400/30">
                    Limited Time Registration
                  </span>
                </div>
                <p className="truncate text-sm font-semibold leading-tight sm:whitespace-normal sm:text-[15px]">
                  Registration-ka wuxuu xirmayaa dhawaan.
                </p>
                <p className="mt-0.5 line-clamp-2 text-xs text-emerald-100/80 sm:line-clamp-none sm:text-[13px]">
                  Program-ka is diiwaan gelintisa waxay ku egtahay ilaa{" "}
                  <span className="font-semibold text-emerald-50">
                    20-ka bisha November
                  </span>
                  . Hadda iska qor kahor inta uusan xirmi.
                </p>
              </div>
            </div>

            {/* Middle: countdown */}
            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <div
                className="inline-flex items-center gap-2 rounded-full bg-slate-950/60 px-2.5 py-1 text-[11px] font-medium text-emerald-50/95 ring-1 ring-emerald-400/25 shadow-sm"
                aria-live="polite"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/30">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                </span>
                <div className="flex items-baseline gap-1 tabular-nums">
                  <span className="text-xs font-semibold">
                    {d}
                    <span className="ml-0.5 text-[10px] font-normal uppercase tracking-wide text-emerald-200/80">
                      d
                    </span>
                  </span>
                  <span className="text-[11px] text-emerald-300/80">•</span>
                  <span className="text-xs font-semibold">
                    {String(h).padStart(2, "0")}:
                    {String(m).padStart(2, "0")}:
                    {String(s).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Close (desktop / tablet) */}
              <button
                onClick={handleClose}
                type="button"
                aria-label="Dismiss registration notice"
                className="hidden h-8 w-8 items-center justify-center rounded-full text-emerald-100/70 transition-transform transition-colors hover:bg-emerald-500/10 hover:text-emerald-50 active:scale-95 sm:inline-flex"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Right: CTA + mobile close */}
            <div className="flex items-center justify-stretch gap-2 md:justify-end">
              <Link href={ctaHref} className="flex-1 sm:flex-none">
                <Button
                  size="sm"
                  className="h-9 w-full rounded-full bg-emerald-500 px-4 text-xs font-semibold tracking-wide text-emerald-950 shadow-[0_10px_30px_rgba(16,185,129,0.55)] transition-transform transition-shadow hover:translate-y-0.5 hover:bg-emerald-400 hover:shadow-[0_18px_55px_rgba(16,185,129,0.65)] active:translate-y-0.5 sm:h-8 sm:w-auto sm:px-3 sm:text-[13px]"
                >
                  Hadda Is Diiwaan Geli
                </Button>
              </Link>

              {/* Mobile close */}
              <button
                onClick={handleClose}
                type="button"
                aria-label="Dismiss"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-emerald-100/70 transition-transform transition-colors hover:bg-emerald-500/10 hover:text-emerald-50 active:scale-95 sm:hidden"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
