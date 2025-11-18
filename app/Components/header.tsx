"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, UserRound } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { useUser, SignOutButton } from "@clerk/nextjs";

const ADMIN_EMAIL =
  (process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "enga95311@gmail.com").toLowerCase();

export default function HeaderClient({ initialName }: { initialName: string | null }) {
  const { user, isLoaded } = useUser();
  const [firstName, setFirstName] = useState<string | null>(initialName);

  useEffect(() => {
    if (isLoaded) setFirstName(user?.firstName ?? null);
  }, [user, isLoaded]);

  const email = useMemo(
    () => user?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? "",
    [user]
  );
  const isAdmin = email === ADMIN_EMAIL;
  const isAuthed = !!user;

  const dashboardHref = isAdmin ? "/dashboard" : "/u";
  const accountHref = isAdmin ? "/dashboard/account" : "/u/account";

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
          <Link href="/" className="text-base font-medium text-muted-foreground hover:text-foreground">Home</Link>
          <Link href="/about" className="text-base font-medium text-muted-foreground hover:text-foreground">About</Link>
          <Link href="/subjects" className="text-base font-medium text-muted-foreground hover:text-foreground">Subjects</Link>
          <Link href="/contact" className="text-base font-medium text-muted-foreground hover:text-foreground">Contact</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          {/* Desktop auth/cta */}
          <div className="hidden items-center gap-2 md:flex">
            {isAuthed ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="px-3">
                    <span className="text-sm">
                      Hi, <span className="font-medium">{firstName ?? "User"}</span>
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={8} className="p-0 border-muted/40 shadow-sm">
                  <Card className="w-64 border-0">
                    <div className="flex items-center gap-2 p-3">
                      <UserRound className="h-4 w-4 text-muted-foreground" />
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground">Signed in as</div>
                        <div className="truncate text-sm font-medium">{firstName ?? "User"}</div>
                      </div>
                    </div>
                    <Separator />
                    <div className="p-3 space-y-2">
                      <Button asChild variant="outline" className="w-full">
                        <Link href={accountHref}>View account</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link href={dashboardHref}>Go to Dashboard</Link>
                      </Button>
                      <SignOutButton>
                        <Button variant="destructive" className="w-full">Sign Out</Button>
                      </SignOutButton>
                    </div>
                  </Card>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-600/90">
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Nav (Sheet) */}
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
              <nav className="flex flex-col gap-1 p-2">
                {["/", "/about", "/papers", "/contact"].map((href, i) => (
                  <SheetClose asChild key={href}>
                    <Button asChild variant="ghost" size="lg" className="justify-start rounded-md px-3 text-base font-medium">
                      <Link href={href}>{["Home", "About", "Papers", "Contact"][i]}</Link>
                    </Button>
                  </SheetClose>
                ))}
              </nav>
              <Separator className="my-2" />
              <div className="p-3">
                {isAuthed ? (
                  <div className="rounded-lg border bg-muted/20 p-3 space-y-2">
                    <div className="text-sm text-muted-foreground">
                      Signed in as <span className="font-medium text-foreground">{firstName ?? "User"}</span>
                    </div>
                    <div className="flex gap-2">
                      <SheetClose asChild>
                        <Button asChild variant="outline" className="flex-1">
                          <Link href={accountHref}>View account</Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button asChild className="flex-1">
                          <Link href={dashboardHref}>Dashboard</Link>
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <SheetClose asChild>
                      <Button asChild variant="outline" className="flex-1">
                        <Link href="/login">Sign In</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild className="flex-1 bg-emerald-600 hover:bg-emerald-600/90">
                        <Link href="/register">Get Started</Link>
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* dark-mode logo stroke */}
      <style jsx global>{`
        :root { --logo-stroke: transparent; }
        .dark { --logo-stroke: rgba(255,255,255,0.9); }
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
    </header>
  );
}
