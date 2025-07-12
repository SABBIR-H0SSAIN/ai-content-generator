import { config } from "@/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schemas";

export const pool = new Pool({
  connectionString: config.db.url,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 10,
});

export const db = drizzle(pool, { schema });
