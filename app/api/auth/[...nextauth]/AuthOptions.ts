import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../prisma/client"; // keep your path (or use an alias like "@/prisma/client")

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),

  // Keep JWT sessions for speed. If you want DB-backed sessions, set "database" and generate Prisma Session model.
  session: { strategy: "jwt" },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // authorization: { params: { scope: "openid email profile" } }, // optional
    }),
  ],

  debug: process.env.NODE_ENV === "development",

  callbacks: {
    /**
     * Runs on sign-in and subsequent requests.
     * Attach only what you need; avoid heavy DB queries every call.
     */
    async jwt({ token, user, account, trigger, session }) {
      // First time (after OAuth callback)
      if (account && user) {
        token.userId = user.id as string;
        token.name = user.name ?? token.name;
        token.email = user.email ?? token.email;
        
        token.picture = user.image ?? token.picture;
      }

      // If you manually trigger an update from the client
      if (trigger === "update" && session?.user) {
        token.name = session.user.name ?? token.name;
        token.picture = session.user.image ?? token.picture;
      }

      return token;
    },

    /**
     * Controls what ends up in useSession()
     */
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.userId;
        session.user.name = token.name ?? session.user.name ?? null;
        session.user.email = token.email ?? session.user.email ?? null;
        session.user.image = token.picture ?? session.user.image ?? null;
      }
      return session;
    },

    /**
     * Safer redirects (optional)
     */
    async redirect({ url, baseUrl }) {
      try {
        const u = new URL(url);
        return u.origin === baseUrl ? url : baseUrl;
      } catch {
        return baseUrl;
      }
    },
  },
};
