// app/dashboard/layout.tsx
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Menu, Search } from "lucide-react";
import { currentUser } from "@/lib/auth";
import LogoStrokeStyles from "@/app/Components/LogoStrokeStyles";
import Sidebar from "../Components/Sidebar";
import SignOutButton from "./signout-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Dashboard — Dugsi Hub",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) redirect("/login");

  const isSuper = user.role === "superadmin";

  return (
    <div className="min-h-screen bg-background">
      <LogoStrokeStyles />
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[260px_1fr]">
        {/* Static sidebar (md+) */}
        <aside className="hidden border-r md:block">
          <Sidebar user={user} isSuper={isSuper} />
        </aside>

        {/* Main column */}
        <div className="flex min-h-screen flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-30 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
              {/* Left: mobile menu + brand */}
              <div className="flex items-center gap-3">
                {/* Mobile drawer */}
                <div className="md:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="Open menu">
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0">
                      <SheetHeader className="px-4 pb-2 pt-4">
                        <SheetTitle className="flex items-center gap-2">
                          <div className="relative h-7 w-[120px]">
                            <Image
                              src="/dugsihub.png"
                              alt="Dugsi Hub"
                              fill
                              priority
                              className="object-contain logo-stroked"
                              sizes="120px"
                            />
                          </div>
                        </SheetTitle>
                      </SheetHeader>
                      <Separator />
                      <div className="p-2">
                        {/* Mobile nav list mirrors sidebar */}
                        <Sidebar user={user} isSuper={isSuper} inSheet />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                <Link href="/dashboard" aria-label="Dugsi Hub — Dashboard" className="block md:hidden">
                  <div className="relative h-8 w-[140px]">
                    <Image
                      src="/dugsihub.png"
                      alt="Dugsi Hub"
                      fill
                      className="object-contain logo-stroked"
                      sizes="140px"
                      priority
                    />
                  </div>
                </Link>

                {/* Desktop search */}
                <div className="hidden md:block">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search…"
                      className="h-9 w-72 pl-9"
                      aria-label="Search"
                    />
                  </div>
                </div>
              </div>

              {/* Right: user + signout */}
              <div className="flex items-center gap-3">
                <span className="hidden text-sm text-muted-foreground sm:block">
                  {user.firstName} {user.lastName} • {user.role}
                </span>
                <SignOutButton />
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
