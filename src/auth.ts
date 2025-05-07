import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  // callbacks: {
  //   // Usually not needed, here we are fixing a bug in nextauth
  //   async session({ session, user }) {
  //     if (session && user) {
  //       session.user.id = user.id;
  //     }

  //     return session;
  //   },
  // },
});
