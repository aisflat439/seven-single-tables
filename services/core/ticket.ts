export * as Ticket from "./ticket";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const TeamEntity = new Entity( 
    {
        model: {
          version: "1",
          entity: "Team",
          service: "tickets",
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
          primary: {
            pk:{
              field: "pk",
              composite: []
            },
            sk: {
              field: "sk",
              composite: ["profile", "name"]
            }
          },
        }
      },
      Dynamo.Configuration
    )

export const TicketEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Ticket",
      service: "tickets",
    },
    attributes: {
      ticketId: {
        type: "string",
        required: true,
        readOnly: true,
      },
      title: {
        type: "string",
        required: true,
      },
      teamId: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: [],
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

// export type TicketEntityType = EntityItem<typeof TicketEntity>;
export type TeamEntityType = EntityItem<typeof TeamEntity>;

export async function createTeam(name: string) {
  return TeamEntity.create({
    name,
    profile: "profile",
    teamId: ulid(),
  }).go()
}

export async function listTeams() {
  return TeamEntity.query.primary({}).begins({profile: 'profile'}).go();
}

export function create(title: string, teamId: string) {
  return TicketEntity.create({
    ticketId: ulid(),
    title,
    teamId
  }).go();
}

// export async function list() {
//   return TicketEntity.query.primary({}).go();
// }

