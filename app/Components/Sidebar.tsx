// app/dashboard/_components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Upload,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SignOutButton from "../dashboard/signout-button";

type UserShape = {
  firstName?: string;
  lastName?: string;
  role?: string;
};

export default function Sidebar({
  user,
  isSuper,
  inSheet = false,
}: {
  user: UserShape;
  isSuper: boolean;
  /** Render with tighter spacing when used inside <Sheet> on mobile */
  inSheet?: boolean;
}) {
  const pathname = usePathname();

  const items = useMemo(
    () =>
      [
        { href: "/dashboard", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
        { href: "/papers", label: "Papers", icon: <BookOpen className="h-4 w-4" /> },
        isSuper
          ? { href: "/dashboard#upload", label: "Upload", icon: <Upload className="h-4 w-4" /> }
          : null,
        { href: "#", label: "Settings", icon: <Settings className="h-4 w-4" />, disabled: true },
      ].filter(Boolean) as { href: string; label: string; icon: ReactNode; disabled?: boolean }[],
    [isSuper]
  );

  return (
    <nav
      className={`flex h-full flex-col ${inSheet ? "p-2" : "p-4"} gap-2`}
      aria-label="Dashboard navigation"
      role="navigation"
    >
      {/* Brand (desktop sidebar) */}
      {!inSheet && (
        <>
          <div className="px-2 py-1.5">
            <Link href="/dashboard" className="flex items-center gap-2" aria-label="Dugsi Hub — Dashboard">
              <div className="relative h-8 w-[140px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/dugsihub.png"
                  alt="Dugsi Hub"
                  className="h-8 w-auto object-contain logo-stroked"
                />
              </div>
            </Link>
          </div>
          <Separator />
        </>
      )}

      {/* Nav links */}
      <ul className="mt-1 space-y-1">
        {items.map((it) => {
          const active = pathname === it.href || (it.href !== "/dashboard" && pathname.startsWith(it.href));
          return (
            <li key={it.href}>
              {it.disabled ? (
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 opacity-60"
                  disabled
                >
                  {it.icon}
                  {it.label}
                </Button>
              ) : (
                <Link
                  href={it.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                  ].join(" ")}
                >
                  {it.icon}
                  <span className="flex-1 truncate">{it.label}</span>
                  {active && <ChevronRight className="h-4 w-4 opacity-70" />}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-auto space-y-2">
        <Separator />
        <div className="px-2 py-2 text-xs text-muted-foreground">
          Signed in as <span className="font-medium">{user.firstName}</span>
        </div>
        <SignOutButton className="w-full justify-start gap-2" icon={<LogOut className="h-4 w-4" />} />
      </div>
    </nav>
  );
}
