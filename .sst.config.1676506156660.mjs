import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// stacks/Api.ts
import { use, Api as ApiGateway } from "sst/constructs";

// stacks/Database.ts
import { Table } from "sst/constructs";
function Database({ stack }) {
  const table = new Table(stack, "table", {
    fields: {
      pk: "string",
      sk: "string",
      gsi1pk: "string",
      gsi1sk: "string",
      gsi2pk: "string",
      gsi2sk: "string"
    },
    primaryIndex: {
      partitionKey: "pk",
      sortKey: "sk"
    },
    globalIndexes: {
      gsi1: {
        partitionKey: "gsi1pk",
        sortKey: "gsi1sk"
      }
    }
  });
  table.addGlobalIndexes({
    gsi2: {
      partitionKey: "gsi2pk",
      sortKey: "gsi2sk"
    }
  });
  return table;
}
__name(Database, "Database");

// stacks/Api.ts
function Api({ stack }) {
  const db = use(Database);
  const api = new ApiGateway(stack, "api", {
    customDomain: stack.stage === "prod" ? "api.sevensingletables.com" : void 0,
    defaults: {
      function: {
        bind: [db]
      }
    },
    routes: {
      "POST /graphql": {
        type: "graphql",
        function: {
          handler: "packages/functions/src/graphql/graphql.handler"
        },
        pothos: {
          schema: "packages/functions/src/graphql/schema.ts",
          output: "packages/graphql/schema.graphql",
          commands: [
            "cd packages/graphql && npx @genql/cli --output ./genql --schema ./schema.graphql --esm"
          ]
        }
      }
    }
  });
  stack.addOutputs({
    API_URL: api.url
  });
  return api;
}
__name(Api, "Api");

// stacks/Web.ts
import { use as use2, StaticSite } from "sst/constructs";
function Web({ stack }) {
  const api = use2(Api);
  const isProduction = stack.stage === "prod";
  const domain = {
    customDomain: {
      domainName: "sevensingletables.com",
      domainAlias: "www.sevensingletables.com"
    }
  };
  const site = new StaticSite(stack, "site", {
    ...isProduction ? domain : {},
    path: "web",
    buildCommand: "yarn build",
    buildOutput: "dist",
    environment: {
      VITE_GRAPHQL_URL: api.url + "/graphql",
      VITE_OMG: "YOLO"
    },
    vite: {
      types: "types/my-env.d.ts"
    }
  });
  stack.addOutputs({
    SITE: site.url || "https://localhost:3000",
    VITE_GRAPHQL_URL: api.url + "/graphql"
  });
  return api;
}
__name(Web, "Web");

