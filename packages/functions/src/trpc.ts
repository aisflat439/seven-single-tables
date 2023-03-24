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
  createRedditor,
  listPosts,
  listRedditors,
} from "@seven-single-tables/core/src/reddit";

export const t = initTRPC.create();

const appRouter = t.router({
  createRedditor: t.procedure.input(z.string()).mutation(async ({ input }) => {
    return await createRedditor(input);
  }),
  listRedditors: t.procedure.query(async () => {
    return await listRedditors();
  }),
  // createPost: t.procedure.input(z.string()).mutation(async ({ input }) => {
  //   return await create(input);
  // }),
  listPosts: t.procedure.query(async () => {
    return await listPosts();
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
