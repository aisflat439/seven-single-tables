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
      "GET /trpc/{proxy+}": "packages/functions/src/trpc.handler",
      "POST /trpc/{proxy+}": "packages/functions/src/trpc.handler"
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
    ...isProduction && domain,
    path: "packages/web",
    buildCommand: "npm run build",
    buildOutput: "dist",
    environment: {
      VITE_API_URL: api.url
    }
  });
  stack.addOutputs({
    SITE: site.url || "https://localhost:3000",
    VITE_API_URL: api.url
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
    if (app.stage !== "prod") {
      app.setDefaultRemovalPolicy("destroy");
    }
    app.stack(Database).stack(Api).stack(Web);
  }
};
export {
  sst_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RhY2tzL0FwaS50cyIsICJzdGFja3MvRGF0YWJhc2UudHMiLCAic3RhY2tzL1dlYi50cyIsICJzc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBTdGFja0NvbnRleHQsIHVzZSwgQXBpIGFzIEFwaUdhdGV3YXkgfSBmcm9tIFwic3N0L2NvbnN0cnVjdHNcIjtcbmltcG9ydCB7IERhdGFiYXNlIH0gZnJvbSBcIi4vRGF0YWJhc2VcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIEFwaSh7IHN0YWNrIH06IFN0YWNrQ29udGV4dCkge1xuICBjb25zdCBkYiA9IHVzZShEYXRhYmFzZSk7XG5cbiAgY29uc3QgYXBpID0gbmV3IEFwaUdhdGV3YXkoc3RhY2ssIFwiYXBpXCIsIHtcbiAgICBjdXN0b21Eb21haW46XG4gICAgICBzdGFjay5zdGFnZSA9PT0gXCJwcm9kXCIgPyBcImFwaS5zZXZlbnNpbmdsZXRhYmxlcy5jb21cIiA6IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0czoge1xuICAgICAgZnVuY3Rpb246IHtcbiAgICAgICAgYmluZDogW2RiXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICByb3V0ZXM6IHtcbiAgICAgIFwiR0VUIC90cnBjL3twcm94eSt9XCI6IFwicGFja2FnZXMvZnVuY3Rpb25zL3NyYy90cnBjLmhhbmRsZXJcIixcbiAgICAgIFwiUE9TVCAvdHJwYy97cHJveHkrfVwiOiBcInBhY2thZ2VzL2Z1bmN0aW9ucy9zcmMvdHJwYy5oYW5kbGVyXCIsXG4gICAgfSxcbiAgfSk7XG5cbiAgc3RhY2suYWRkT3V0cHV0cyh7XG4gICAgQVBJX1VSTDogYXBpLnVybCxcbiAgfSk7XG5cbiAgcmV0dXJuIGFwaTtcbn1cbiIsICJpbXBvcnQgeyBTdGFja0NvbnRleHQsIFRhYmxlIH0gZnJvbSBcInNzdC9jb25zdHJ1Y3RzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBEYXRhYmFzZSh7IHN0YWNrIH06IFN0YWNrQ29udGV4dCkge1xuICBjb25zdCB0YWJsZSA9IG5ldyBUYWJsZShzdGFjaywgXCJ0YWJsZVwiLCB7XG4gICAgZmllbGRzOiB7XG4gICAgICBwazogXCJzdHJpbmdcIixcbiAgICAgIHNrOiBcInN0cmluZ1wiLFxuICAgICAgZ3NpMXBrOiBcInN0cmluZ1wiLFxuICAgICAgZ3NpMXNrOiBcInN0cmluZ1wiLFxuICAgICAgZ3NpMnBrOiBcInN0cmluZ1wiLFxuICAgICAgZ3NpMnNrOiBcInN0cmluZ1wiLFxuICAgIH0sXG4gICAgcHJpbWFyeUluZGV4OiB7XG4gICAgICBwYXJ0aXRpb25LZXk6IFwicGtcIixcbiAgICAgIHNvcnRLZXk6IFwic2tcIixcbiAgICB9LFxuICAgIGdsb2JhbEluZGV4ZXM6IHtcbiAgICAgIGdzaTE6IHtcbiAgICAgICAgcGFydGl0aW9uS2V5OiBcImdzaTFwa1wiLFxuICAgICAgICBzb3J0S2V5OiBcImdzaTFza1wiLFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcblxuICAvLyByZW1lbWJlciB3aGVuIHlvdSBhZGQgZ2xvYmFsIGluZGV4ZXMsIHlvdSBuZWVkIHRvIGFkZFxuICAvLyB0aGVtIHRvIHRoZSB0YWJsZSBmaWVsZHNcbiAgdGFibGUuYWRkR2xvYmFsSW5kZXhlcyh7XG4gICAgZ3NpMjoge1xuICAgICAgcGFydGl0aW9uS2V5OiBcImdzaTJwa1wiLFxuICAgICAgc29ydEtleTogXCJnc2kyc2tcIixcbiAgICB9LFxuICB9KTtcblxuICByZXR1cm4gdGFibGU7XG59XG4iLCAiaW1wb3J0IHsgU3RhY2tDb250ZXh0LCB1c2UsIFN0YXRpY1NpdGUgfSBmcm9tIFwic3N0L2NvbnN0cnVjdHNcIjtcbmltcG9ydCB7IEFwaSB9IGZyb20gXCIuL0FwaVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gV2ViKHsgc3RhY2sgfTogU3RhY2tDb250ZXh0KSB7XG4gIGNvbnN0IGFwaSA9IHVzZShBcGkpO1xuXG4gIGNvbnN0IGlzUHJvZHVjdGlvbiA9IHN0YWNrLnN0YWdlID09PSBcInByb2RcIjtcbiAgY29uc3QgZG9tYWluID0ge1xuICAgIGN1c3RvbURvbWFpbjoge1xuICAgICAgZG9tYWluTmFtZTogXCJzZXZlbnNpbmdsZXRhYmxlcy5jb21cIixcbiAgICAgIGRvbWFpbkFsaWFzOiBcInd3dy5zZXZlbnNpbmdsZXRhYmxlcy5jb21cIixcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IHNpdGUgPSBuZXcgU3RhdGljU2l0ZShzdGFjaywgXCJzaXRlXCIsIHtcbiAgICAuLi4oaXNQcm9kdWN0aW9uICYmIGRvbWFpbiksXG4gICAgcGF0aDogXCJwYWNrYWdlcy93ZWJcIixcbiAgICBidWlsZENvbW1hbmQ6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIGJ1aWxkT3V0cHV0OiBcImRpc3RcIixcbiAgICBlbnZpcm9ubWVudDoge1xuICAgICAgVklURV9BUElfVVJMOiBhcGkudXJsLFxuICAgIH0sXG4gIH0pO1xuXG4gIHN0YWNrLmFkZE91dHB1dHMoe1xuICAgIFNJVEU6IHNpdGUudXJsIHx8IFwiaHR0cHM6Ly9sb2NhbGhvc3Q6MzAwMFwiLFxuICAgIFZJVEVfQVBJX1VSTDogYXBpLnVybCxcbiAgfSk7XG5cbiAgcmV0dXJuIGFwaTtcbn1cbiIsICJpbXBvcnQgeyBTU1RDb25maWcgfSBmcm9tIFwic3N0XCI7XG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwiLi9zdGFja3MvQXBpXCI7XG5pbXBvcnQgeyBEYXRhYmFzZSB9IGZyb20gXCIuL3N0YWNrcy9EYXRhYmFzZVwiO1xuaW1wb3J0IHsgV2ViIH0gZnJvbSBcIi4vc3RhY2tzL1dlYlwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZyhfaW5wdXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogXCJzZXZlbi1zaW5nbGUtdGFibGVzXCIsXG4gICAgICByZWdpb246IFwidXMtZWFzdC0xXCIsXG4gICAgfTtcbiAgfSxcbiAgc3RhY2tzKGFwcCkge1xuICAgIC8vIFJlbW92ZSBhbGwgcmVzb3VyY2VzIHdoZW4gdGhlIGRldiBzdGFnZSBpcyByZW1vdmVkXG4gICAgaWYgKGFwcC5zdGFnZSAhPT0gXCJwcm9kXCIpIHtcbiAgICAgIGFwcC5zZXREZWZhdWx0UmVtb3ZhbFBvbGljeShcImRlc3Ryb3lcIik7XG4gICAgfVxuICAgIGFwcC5zdGFjayhEYXRhYmFzZSkuc3RhY2soQXBpKS5zdGFjayhXZWIpO1xuICB9LFxufSBzYXRpc2ZpZXMgU1NUQ29uZmlnO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7QUFBQSxTQUF1QixLQUFLLE9BQU8sa0JBQWtCOzs7QUNBckQsU0FBdUIsYUFBYTtBQUU3QixTQUFTLFNBQVMsRUFBRSxNQUFNLEdBQWlCO0FBQ2hELFFBQU0sUUFBUSxJQUFJLE1BQU0sT0FBTyxTQUFTO0FBQUEsSUFDdEMsUUFBUTtBQUFBLE1BQ04sSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNaLGNBQWM7QUFBQSxNQUNkLFNBQVM7QUFBQSxJQUNYO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixNQUFNO0FBQUEsUUFDSixjQUFjO0FBQUEsUUFDZCxTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFJRCxRQUFNLGlCQUFpQjtBQUFBLElBQ3JCLE1BQU07QUFBQSxNQUNKLGNBQWM7QUFBQSxNQUNkLFNBQVM7QUFBQSxJQUNYO0FBQUEsRUFDRixDQUFDO0FBRUQsU0FBTztBQUNUO0FBaENnQjs7O0FEQ1QsU0FBUyxJQUFJLEVBQUUsTUFBTSxHQUFpQjtBQUMzQyxRQUFNLEtBQUssSUFBSSxRQUFRO0FBRXZCLFFBQU0sTUFBTSxJQUFJLFdBQVcsT0FBTyxPQUFPO0FBQUEsSUFDdkMsY0FDRSxNQUFNLFVBQVUsU0FBUyw4QkFBOEI7QUFBQSxJQUN6RCxVQUFVO0FBQUEsTUFDUixVQUFVO0FBQUEsUUFDUixNQUFNLENBQUMsRUFBRTtBQUFBLE1BQ1g7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixzQkFBc0I7QUFBQSxNQUN0Qix1QkFBdUI7QUFBQSxJQUN6QjtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sV0FBVztBQUFBLElBQ2YsU0FBUyxJQUFJO0FBQUEsRUFDZixDQUFDO0FBRUQsU0FBTztBQUNUO0FBdEJnQjs7O0FFSGhCLFNBQXVCLE9BQUFBLE1BQUssa0JBQWtCO0FBR3ZDLFNBQVMsSUFBSSxFQUFFLE1BQU0sR0FBaUI7QUFDM0MsUUFBTSxNQUFNQyxLQUFJLEdBQUc7QUFFbkIsUUFBTSxlQUFlLE1BQU0sVUFBVTtBQUNyQyxRQUFNLFNBQVM7QUFBQSxJQUNiLGNBQWM7QUFBQSxNQUNaLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxJQUNmO0FBQUEsRUFDRjtBQUVBLFFBQU0sT0FBTyxJQUFJLFdBQVcsT0FBTyxRQUFRO0FBQUEsSUFDekMsR0FBSSxnQkFBZ0I7QUFBQSxJQUNwQixNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsSUFDZCxhQUFhO0FBQUEsSUFDYixhQUFhO0FBQUEsTUFDWCxjQUFjLElBQUk7QUFBQSxJQUNwQjtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sV0FBVztBQUFBLElBQ2YsTUFBTSxLQUFLLE9BQU87QUFBQSxJQUNsQixjQUFjLElBQUk7QUFBQSxFQUNwQixDQUFDO0FBRUQsU0FBTztBQUNUO0FBM0JnQjs7O0FDRWhCLElBQU8scUJBQVE7QUFBQSxFQUNiLE9BQU8sUUFBUTtBQUNiLFdBQU87QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTyxLQUFLO0FBRVYsUUFBSSxJQUFJLFVBQVUsUUFBUTtBQUN4QixVQUFJLHdCQUF3QixTQUFTO0FBQUEsSUFDdkM7QUFDQSxRQUFJLE1BQU0sUUFBUSxFQUFFLE1BQU0sR0FBRyxFQUFFLE1BQU0sR0FBRztBQUFBLEVBQzFDO0FBQ0Y7IiwKICAibmFtZXMiOiBbInVzZSIsICJ1c2UiXQp9Cg==
