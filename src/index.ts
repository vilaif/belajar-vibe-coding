import { Elysia } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";
import { usersRoute } from "./routes/users.route";

const app = new Elysia()
  .use(usersRoute)
  .get("/", async () => {
    try {
      const allUsers = await db.select().from(users);
      return {
        status: "success",
        message: "Connected to MySQL via Drizzle ORM!",
        data: allUsers,
      };
    } catch (error) {
      return {
        status: "error",
        message: "Failed to connect to database. Ensure MySQL is running and the database exists.",
        error: String(error),
      };
    }
  })
  .listen(3000);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
