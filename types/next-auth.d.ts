// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number; // ahora TypeScript sabe que hay un id
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
  }
}
