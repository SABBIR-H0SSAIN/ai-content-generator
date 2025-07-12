import { defineConfig } from "drizzle-kit";
import { config } from "./config";

if (!config.db.url) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  schema: "./db/schemas",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: config.db.url,
  },
  verbose: true,
  strict: true,
  migrations: {
    table: "drizzle_migrations",
  },
});
