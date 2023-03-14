import { Config } from "sst/node/config";
import { AuthHandler, GithubAdapter } from "sst/node/auth";

export const handler = AuthHandler({
  providers: {
    github: GithubAdapter({
      clientID: Config.GITHUB_CLIENT_ID,
      clientSecret: Config.GITHUB_CLIENT_SECRET,
      scope: "<space separated list of scopes>",
      onSuccess: async (tokenset) => {
        // @ts-ignore
        const { access_token, id_token } = tokenset;
        return {
          statusCode: 200,
          body: JSON.stringify({
            access_token,
            id_token,
          }),
        };
      },
    }),
  },
});
