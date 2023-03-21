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

  let user = await UserEntity.get({
    login,
  }).go();

  if (!user.data) {
    let newUser = await UserEntity.create({
      login,
      accessToken: token,
    }).go();

    user = newUser;
  } else {
    await UserEntity.patch({
      login,
    })
      .set({ accessToken: token })
      .go();
  }

  return {
    ...user,
    token,
  };
}

export async function byLogin(login: string) {
  return true;
}
