"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "../Components/ModeToggle";

// ------------------------------------------------------------
// Dugsi Hub — Header (logo with dark-mode stroke for visibility)
// ------------------------------------------------------------

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2" aria-label="Dugsi Hub — Home">
          <div className="relative h-44 w-44 sm:h-32 sm:w-52">
            <Image
              src="/dugsihub.png"
              alt="Dugsi Hub"
              fill
              priority
              sizes="(max-width: 640px) 176px, 208px"
              className="object-contain logo-stroked"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-base font-medium text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <Link href="/about" className="text-base font-medium text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="text-base font-medium text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[340px] sm:w-[380px] p-0">
              <SheetHeader className="px-4 pb-3 pt-4">
                <SheetTitle className="flex items-center justify-between">
                  <div className="relative h-32 w-32">
                    <Image
                      src="/dugsihub.png"
                      alt="Dugsi Hub"
                      fill
                      sizes="176px"
                      className="object-contain logo-stroked"
                      priority
                    />
                  </div>
                  <ModeToggle />
                </SheetTitle>
              </SheetHeader>
              <Separator />

              {/* Stacked nav */}
              <nav className="flex flex-col gap-1 p-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                ].map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Button
                      asChild
                      variant="ghost"
                      size="lg"
                      className="justify-start rounded-md px-3 text-base font-medium"
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </Button>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Dark-mode logo stroke + pop, scoped + safe */}
      <style jsx global>{`
        :root {
          --logo-stroke: transparent;
        }
        .dark {
          --logo-stroke: rgba(255, 255, 255, 0.9);
        }
        /* Adds a subtle “stroke” around transparent PNG edges using directional drop-shadows.
           Enabled in dark mode via --logo-stroke; no effect in light mode. */
        .logo-stroked {
          filter:
            drop-shadow(0 1px 0 var(--logo-stroke))
            drop-shadow(0 -1px 0 var(--logo-stroke))
            drop-shadow(1px 0 0 var(--logo-stroke))
            drop-shadow(-1px 0 0 var(--logo-stroke));
        }
        .dark .logo-stroked {
          /* small pop so dark logos aren’t muddy on dark surfaces */
          filter:
            drop-shadow(0 1px 0 var(--logo-stroke))
            drop-shadow(0 -1px 0 var(--logo-stroke))
            drop-shadow(1px 0 0 var(--logo-stroke))
            drop-shadow(-1px 0 0 var(--logo-stroke))
            brightness(1.06)
            contrast(1.05);
        }
      `}</style>
    </header>
  );
}
