import { Jira } from "@seven-single-tables/core/jira";
import { builder } from "../builder";

const TeamType = builder.objectRef<Jira.TeamEntityType>("Team").implement({
  fields: (t) => ({
    id: t.exposeID("teamId"),
    name: t.exposeID("name"),
  }),
});

const TicketType = builder
  // the parenthesis ("Ticket") is what appears in the
  // graphql Docs as the type Ticket!
  .objectRef<Jira.TicketEntityType>("Ticket")
  .implement({
    fields: (t) => ({
      ticketId: t.exposeID("ticketId"),
      title: t.exposeID("title"),
      teamId: t.exposeID("teamId"),
      status: t.exposeID("status"),
    }),
  });

const ValidStatuses = builder.enumType("ValidStatuses", {
  values: ["pending", "blocked", "inprogress", "complete"],
});

builder.queryFields((t) => ({
  teams: t.field({
    type: [TeamType],
    resolve: async () => await Jira.listTeams(),
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
  updateStatus: t.field({
    type: TicketType,
    args: {
      teamId: t.arg.string({ required: true }),
      ticketId: t.arg.string({ required: true }),
      status: t.arg({
        required: true,
        type: ValidStatuses,
      }),
    },
    resolve: async (_, args) =>
      //@ts-ignore
      Jira.updateStatus(args.teamId, args.ticketId, args.status),
  }),
}));
