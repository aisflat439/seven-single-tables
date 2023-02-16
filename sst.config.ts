import { SSTConfig } from "sst";
import { Api } from "./stacks/Api";
import { Database } from "./stacks/Database";
import { Web } from "./stacks/Web";

export default {
  config(_input) {
    return {
      name: "seven-single-tables",
      region: "us-east-1",
    };
  },
  stacks(app) {
    // Remove all resources when the dev stage is removed
    if (app.stage !== "prod") {
      app.setDefaultRemovalPolicy("destroy");
    }
    app.stack(Database).stack(Api).stack(Web);
  },
} satisfies SSTConfig;
