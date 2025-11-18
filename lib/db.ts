// lib/db.ts
import { PrismaClient } from "@prisma/client";

// ✅ Maintain a single Prisma instance across hot reloads in development.
// This prevents "Too many Prisma Client instances" errors in Next.js.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// ✅ Configure Prisma logging and error handling
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// ✅ Attach Prisma client to the global object in development only
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// ✅ Optional: graceful shutdown handler (for production edge cases)
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export default prisma;
