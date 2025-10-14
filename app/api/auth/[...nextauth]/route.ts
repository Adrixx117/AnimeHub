// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type AuthOptions, type DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { AdapterUser } from "next-auth/adapters";

// Extiende la sesión para incluir el ID del usuario
declare module "next-auth" {
  interface Session {
    user: {
      id: number; // ID de tu DB
    } & DefaultSession["user"];
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      // session.user ya está garantizado
      return {
        ...session,
        user: {
          ...session.user,
          id: Number(user.id), // Convertimos el id a número
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
