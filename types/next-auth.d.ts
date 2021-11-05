import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultUser & {
      id: string;
      about?: string;
      website?: string;
      contactNumber?: string;
      github?: string;
      linkedin?: string;
    };
  }
}
