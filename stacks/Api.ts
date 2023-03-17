import { StackContext, use, Api as ApiGateway, Config } from "sst/constructs";
import { Database } from "./Database";
import { Authentication } from "./Authentication";

export function Api({ stack }: StackContext) {
  const github = Config.Secret.create(
    stack,
    "GITHUB_CLIENT_SECRET",
    "GITHUB_CLIENT_ID"
  );

  const db = use(Database);
  const auth = use(Authentication);

  const api = new ApiGateway(stack, "api", {
    customDomain:
      stack.stage === "prod" ? "api.sevensingletables.com" : undefined,
    defaults: {
      function: {
        bind: [db, ...Object.values(github)],
      },
    },
    routes: {
      "GET /trpc/{proxy+}": "packages/functions/src/trpc.handler",
      "POST /trpc/{proxy+}": "packages/functions/src/trpc.handler",
    },
  });

  auth.attach(stack, { api });

  stack.addOutputs({
    API_URL: api.customDomainUrl || api.url,
  });

  return api;
}
