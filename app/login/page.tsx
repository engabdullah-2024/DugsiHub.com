// app/sign-in/page.tsx
"use client";

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-900 dark:to-neutral-950 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Sign in to continue
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-800 dark:bg-neutral-900">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-emerald-600 hover:bg-emerald-700 text-white",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
