import NextAuth, { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

//console.log(" NextAuth is initializing...");

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
