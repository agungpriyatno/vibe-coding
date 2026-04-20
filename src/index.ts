import { Elysia } from "elysia";
import { auth } from "./lib/auth";

const app = new Elysia()
  // Mount Better Auth handler
  .all("/api/v1/auth/*", (ctx) => auth.handler(ctx.request))
  
  .get("/", () => "Hello Elysia")
  
  // Example of a protected route using Better Auth API
  .get("/api/v1/auth/profile", async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return { error: "Unauthorized" };
    }
    return {
      user: session.user,
      session: session.session,
    };
  })
  
  // Example of edit profile (Better Auth handles this via /api/v1/auth/update-user)
  // but we can add a wrapper if needed.
  
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
