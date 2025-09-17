import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const ping = await prisma.$runCommandRaw({ ping: 1 } as any);
  console.log("Mongo ping:", ping);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
