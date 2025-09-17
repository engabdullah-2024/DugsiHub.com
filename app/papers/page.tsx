// app/papers/page.tsx
import Link from "next/link";
import { dbConnect } from "@/lib/db";
import { Paper } from "../models/Paper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileDown, Search, BookOpen } from "lucide-react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SearchParams = {
  q?: string;
  subject?: string;
  sort?: "new" | "old" | "subject-asc" | "subject-desc";
  page?: string;
};

// ---- helpers & types --------------------------------------------------------

function escReg(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function fmtDate(d: Date | string) {
  const dt = new Date(d);
  return dt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function buildHref(base: string, params: Record<string, string | undefined>) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v && v !== "all") sp.set(k, v);
  });
  const qs = sp.toString();
  return qs ? `${base}?${qs}` : base;
}

// For lean() results: _id could be string or have toString()
type IdLike = string | { toString(): string };

interface PaperLean {
  _id: IdLike;
  subject: string;
  pages: number;
  fileUrl: string;
  fileName: string;
  createdAt: Date | string;
}

// ----------------------------------------------------------------------------

export default async function PapersPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  await dbConnect();

  const originalQ = (searchParams?.q || "").trim();
  const originalSubject = (searchParams?.subject || "all").trim();
  const sort = (searchParams?.sort || "new") as NonNullable<
    SearchParams["sort"]
  >;
  const page = Math.max(1, parseInt(searchParams?.page || "1", 10) || 1);
  const perPage = 12;

  // Get all subjects first to support smart subject matching
  const allSubjects = (await Paper.distinct("subject")) as string[];
  allSubjects.sort((a, b) => a.localeCompare(b));

  // Smart subject detection: if the search exactly matches a subject
  const exactMatch = allSubjects.find(
    (s) =>
      s.trim().toLowerCase() === originalQ.toLowerCase() &&
      originalQ.length > 0
  );
  const subjectFilter =
    originalSubject === "all" && exactMatch ? exactMatch : originalSubject;
  const q = exactMatch ? "" : originalQ;

  // Mongo filter
  const filter: Record<string, unknown> = {};
  if (subjectFilter && subjectFilter !== "all") {
    filter.subject = { $regex: `^${escReg(subjectFilter)}$`, $options: "i" };
  }
  if (q) {
    const rx = { $regex: escReg(q), $options: "i" };
    filter.$or = [{ subject: rx }, { fileName: rx }];
  }

  // Sorting
  const sortMap: Record<string, Record<string, 1 | -1>> = {
    new: { createdAt: -1 },
    old: { createdAt: 1 },
    "subject-asc": { subject: 1, createdAt: -1 },
    "subject-desc": { subject: -1, createdAt: -1 },
  };
  const sortObj = sortMap[sort] ?? sortMap.new;

  const [total, rows] = await Promise.all([
    Paper.countDocuments(filter),
    Paper.find(filter)
      .sort(sortObj)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean<PaperLean>(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Toolbar */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Past Papers</h1>

          {/* GET form (no client JS) */}
          <form
            className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row"
            role="search"
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                name="q"
                placeholder="Search by subject or file name…"
                defaultValue={originalQ}
                className="h-9 w-full pl-9 sm:w-72"
                aria-label="Search papers"
              />
            </div>

            <select
              name="subject"
              defaultValue={originalSubject || "all"}
              className="h-9 rounded-md border bg-background px-3 text-sm"
              aria-label="Filter by subject"
            >
              <option value="all">All subjects</option>
              {allSubjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              name="sort"
              defaultValue={sort}
              className="h-9 rounded-md border bg-background px-3 text-sm"
              aria-label="Sort results"
            >
              <option value="new">Newest first</option>
              <option value="old">Oldest first</option>
              <option value="subject-asc">Subject A→Z</option>
              <option value="subject-desc">Subject Z→A</option>
            </select>

            {/* Reset page when applying new filters */}
            <input type="hidden" name="page" value="1" />
            <Button
              type="submit"
              className="h-9 bg-emerald-600 hover:bg-emerald-600/90"
            >
              Apply
            </Button>
          </form>
        </div>

        {/* Active filters */}
        {(originalQ || (subjectFilter && subjectFilter !== "all")) && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Filters:</span>

            {exactMatch ? (
              <>
                <Badge variant="secondary">subject: {exactMatch}</Badge>
                <span className="text-xs text-muted-foreground">
                  (detected from search)
                </span>
              </>
            ) : (
              <>
                {originalQ && <Badge variant="secondary">q: {originalQ}</Badge>}
                {subjectFilter !== "all" && (
                  <Badge variant="secondary">subject: {subjectFilter}</Badge>
                )}
              </>
            )}

            <Link
              href="/papers"
              className="text-xs font-medium text-emerald-600 hover:underline"
              aria-label="Clear filters"
            >
              Clear
            </Link>
          </div>
        )}

        {/* Results meta */}
        <div className="mb-4 text-xs text-muted-foreground">
          Showing <span className="font-medium">{rows.length}</span> of{" "}
          <span className="font-medium">{total}</span> result
          {total === 1 ? "" : "s"}
        </div>

        {/* Grid */}
        {rows.length === 0 ? (
          <Card className="border-muted/40">
            <CardHeader>
              <CardTitle>No papers found</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Try clearing filters or searching a different keyword.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rows.map((p) => (
              <Card
                key={`${p._id}`}
                className="group border-muted/40 transition-colors hover:border-emerald-200 dark:hover:border-emerald-900"
              >
                <CardHeader className="space-y-1 pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="line-clamp-1 text-base">
                      {p.subject}
                    </CardTitle>
                    <Badge variant="outline" className="text-[10px]">
                      {p.pages} pages
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span className="truncate">{p.fileName}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Added {fmtDate(p.createdAt)}
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="mt-1 flex gap-2">
                    <a
                      href={p.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                      aria-label={`Open ${p.fileName}`}
                    >
                      <Button variant="secondary" className="h-8 gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Open
                      </Button>
                    </a>
                    <a
                      href={p.fileUrl}
                      download
                      className="inline-flex"
                      aria-label={`Download ${p.fileName}`}
                    >
                      <Button variant="outline" className="h-8 gap-2">
                        <FileDown className="h-4 w-4" />
                        Download
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <Link
              aria-disabled={page <= 1}
              className={`rounded-md border px-3 py-1.5 text-sm ${
                page <= 1
                  ? "pointer-events-none opacity-50"
                  : "hover:border-emerald-300 dark:hover:border-emerald-900"
              }`}
              href={buildHref("/papers", {
                q: originalQ || undefined,
                subject:
                  originalSubject !== "all" ? originalSubject : undefined,
                sort,
                page: String(Math.max(1, page - 1)),
              })}
            >
              Prev
            </Link>
            <span className="text-xs text-muted-foreground">
              Page <span className="font-medium">{page}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
            </span>
            <Link
              aria-disabled={page >= totalPages}
              className={`rounded-md border px-3 py-1.5 text-sm ${
                page >= totalPages
                  ? "pointer-events-none opacity-50"
                  : "hover:border-emerald-300 dark:hover:border-emerald-900"
              }`}
              href={buildHref("/papers", {
                q: originalQ || undefined,
                subject:
                  originalSubject !== "all" ? originalSubject : undefined,
                sort,
                page: String(Math.min(totalPages, page + 1)),
              })}
            >
              Next
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
