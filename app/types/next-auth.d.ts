import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    businessName?: string;
  }

  interface Session extends DefaultSession {
    user?: {
      id?: string;
      businessName?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    businessName?: string;
  }
} 