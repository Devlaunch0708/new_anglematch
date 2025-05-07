import "next-auth";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: String;
      role?: String;
    } & DefaultSession["user"];
  }
  interface User {
    _id?: String;
    role?: String;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: String;
    role?: String;
  }
}
