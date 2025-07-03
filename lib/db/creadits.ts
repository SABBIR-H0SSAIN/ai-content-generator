import { db } from "@/db";
import { creaditSchema } from "@/db/schemas";
import { and, eq, sql } from "drizzle-orm";

export const getCreaditsBalance = async (
  userID: string
): Promise<typeof creaditSchema.$inferSelect> => {
  let data = await db.query.creaditSchema.findFirst({
    where: eq(creaditSchema.userID, userID),
  });
  if (!data) {
    const newData = await db
      .insert(creaditSchema)
      .values({ userID, balance: 15 })
      .returning();
    data = newData[0];
  }
  return data as typeof creaditSchema.$inferSelect;
};

export const deductCreditOnGenerate = async (
  userID: string,
  amount: number = 1
) => {
  try {
    const updated = await db
      .update(creaditSchema)
      .set({
        balance: sql`${creaditSchema.balance} - ${amount}`,
        balance_spent: sql`${creaditSchema.balance_spent} + ${amount}`,
        updated_at: new Date(),
      })
      .where(
        and(
          eq(creaditSchema.userID, userID),
          sql`${creaditSchema.balance}-${amount} >= 0`
        )
      )
      .returning();

    if (updated.length === 0) {
      return null;
    }

    return updated[0];
  } catch {
    return null;
  }
};

export const addCredit = async (userID: string, amount: number) => {
  try {
    const updated = await db
      .update(creaditSchema)
      .set({
        balance: sql`${creaditSchema.balance} + ${amount}`,
        updated_at: new Date(),
      })
      .where(eq(creaditSchema.userID, userID))
      .returning();

    return updated[0];
  } catch {
    return null;
  }
};
