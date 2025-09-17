// app/dashboard/signout-button.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);
  async function onClick() {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  }
  return (
    <Button variant="outline" onClick={onClick} disabled={loading} className="gap-2">
      <LogOut className="h-4 w-4" />
      {loading ? "Signing out..." : "Sign out"}
    </Button>
  );
}