// sst.config.ts
var sst_config_default = {
  config(_input) {
    return {
      name: "seven-single-tables",
      region: "us-east-1"
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: "nodejs16.x",
      srcPath: "services"
    });
    if (app.stage !== "prod") {
      app.setDefaultRemovalPolicy("destroy");
    }
    app.stack(Database).stack(Api).stack(Web);
  }
};
export {
  sst_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RhY2tzL0FwaS50cyIsICJzdGFja3MvRGF0YWJhc2UudHMiLCAic3RhY2tzL1dlYi50cyIsICJzc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBTdGFja0NvbnRleHQsIHVzZSwgQXBpIGFzIEFwaUdhdGV3YXkgfSBmcm9tIFwic3N0L2NvbnN0cnVjdHNcIjtcbmltcG9ydCB7IERhdGFiYXNlIH0gZnJvbSBcIi4vRGF0YWJhc2VcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIEFwaSh7IHN0YWNrIH06IFN0YWNrQ29udGV4dCkge1xuICBjb25zdCBkYiA9IHVzZShEYXRhYmFzZSk7XG5cbiAgY29uc3QgYXBpID0gbmV3IEFwaUdhdGV3YXkoc3RhY2ssIFwiYXBpXCIsIHtcbiAgICBjdXN0b21Eb21haW46XG4gICAgICBzdGFjay5zdGFnZSA9PT0gXCJwcm9kXCIgPyBcImFwaS5zZXZlbnNpbmdsZXRhYmxlcy5jb21cIiA6IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0czoge1xuICAgICAgZnVuY3Rpb246IHtcbiAgICAgICAgYmluZDogW2RiXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICByb3V0ZXM6IHtcbiAgICAgIFwiUE9TVCAvZ3JhcGhxbFwiOiB7XG4gICAgICAgIHR5cGU6IFwiZ3JhcGhxbFwiLFxuICAgICAgICBmdW5jdGlvbjoge1xuICAgICAgICAgIGhhbmRsZXI6IFwicGFja2FnZXMvZnVuY3Rpb25zL3NyYy9ncmFwaHFsL2dyYXBocWwuaGFuZGxlclwiLFxuICAgICAgICB9LFxuICAgICAgICBwb3Rob3M6IHtcbiAgICAgICAgICBzY2hlbWE6IFwicGFja2FnZXMvZnVuY3Rpb25zL3NyYy9ncmFwaHFsL3NjaGVtYS50c1wiLFxuICAgICAgICAgIG91dHB1dDogXCJwYWNrYWdlcy9ncmFwaHFsL3NjaGVtYS5ncmFwaHFsXCIsXG4gICAgICAgICAgY29tbWFuZHM6IFtcbiAgICAgICAgICAgIFwiY2QgcGFja2FnZXMvZ3JhcGhxbCAmJiBucHggQGdlbnFsL2NsaSAtLW91dHB1dCAuL2dlbnFsIC0tc2NoZW1hIC4vc2NoZW1hLmdyYXBocWwgLS1lc21cIixcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcblxuICBzdGFjay5hZGRPdXRwdXRzKHtcbiAgICBBUElfVVJMOiBhcGkudXJsLFxuICB9KTtcblxuICByZXR1cm4gYXBpO1xufVxuIiwgImltcG9ydCB7IFN0YWNrQ29udGV4dCwgVGFibGUgfSBmcm9tIFwic3N0L2NvbnN0cnVjdHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIERhdGFiYXNlKHsgc3RhY2sgfTogU3RhY2tDb250ZXh0KSB7XG4gIGNvbnN0IHRhYmxlID0gbmV3IFRhYmxlKHN0YWNrLCBcInRhYmxlXCIsIHtcbiAgICBmaWVsZHM6IHtcbiAgICAgIHBrOiBcInN0cmluZ1wiLFxuICAgICAgc2s6IFwic3RyaW5nXCIsXG4gICAgICBnc2kxcGs6IFwic3RyaW5nXCIsXG4gICAgICBnc2kxc2s6IFwic3RyaW5nXCIsXG4gICAgICBnc2kycGs6IFwic3RyaW5nXCIsXG4gICAgICBnc2kyc2s6IFwic3RyaW5nXCIsXG4gICAgfSxcbiAgICBwcmltYXJ5SW5kZXg6IHtcbiAgICAgIHBhcnRpdGlvbktleTogXCJwa1wiLFxuICAgICAgc29ydEtleTogXCJza1wiLFxuICAgIH0sXG4gICAgZ2xvYmFsSW5kZXhlczoge1xuICAgICAgZ3NpMToge1xuICAgICAgICBwYXJ0aXRpb25LZXk6IFwiZ3NpMXBrXCIsXG4gICAgICAgIHNvcnRLZXk6IFwiZ3NpMXNrXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuXG4gIC8vIHJlbWVtYmVyIHdoZW4geW91IGFkZCBnbG9iYWwgaW5kZXhlcywgeW91IG5lZWQgdG8gYWRkXG4gIC8vIHRoZW0gdG8gdGhlIHRhYmxlIGZpZWxkc1xuICB0YWJsZS5hZGRHbG9iYWxJbmRleGVzKHtcbiAgICBnc2kyOiB7XG4gICAgICBwYXJ0aXRpb25LZXk6IFwiZ3NpMnBrXCIsXG4gICAgICBzb3J0S2V5OiBcImdzaTJza1wiLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldHVybiB0YWJsZTtcbn1cbiIsICJpbXBvcnQgeyBTdGFja0NvbnRleHQsIHVzZSwgU3RhdGljU2l0ZSB9IGZyb20gXCJzc3QvY29uc3RydWN0c1wiO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSBcIi4vQXBpXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBXZWIoeyBzdGFjayB9OiBTdGFja0NvbnRleHQpIHtcbiAgY29uc3QgYXBpID0gdXNlKEFwaSk7XG5cbiAgY29uc3QgaXNQcm9kdWN0aW9uID0gc3RhY2suc3RhZ2UgPT09IFwicHJvZFwiO1xuICBjb25zdCBkb21haW4gPSB7XG4gICAgY3VzdG9tRG9tYWluOiB7XG4gICAgICBkb21haW5OYW1lOiBcInNldmVuc2luZ2xldGFibGVzLmNvbVwiLFxuICAgICAgZG9tYWluQWxpYXM6IFwid3d3LnNldmVuc2luZ2xldGFibGVzLmNvbVwiLFxuICAgIH0sXG4gIH07XG5cbiAgY29uc3Qgc2l0ZSA9IG5ldyBTdGF0aWNTaXRlKHN0YWNrLCBcInNpdGVcIiwge1xuICAgIC4uLihpc1Byb2R1Y3Rpb24gPyBkb21haW4gOiB7fSksXG4gICAgcGF0aDogXCJ3ZWJcIixcbiAgICBidWlsZENvbW1hbmQ6IFwieWFybiBidWlsZFwiLFxuICAgIGJ1aWxkT3V0cHV0OiBcImRpc3RcIixcbiAgICBlbnZpcm9ubWVudDoge1xuICAgICAgVklURV9HUkFQSFFMX1VSTDogYXBpLnVybCArIFwiL2dyYXBocWxcIixcbiAgICAgIFZJVEVfT01HOiBcIllPTE9cIixcbiAgICB9LFxuICAgIHZpdGU6IHtcbiAgICAgIHR5cGVzOiBcInR5cGVzL215LWVudi5kLnRzXCIsXG4gICAgfSxcbiAgfSk7XG5cbiAgc3RhY2suYWRkT3V0cHV0cyh7XG4gICAgU0lURTogc2l0ZS51cmwgfHwgXCJodHRwczovL2xvY2FsaG9zdDozMDAwXCIsXG4gICAgVklURV9HUkFQSFFMX1VSTDogYXBpLnVybCArIFwiL2dyYXBocWxcIixcbiAgfSk7XG5cbiAgcmV0dXJuIGFwaTtcbn1cbiIsICJpbXBvcnQgeyBTU1RDb25maWcgfSBmcm9tIFwic3N0XCI7XG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwiLi9zdGFja3MvQXBpXCI7XG5pbXBvcnQgeyBEYXRhYmFzZSB9IGZyb20gXCIuL3N0YWNrcy9EYXRhYmFzZVwiO1xuaW1wb3J0IHsgV2ViIH0gZnJvbSBcIi4vc3RhY2tzL1dlYlwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZyhfaW5wdXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogXCJzZXZlbi1zaW5nbGUtdGFibGVzXCIsXG4gICAgICByZWdpb246IFwidXMtZWFzdC0xXCIsXG4gICAgfTtcbiAgfSxcbiAgc3RhY2tzKGFwcDogQXBwKSB7XG4gICAgYXBwLnNldERlZmF1bHRGdW5jdGlvblByb3BzKHtcbiAgICAgIHJ1bnRpbWU6IFwibm9kZWpzMTYueFwiLFxuICAgICAgc3JjUGF0aDogXCJzZXJ2aWNlc1wiLFxuICAgIH0pO1xuICAgIC8vIFJlbW92ZSBhbGwgcmVzb3VyY2VzIHdoZW4gdGhlIGRldiBzdGFnZSBpcyByZW1vdmVkXG4gICAgaWYgKGFwcC5zdGFnZSAhPT0gXCJwcm9kXCIpIHtcbiAgICAgIGFwcC5zZXREZWZhdWx0UmVtb3ZhbFBvbGljeShcImRlc3Ryb3lcIik7XG4gICAgfVxuICAgIGFwcC5zdGFjayhEYXRhYmFzZSkuc3RhY2soQXBpKS5zdGFjayhXZWIpO1xuICB9LFxufSBzYXRpc2ZpZXMgU1NUQ29uZmlnO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7QUFBQSxTQUF1QixLQUFLLE9BQU8sa0JBQWtCOzs7QUNBckQsU0FBdUIsYUFBYTtBQUU3QixTQUFTLFNBQVMsRUFBRSxNQUFNLEdBQWlCO0FBQ2hELFFBQU0sUUFBUSxJQUFJLE1BQU0sT0FBTyxTQUFTO0FBQUEsSUFDdEMsUUFBUTtBQUFBLE1BQ04sSUFBSTtBQUFB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
