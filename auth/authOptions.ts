import { NextAuthOptions, Session } from "next-auth";
import SquareProvider from "./squareProvider";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    SquareProvider({
      clientId: process.env.SQUARE_CLIENT_ID_SANDBOX!,
      clientSecret: process.env.SQUARE_CLIENT_SECRET_SANDBOX!,
      authorization: { params: { scope: "MERCHANT_PROFILE.READ" } },
    }),
  ],
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
};
