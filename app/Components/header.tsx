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
// Dugsi Hub — Header (big logo aligned with nav links)
// ------------------------------------------------------------

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2" aria-label="Dugsi Hub — Home">
          <div className="relative h-44 w-44 sm:h-32 sm:w-52">
            <Image
              src="/dugsihub.png" // replace with your final asset path
              alt="Dugsi Hub"
              fill
              priority
              sizes="(max-width: 640px) 176px, 208px"
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-base font-medium text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <Link href="/papers" className="text-base font-medium text-muted-foreground hover:text-foreground">
            Past Papers
          </Link>
          <Link href="/quizzes" className="text-base font-medium text-muted-foreground hover:text-foreground">
            Quizzes
          </Link>
          <Link href="/subjects" className="text-base font-medium text-muted-foreground hover:text-foreground">
            Subjects
          </Link>
          <Link href="/resources" className="text-base font-medium text-muted-foreground hover:text-foreground">
            Resources
          </Link>
          <Link href="/community" className="text-base font-medium text-muted-foreground hover:text-foreground">
            Community
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
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild size="sm" className="hidden md:inline-flex bg-emerald-600 hover:bg-emerald-600/90">
            <Link href="/get-started">Get Started</Link>
          </Button>

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
                      className="object-contain"
                      priority
                    />
                  </div>
                  <ModeToggle />
                </SheetTitle>
              </SheetHeader>
              <Separator />

              {/* Quick links */}
              <div className="grid grid-cols-2 gap-2 p-3">
                {[
                  { href: "/papers", label: "Past Papers" },
                  { href: "/quizzes", label: "Quizzes" },
                  { href: "/subjects", label: "Subjects" },
                  { href: "/resources", label: "Resources" },
                ].map((l) => (
                  <SheetClose asChild key={l.href}>
                    <Link
                      href={l.href}
                      className="rounded-xl border bg-muted/40 px-4 py-3 text-sm font-medium hover:bg-muted"
                    >
                      {l.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>

              <Separator />

              {/* Stacked nav */}
              <nav className="flex flex-col gap-1 p-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "/papers", label: "Past Papers" },
                  { href: "/quizzes", label: "Quizzes" },
                  { href: "/subjects", label: "Subjects" },
                  { href: "/resources", label: "Resources" },
                  { href: "/community", label: "Community" },
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

              <Separator className="my-2" />

              {/* Footer actions */}
              <div className="flex items-center justify-between gap-2 p-3">
                <SheetClose asChild>
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/signin">Sign In</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild className="flex-1 bg-emerald-600 hover:bg-emerald-600/90">
                    <Link href="/get-started">Get Started</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
