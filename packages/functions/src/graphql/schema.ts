import { builder } from "./builder";

import "./types/jira";
import "./types/orders";
import "./types/reddit"; // in order to build your schema, you need to import the types you want to use. This is obvious and easy to forget!

export const schema = builder.toSchema({});
