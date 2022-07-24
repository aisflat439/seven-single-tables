import { Reddit } from "@seven-single-tables/core/reddit";
import { builder } from "../builder";

const CommentType = builder
  .objectRef<Reddit.CommentEntityType>("Comment")
  .implement({
    fields: (t) => ({
      postId: t.exposeID("postId"),
      comment: t.exposeID("comment"),
      redditorId: t.exposeID("redditorId"),
    }),
  });

const PostType = builder.objectRef<Reddit.PostEntityType>("Post").implement({
  fields: (t) => ({
    postId: t.exposeID("postId"),
    post: t.exposeID("post"),
    redditorId: t.exposeID("redditorId"),
    comments: t.field({
      type: [CommentType],
      resolve: (post) => Reddit.getComments(post.postId),
    }),
  }),
});

const RedditorType = builder
  .objectRef<Reddit.RedditorEntityType>("Redditor") // remember this is the name in graphql
  .implement({
    fields: (t) => ({
      redditorId: t.exposeID("redditorId"),
      name: t.exposeID("name"),
    }),
  });

builder.queryFields((t) => ({
  redditors: t.field({
    type: [RedditorType],
    resolve: () => Reddit.listRedditors(),
  }),
  getPosts: t.field({
    type: [PostType],
    args: {
      redditorId: t.arg.string({ required: true }),
    },
    resolve: (_, { redditorId }) => Reddit.getPosts(redditorId),
  }),
  getPost: t.field({
    type: PostType,
    args: {
      postId: t.arg.string({ required: true }),
    },
    // @ts-ignore
    resolve: (_, { postId }) => Reddit.getPost(postId),
  }),
}));

builder.mutationFields((t) => ({
  createPost: t.field({
    type: PostType,
    args: {
      redditorId: t.arg.string({ required: true }),
      post: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => Reddit.create(args.redditorId, args.post),
  }),
  createRedditor: t.field({
    type: RedditorType,
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => Reddit.createRedditor(args.name),
  }),
  comment: t.field({
    type: CommentType,
    args: {
      redditorId: t.arg.string({ required: true }),
      comment: t.arg.string({ required: true }),
      postId: t.arg.string({ required: true }),
    },
    resolve: async (_, args) =>
      Reddit.comment(args.comment, args.postId, args.redditorId),
  }),
}));
