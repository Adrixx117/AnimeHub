// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number; // ahora el user tiene id como number
    } & DefaultSession["user"];
  }
}
