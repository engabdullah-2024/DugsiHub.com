import { prisma } from "../lib/prisma";

const ADMIN_EMAIL = "enga95311@gmail.com";
const ADMIN_CLERK_ID = process.env.SUPERADMIN_CLERK_ID ?? ""; // set in .env

async function main() {
  if (!ADMIN_CLERK_ID) {
    throw new Error(
      "❌ Missing SUPERADMIN_CLERK_ID env variable.\nAdd it to your .env"
    );
  }

  await prisma.admin.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      clerkId: ADMIN_CLERK_ID,
    },
    create: {
      email: ADMIN_EMAIL,
      clerkId: ADMIN_CLERK_ID,
      fullName: "Super Admin",
    },
  });

  console.log("✅ Super admin ensured:", ADMIN_EMAIL);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
