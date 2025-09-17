// app/dashboard/papers-upload.tsx
"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload } from "lucide-react";

const formSchema = z.object({
  subject: z.string().min(2, "Subject is required"),
  pages: z.coerce.number().int().min(1, "Pages must be at least 1").max(2000),
  file: z.any(),
});

export default function PapersUpload() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setOk(null);

    const fd = new FormData(e.currentTarget);
    const subject = String(fd.get("subject") || "");
    const pages = fd.get("pages");
    const file = fd.get("file");

    const parsed = formSchema.safeParse({ subject, pages, file });
    if (!parsed.success) {
      setErr(parsed.error.issues[0]?.message ?? "Invalid form");
      setLoading(false);
      return;
    }
    if (!(file instanceof File)) {
      setErr("Please choose a PDF file");
      setLoading(false);
      return;
    }
    if (file.type !== "application/pdf") {
      setErr("Only PDF files are allowed");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/papers", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Upload failed");
      setOk("Uploaded successfully");
      (e.target as HTMLFormElement).reset();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" placeholder="Mathematics" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pages">Pages</Label>
          <Input id="pages" name="pages" type="number" min={1} max={2000} placeholder="12" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">PDF File</Label>
        <Input id="file" name="file" type="file" accept="application/pdf" required />
        <p className="text-xs text-muted-foreground">Max 25MB. PDF only.</p>
      </div>

      {err && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{err}</AlertDescription>
        </Alert>
      )}
      {ok && (
        <Alert>
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{ok}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={loading} className="gap-2 bg-emerald-600 hover:bg-emerald-600/90">
        <Upload className="h-4 w-4" />
        {loading ? "Uploading..." : "Upload PDF"}
      </Button>
    </form>
  );
}
