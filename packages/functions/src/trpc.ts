import { initTRPC } from "@trpc/server";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

import { z } from "zod";
import {
  create,
  createTeam,
  deleteTeam,
  listTeams,
  listTickets,
  updateStatus,
  Statuses,
} from "@seven-single-tables/core/src/jira";
import {
  comment,
  create as createPost,
  createRedditor,
  getComments,
  getPostersComments,
  getPosts,
  getSinglePost,
  listPosts,
  listRedditors,
} from "@seven-single-tables/core/src/reddit";

export const t = initTRPC.create();

const appRouter = t.router({
  create: t.procedure
    .input(z.object({ redditorID: z.string(), post: z.string() }))
    .mutation(async ({ input }) => {
      return await createPost(input.redditorID, input.post);
    }),
  createComment: t.procedure
    .input(
      z.object({
        redditorID: z.string(),
        postID: z.string(),
        comment: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await comment(input.comment, input.postID, input.redditorID);
    }),
  createRedditor: t.procedure.input(z.string()).mutation(async ({ input }) => {
    return await createRedditor(input);
  }),
  listRedditors: t.procedure.query(async () => {
    return await listRedditors();
  }),
  list: t.procedure.query(async () => {
    return await listPosts();
  }),
  getPostsByPoster: t.procedure.input(z.string()).query(async ({ input }) => {
    return await getPosts(input);
  }),
  getCommentsByPoster: t.procedure
    .input(z.string())
    .query(async ({ input }) => {
      return await getPostersComments(input);
    }),
  getCommentsByPost: t.procedure.input(z.string()).query(async ({ input }) => {
    return await getComments(input);
  }),
  getPostsForComment: t.procedure.input(z.string()).query(async ({ input }) => {
    return await getSinglePost(input);
  }),
  createTeam: t.procedure.input(z.string()).mutation(async ({ input }) => {
    return await createTeam(input);
  }),
  createTicket: t.procedure
    .input(
      z.object({
        title: z.string(),
        teamId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await create(input.title, input.teamId);
    }),
  deleteTeam: t.procedure.input(z.string()).mutation(async ({ input }) => {
    return await deleteTeam(input);
  }),
  listTeams: t.procedure.query(async () => {
    return await listTeams();
  }),
  listTickets: t.procedure.input(z.string()).query(async ({ input }) => {
    return await listTickets(input);
  }),
  updateStatus: t.procedure
    .input(
      z.object({
        teamId: z.string(),
        ticketId: z.string(),
        status: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await updateStatus(
        input.teamId,
        input.ticketId,
        input.status as Statuses
      );
    }),
});

// export type definition of API
export type Router = typeof appRouter;

export const handler = awsLambdaRequestHandler({
  router: appRouter,
});
