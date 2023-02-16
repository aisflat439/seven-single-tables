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
      "POST /graphql": {
        type: "graphql",
        function: {
          handler: "packages/functions/src/graphql/graphql.handler",
        },
        pothos: {
          schema: "packages/functions/src/graphql/schema.ts",
          output: "packages/graphql/schema.graphql",
          commands: [
            "cd packages/graphql && npx @genql/cli --output ./genql --schema ./schema.graphql --esm",
          ],
        },
      },
    },
  });

  stack.addOutputs({
    API_URL: api.url,
  });

  return api;
}
