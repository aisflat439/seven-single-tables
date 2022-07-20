import { Ticket } from "@seven-single-tables/core/ticket";
import { builder } from "../builder";

const TeamType = builder.objectRef<Ticket.TeamEntityType>("Team").implement({
  fields: (t) => ({
    id: t.exposeID("teamId"),
    name: t.exposeID("name"),
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
}));
