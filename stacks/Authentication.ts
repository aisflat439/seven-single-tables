import { Auth, StackContext } from "sst/constructs";

export function Authentication({ stack }: StackContext) {
  const auth = new Auth(stack, "auth", {
    authenticator: {
      handler: "packages/functions/src/auth/authenticator.handler",
    },
  });

  return auth;
}
