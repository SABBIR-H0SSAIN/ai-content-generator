import { db } from "@/db";
import { contentHistorySchema, templateSchema } from "@/db/schemas";
import { sql } from "drizzle-orm";
import { getCreaditsBalance } from "./creadits";

type UserStatsResult = {
  totalTemplates: number;
  totalContent: number;
  totalCredits: number;
};

export const userStats = async (userId: string) => {
  const result = await db.execute(sql`
    SELECT
      (SELECT count(*) FROM ${templateSchema} WHERE ${templateSchema.userID} = ${userId}) AS "totalTemplates",
      (SELECT count(*) FROM ${contentHistorySchema} WHERE ${contentHistorySchema.userID} = ${userId}) AS "totalContent"
  `);

  const stats = result.rows[0] as UserStatsResult | undefined;

  const totalTemplates = stats?.totalTemplates || 0;
  const totalContent = stats?.totalContent || 0;
  const totalCredits = (await getCreaditsBalance(userId)).balance_spent;

  return {
    totalTemplates,
    totalContent,
    totalCredits,
  };
};
