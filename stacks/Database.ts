import { StackContext, Table } from "@serverless-stack/resources";

export function Database({ stack }: StackContext) {
  const table = new Table(stack, "table", {
    fields: {
      pk: "string",
      sk: "string",
      gsi1pk: "string",
      gsi1sk: "string",
      gsi2pk: "string",
      gsi2sk: "string",
    },
    primaryIndex: {
      partitionKey: "pk",
      sortKey: "sk",
    },
    globalIndexes: {
      gsi1: {
        partitionKey: "gsi1pk",
        sortKey: "gsi1sk",
      },
    },
  });

  // remember when you add global indexes, you need to add
  // them to the table fields
  table.addGlobalIndexes({
    gsi2: {
      partitionKey: "gsi2pk",
      sortKey: "gsi2sk",
    },
  });

  return table;
}
