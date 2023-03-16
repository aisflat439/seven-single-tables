import { Config } from "sst/node/config";
import { AuthHandler, GithubAdapter, Session } from "sst/node/auth";

import { User } from "@seven-single-tables/core/src/user";

declare module "sst/node/auth" {
  export interface SessionTypes {
    user: {
      userID: string;
    };
  }
}

export const handler = AuthHandler({
  providers: {
    github: GithubAdapter({
      clientID: Config.GITHUB_CLIENT_ID,
      clientSecret: Config.GITHUB_CLIENT_SECRET,
      scope: "user",
      onSuccess: async (tokenset) => {
        const result = await User.login(tokenset.access_token!);

        const user = result.data!;

        return Session.parameter({
          redirect: process.env.URL || "http://localhost:3000",
          type: "user",
          properties: {
            userID: user.login,
          },
        });
      },
    }),
  },
});
