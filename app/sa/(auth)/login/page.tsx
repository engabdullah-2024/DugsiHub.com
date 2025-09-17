"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [submitting, setSubmitting] = useState(false);

  async function handleGoogle() {
    try {
      setSubmitting(true);
      // ✅ go to /sa after successful login
      await signIn("google", { callbackUrl: "/sa" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-[100svh] items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login with your Google account.</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          {error && (
            <p className="text-sm text-red-600">
              {error === "Callback"
                ? "Could not complete Google sign-in. Check your OAuth settings and try again."
                : "Sign-in failed. Please try again."}
            </p>
          )}

          <Button
            type="button"
            variant="outline"
            className="flex items-center justify-center gap-2"
            onClick={handleGoogle}
            disabled={submitting}
          >
            <FcGoogle className="h-5 w-5" />
            {submitting ? "Redirecting…" : "Continue with Google"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
