// app/dashboard/papers/page.tsx
import { getAuth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { headers, cookies } from "next/headers";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

type DocumentType = {
  id: string;
  title: string;
  name: string;
  totalPages: number;
  createdAt: Date;
  adminId: string;
};

const PAGE_SIZE = 12;

interface Props {
  searchParams?: { q?: string; page?: string };
}

export default async function PapersPage({ searchParams }: Props) {
  // Authenticate user
  let userId: string | null = null;
  try {
    const auth = getAuth({ headers: headers(), cookies: cookies() });
    userId = auth.userId || null;
  } catch (err) {
    console.error("Clerk getAuth error:", err);
  }
  if (!userId) redirect("/login");

  const query = (searchParams?.q || "").trim();
  const page = Math.max(1, Number(searchParams?.page || "1"));
  const skip = (page - 1) * PAGE_SIZE;

  // Build search filter
  const where = query
    ? {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { name: { contains: query, mode: "insensitive" } },
        ],
      }
    : undefined;

  let documents: DocumentType[] = [];
  let total = 0;

  try {
    const [docs, count] = await Promise.all([
      prisma.document.findMany({
        where,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          name: true,
          totalPages: true,
          createdAt: true,
          adminId: true,
        },
        skip,
        take: PAGE_SIZE,
      }),
      prisma.document.count({ where }),
    ]);

    documents = docs;
    total = count;
  } catch (err) {
    console.error("Error fetching documents:", err);
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Past Papers
          </h1>
          <div className="flex items-center gap-3">
            <form method="get" className="flex" action="/dashboard/papers">
              <input
                name="q"
                defaultValue={query}
                placeholder="Search title or name..."
                className="px-3 py-2 rounded-l-md border focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-200 rounded-r-md hover:bg-gray-300"
              >
                Search
              </button>
            </form>
            <Link href="/dashboard/upload">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition">
                Upload New Paper
              </button>
            </Link>
          </div>
        </div>

        {/* Papers Table */}
        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                {["Title", "Name", "Pages", "Uploaded At", ""].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
              {documents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-300">
                    No papers uploaded yet.
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{doc.title}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-300">{doc.name}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-300">{doc.totalPages}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-300">
                      {doc.createdAt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/api/uploads/${doc.id}`}
                        target="_blank"
                        className="text-indigo-600 hover:text-indigo-800 font-medium transition"
                      >
                        View / Download
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Showing {skip + 1} to {Math.min(skip + PAGE_SIZE, total)} of {total}
            </span>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const p = idx + 1;
                const isActive = p === page;
                return (
                  <Link key={p} href={`/dashboard/papers?q=${encodeURIComponent(query)}&page=${p}`}>
                    <button
                      className={`px-3 py-1 rounded ${
                        isActive
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {p}
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
