import { StackContext, use, ViteStaticSite } from "@serverless-stack/resources";
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

  const site = new ViteStaticSite(stack, "site", {
    ...(isProduction ? domain : {}),
    path: "web",
    buildCommand: "npm run build",
    environment: {
      VITE_GRAPHQL_URL: api.url + "/graphql",
    },
  });

  stack.addOutputs({
    SITE_URL: site.url,
  });

  return api;
}
