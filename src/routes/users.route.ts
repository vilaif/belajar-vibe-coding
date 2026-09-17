import { Elysia, t } from "elysia";
import { registerUser } from "../services/users.service";

export const usersRoute = new Elysia({ prefix: "/api/users" }).post(
  "/",
  async ({ body, set }) => {
    const result = await registerUser(body);

    if (!result.success) {
      set.status = 400;
      return {
        error: result.error,
      };
    }

    return {
      status: "success",
      data: result.data,
    };
  },
  {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String(),
    }),
  }
);
