import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function UsersListPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, image: true, createdAt: true },
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {users.map((u) => (
            <div key={u.id} className="flex items-center justify-between rounded-md border p-3 dark:border-slate-800">
              <div className="min-w-0">
                <div className="truncate font-medium">{u.name ?? u.email}</div>
                <div className="truncate text-xs text-muted-foreground">{u.email}</div>
              </div>
              <span className="text-xs">{u.role}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
