import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export * as Jira from "./jira";

export const TeamEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Team",
      service: "jira",
    },
    attributes: {
      teamId: {
        type: "string",
        required: true,
        readOnly: true,
      },
      profile: {
        type: "string",
        required: true,
        readOnly: true,
      },
      name: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      teams: {
        collection: "jira",
        pk: {
          field: "pk",
          composite: [],
        },
        sk: {
          field: "sk",
          composite: ["name"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export const TicketEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Ticket",
      service: "jira",
    },
    attributes: {
      ticketId: {
        type: "string",
        required: true,
        readOnly: true,
      },
      status: {
        type: ["pending", "blocked", "inprogress", "complete"] as const,
        required: true,
      },
      title: {
        type: "string",
        required: true,
      },
      teamId: {
        type: "string",
        required: true,
        readOnly: true,
      },
    },
    indexes: {
      tickets: {
        collection: "jira",
        pk: {
          field: "pk",
          composite: ["teamId"],
        },
        sk: {
          field: "sk",
          composite: ["ticketId"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export type TicketEntityType = EntityItem<typeof TicketEntity>;
export type TeamEntityType = EntityItem<typeof TeamEntity>;

export async function createTeam(name: string) {
  const result = await TeamEntity.create({
    name,
    profile: "profile",
    teamId: ulid(),
  }).go();

  return result.data;
}

export async function listTeams() {
  // const params = TeamEntity.query.teams({}).params()
  // console.log('params: ', params);
  const result = await TeamEntity.query.teams({}).go();

  return result.data;
}

export async function create(title: string, teamId: string) {
  const result = await TicketEntity.create({
    status: "pending",
    teamId,
    ticketId: ulid(),
    title,
  }).go();

  return result.data;
}

export async function listTickets(id: string) {
  const result = await TicketEntity.query.tickets({ teamId: id }).go();

  return result.data;
}

export type Statuses = "pending" | "blocked" | "inprogress" | "complete";

export async function updateStatus(
  teamId: string,
  ticketId: string,
  status: Statuses
) {
  const result = await TicketEntity.update({ ticketId, teamId })
    .set({ status })
    .go();

  return result.data;
}
