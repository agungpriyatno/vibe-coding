import { Elysia } from "elysia";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/users", async () => {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      console.error(error);
      return { error: "Failed to fetch users" };
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
