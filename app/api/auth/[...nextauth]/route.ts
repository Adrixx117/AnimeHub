export const dynamic = "force-dynamic";

import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: number;
    };
  }
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({
      session,
      user,
    }: {
      session: any;
      user: AdapterUser;
    }) {
      if (session.user) {
        session.user.id = Number(user.id);
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
