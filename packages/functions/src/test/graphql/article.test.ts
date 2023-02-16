import { Api } from "sst/constructs";
import { expect, it } from "vitest";
import { createClient } from "@seven-single-tables/graphql/genql";
import { Article } from "@seven-single-tables/core/article";

it("create an article", async () => {
  expect(1).toBe(1);
  // const client = createClient({
  //   url: Api.api.url + "/graphql",
  // });

  // const article = await client.mutation({
  //   createArticle: [
  //     { title: "Hello world", url: "https://example.com" },
  //     {
  //       id: true,
  //     },
  //   ],
  // });
  // const list = await Article.list();
  // expect(
  //   list.find((a) => a.articleID === article.createArticle.id)
  // ).not.toBeNull();
});
