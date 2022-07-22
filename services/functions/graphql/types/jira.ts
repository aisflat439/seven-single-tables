import { Jira } from "@seven-single-tables/core/jira";
import { builder } from "../builder";

const TeamType = builder.objectRef<Jira.TeamEntityType>("Team").implement({
  fields: (t) => ({
    id: t.exposeID("teamId"),
    name: t.exposeID("name"),
  }),
});
const TicketType = builder
  .objectRef<Jira.TicketEntityType>("Ticket")
  .implement({
    fields: (t) => ({
      id: t.exposeID("ticketId"),
      title: t.exposeID("title"),
      teamId: t.exposeID("teamId"),
    }),
  });

builder.queryFields((t) => ({
  teams: t.field({
    type: [TeamType],
    resolve: () => Jira.listTeams(),
  }),
  tickets: t.field({
    type: [TicketType],
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (_, args) => Jira.listTickets(args.id),
  }),
}));

builder.mutationFields((t) => ({
  createTeam: t.field({
    type: TeamType,
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => Jira.createTeam(args.name),
  }),
  create: t.field({
    type: TicketType,
    args: {
      title: t.arg.string({ required: true }),
      teamId: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => Jira.create(args.title, args.teamId),
  }),
}));
