// types/nextauth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;  // Define the `id` as a number, matching your response from NextAuth
      fullname: string;
      role: string;
      isAdmin:boolean;
    } & DefaultSession["user"];
  }
}
