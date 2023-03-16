export * as User from "./user";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { Octokit } from "octokit";

export const UserEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "User",
      service: "user",
    },
    attributes: {
      login: {
        type: "string",
        required: true,
      },
      accessToken: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["login"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
    },
  },
  Dynamo.Configuration
);

export async function login(token: string) {
  const octokit = new Octokit({ auth: token });

  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();

  const user = await UserEntity.get({
    login,
  }).go();

  if (!user.data) {
    await UserEntity.create({
      login,
      accessToken: token,
    }).go();
  } else {
    await UserEntity.patch({
      login,
    })
      .set({ accessToken: token })
      .go();
  }

  return {
    ...user,
    login,
  };
}

export async function byLogin(login: string) {
  return true;
}
