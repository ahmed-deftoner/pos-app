import { SquareClient, SquareEnvironment } from "square";
import type { TokenSetParameters } from "openid-client";
import { SquareProfile, SquareProviderOptions } from "@/types/auth.types";
import { OAuthConfig } from "next-auth/providers/oauth";
import { Profile } from "next-auth";

export default function SquareProvider(
  options: SquareProviderOptions
): OAuthConfig<SquareProfile> {
  return {
    id: "square",
    name: "Square",
    type: "oauth",
    version: "2.0",

    authorization: {
      url: process.env.SQUARE_AUTHORIZATION_URL,
      params: {
        response_type: "code",
        scope: "MERCHANT_PROFILE_READ PAYMENTS_WRITE ITEMS_READ",
      },
    },
    token: {
      async request(context) {
        if (!context.params.code) {
          throw new Error("No code received from Square");
        }
        const code = context.params.code;

        const client = new SquareClient({
          environment: SquareEnvironment.Sandbox,
        });
        const response = await client.oAuth.obtainToken({
          code,
          clientId: options.clientId,
          clientSecret: options.clientSecret,
          redirectUri: process.env.SQUARE_REDIRECT_URI!,
          grantType: "authorization_code",
        });

        const tokens: TokenSetParameters = {
          providerAccountId: response.merchantId,
          access_token: response.accessToken,
          refresh_token: response.refreshToken,
          expires_at: response.expiresAt
            ? new Date(response.expiresAt).getTime() / 1000
            : undefined,
          token_type: response.tokenType,
        };

        return { tokens };
      },
    },
    userinfo: {
      async request(): Promise<Profile> {
        return {
          name: "Test Business",
        };
      },
    },

    profile(profile: SquareProfile) {
      return {
        id: "dummy-id",
        name: profile.businessName ?? "Unknown Business",
      };
    },

    clientId: options.clientId,
    clientSecret: options.clientSecret,
  };
}
