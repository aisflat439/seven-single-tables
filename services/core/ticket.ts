export * as Ticket from "./ticket";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const TeamEntity = new Entity( 
    {
        model: {
          version: "1",
          entity: "Team",
          service: "myapp",
        },
        attributes: {
          teamId: {
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
              composite: ["name"]
            }
          }
        }
      },
      Dynamo.Configuration
    )

// export const TicketEntity = new Entity(
//   {
//     model: {
//       version: "1",
//       entity: "Ticket",
//       service: "scratch",
//     },
//     attributes: {
//       ticketID: {
//         type: "string",
//         required: true,
//         readOnly: true,
//       },
//       title: {
//         type: "string",
//         required: true,
//       },
//       url: {
//         type: "string",
//         required: true,
//       },
//     },
//     indexes: {
//       primary: {
//         pk: {
//           field: "pk",
//           composite: [],
//         },
//         sk: {
//           field: "sk",
//           composite: ["ticketID"],
//         },
//       },
//     },
//   },
//   Dynamo.Configuration
// );

// export type TicketEntityType = EntityItem<typeof TicketEntity>;
export type TeamEntityType = EntityItem<typeof TeamEntity>;

export async function createTeam(name: string) {
  return TeamEntity.create({
    name,
    teamId: ulid(),
  }).go()
}

export async function listTeams() {
  return TeamEntity.query.primary({}).go();
}

// export function create(title: string, url: string) {
//   return TicketEntity.create({
//     ticketID: ulid(),
//     title,
//     url,
//   }).go();
// }

// export async function list() {
//   return TicketEntity.query.primary({}).go();
// }

