import { Ticket } from "@seven-single-tables/core/ticket";
import { builder } from "../builder";

const TeamType = builder.objectRef<Ticket.TeamEntityType>("Team").implement({
  fields: (t) => ({
    id: t.exposeID("teamId"),
    name: t.exposeID("name"),
  }),
});
const TicketType = builder
  .objectRef<Ticket.TicketEntityType>("Ticket")
  .implement({
    fields: (t) => ({
      id: t.exposeID("ticketId"),
      title: t.exposeID("title"),
      team: t.exposeID("teamId"),
    }),
  });

builder.queryFields((t) => ({
  teams: t.field({
    type: [TeamType],
    resolve: () => Ticket.listTeams(),
  }),
}));

builder.mutationFields((t) => ({
  createTeam: t.field({
    type: TeamType,
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => Ticket.createTeam(args.name),
  }),
  create: t.field({
    type: TicketType,
    args: {
      title: t.arg.string({ required: true }),
      teamId: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => Ticket.create(args.title, args.teamId),
  }),
}));
