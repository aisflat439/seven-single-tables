import { StackContext, use, Api as ApiGateway } from "sst/constructs";
import { Database } from "./Database.js";

export function Api({ stack }: StackContext) {
  const db = use(Database);

  const api = new ApiGateway(stack, "api", {
    customDomain:
      stack.stage === "prod" ? "api.sevensingletables.com" : undefined,
    defaults: {
      function: {
        bind: [db],
      },
    },
    routes: {
      "GET /trpc/{proxy+}": "packages/functions/src/trpc.handler",
      "POST /trpc/{proxy+}": "packages/functions/src/trpc.handler",
    },
  });

  stack.addOutputs({
    API_URL: api.url,
  });

  return api;
}
