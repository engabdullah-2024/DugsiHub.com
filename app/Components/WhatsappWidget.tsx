'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Props = {
  phone?: string;            // E.164 without + (e.g. "252613169435")
  brand?: string;            // "Dugsi Hub"
  defaultOpen?: boolean;     // widget bubble closed by default
  prefill?: string;          // prefilled first message
  storageKey?: string;       // persistence for open/closed
  position?: 'br' | 'bl';    // bottom-right | bottom-left
};

export default function WhatsappWidget({
  phone = '252613169435',
  brand = 'Dugsi Hub',
  defaultOpen = false,
  prefill = 'Salaam! Waxaan rabaa inaan ka faa’iidaysto Dugsi Hub si aan ugu diyaargaroobo Imtixaanka Qaranka.',
  storageKey = 'whats_widget_open_v1',
  position = 'br',
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  // restore last state (optional)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === '1') setOpen(true);
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, open ? '1' : '0');
    } catch {}
  }, [open, storageKey]);

  const href = useMemo(
    () =>
      `https://wa.me/${phone}?text=${encodeURIComponent(prefill)}`,
    [phone, prefill]
  );

  const sideClass =
    position === 'bl'
      ? 'left-4 sm:left-6'
      : 'right-4 sm:right-6';

  return (
    <>
      {/* Floating bubble */}
      <button
        aria-label="Open WhatsApp chat"
        onClick={() => setOpen(v => !v)}
        className={`fixed ${sideClass} bottom-4 sm:bottom-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl ring-1 ring-black/5 transition hover:scale-[1.03] active:scale-95`}
      >
        {/* Ripple/ping */}
        <span className="pointer-events-none absolute -top-1 -right-1 inline-flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60"></span>
          <span className="relative inline-flex h-4 w-4 rounded-full bg-white/90"></span>
        </span>

        {/* WhatsApp SVG */}
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden>
          <path d="M19.11 17.38c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.95-.94 1.15-.17.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.47.13-.62.13-.12.3-.31.45-.46.15-.15.2-.26.3-.43.1-.17.05-.32-.02-.46-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.46.07-.7.35-.24.27-.91.89-.91 2.18 0 1.29.93 2.54 1.06 2.71.13.17 1.83 2.8 4.44 3.92.62.27 1.1.43 1.47.55.62.2 1.19.17 1.64.1.5-.07 1.54-.63 1.76-1.25.22-.62.22-1.16.15-1.27-.07-.11-.25-.18-.55-.33zM16.03 4C9.92 4 5 8.92 5 15.03c0 1.94.52 3.77 1.43 5.35L5 28l7.76-1.96c1.53.84 3.28 1.3 5.14 1.3 6.11 0 11.03-4.92 11.03-11.03C28.93 8.92 24.11 4 16.03 4zm0 19.76c-1.63 0-3.15-.48-4.43-1.31l-.32-.2-4.61 1.17 1.22-4.49-.21-.34a9.63 9.63 0 0 1-1.45-5.06c0-5.32 4.33-9.65 9.65-9.65s9.65 4.33 9.65 9.65-4.33 9.65-9.65 9.65z"/>
        </svg>
      </button>

      {/* Popover card */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className={`fixed ${sideClass} bottom-24 sm:bottom-[6.5rem] z-40 w-[310px] sm:w-[340px]`}
          >
            <Card className="rounded-2xl border-slate-200 shadow-xl dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#25D366] text-white">
                    {/* small WA glyph */}
                    <svg viewBox="0 0 32 32" className="h-4 w-4 fill-current"><path d="M19.11 17.38c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.95-.94 1.15-.17.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.47.13-.62.13-.12.3-.31.45-.46.15-.15.2-.26.3-.43.1-.17.05-.32-.02-.46-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.46.07-.7.35-.24.27-.91.89-.91 2.18 0 1.29.93 2.54 1.06 2.71.13.17 1.83 2.8 4.44 3.92.62.27 1.1.43 1.47.55.62.2 1.19.17 1.64.1.5-.07 1.54-.63 1.76-1.25.22-.62.22-1.16.15-1.27-.07-.11-.25-.18-.55-.33zM16.03 4C9.92 4 5 8.92 5 15.03c0 1.94.52 3.77 1.43 5.35L5 28l7.76-1.96c1.53.84 3.28 1.3 5.14 1.3 6.11 0 11.03-4.92 11.03-11.03C28.93 8.92 24.11 4 16.03 4z"/></svg>
                  </span>
                  <div>
                    <CardTitle className="text-sm leading-5">{brand} Support</CardTitle>
                    <p className="text-xs text-muted-foreground">Typically replies instantly</p>
                  </div>
                </div>
                <button
                  aria-label="Close"
                  className="rounded-full p-1 text-muted-foreground hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </button>
              </CardHeader>

              <CardContent className="space-y-3 p-4 pt-1">
                <p className="text-sm">
                  <span className="font-medium">Assalamu Alaikum! </span>👋
                </p>
                <p className="text-sm text-muted-foreground">
                  Got questions about Grade 12 prep? We’ll guide you to the right past papers, auto-graded quizzes, and marking schemes—so you can conquer the Somali National Exams.

                </p>

                <div className="pt-1">
                  <Link href={href} target="_blank">
                    <Button className="h-10 w-full rounded-xl bg-[#25D366] text-white hover:bg-[#1FB85A]">
                      Start Chat
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-1 pt-1">
                  <Badge variant="secondary" className="rounded-full">WhatsApp</Badge>
                  <span className="text-xs text-muted-foreground">+{phone}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
