import { StackContext, use, StaticSite } from "sst/constructs";
import { Api } from "./Api";

export function Web({ stack }: StackContext) {
  const api = use(Api);

  const isProduction = stack.stage === "prod";
  const domain = {
    customDomain: {
      domainName: "sevensingletables.com",
      domainAlias: "www.sevensingletables.com",
    },
  };

  const site = new StaticSite(stack, "site", {
    ...(isProduction ? domain : {}),
    path: "packages/web",
    buildCommand: "npm run build",
    buildOutput: "dist",
    environment: {
      VITE_API_URL: api.url,
    },
  });

  stack.addOutputs({
    SITE: site.url || "https://localhost:3000",
    VITE_API_URL: api.url,
  });

  return api;
}
