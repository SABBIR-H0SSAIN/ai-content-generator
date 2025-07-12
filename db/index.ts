import { config } from "@/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schemas";

export const db = drizzle(config.db.url, { schema });
