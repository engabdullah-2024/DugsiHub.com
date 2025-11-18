import { PrismaClient } from "@prisma/client";

declare global {
  // Prevent multiple instances during hot reloads in development
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "error"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
