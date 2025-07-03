import { PAYMENT_HISTORY_TABLE_PAGINATION_LIMIT } from "@/constants";
import { db } from "@/db";
import { paymentHistorySchema } from "@/db/schemas";
import { desc, eq } from "drizzle-orm";

export const addPaymentHistory = async (
  userId: string,
  amount: number,
  creadit_amount: number
) => {
  try {
    const paymentObject = await db
      .insert(paymentHistorySchema)
      .values({
        userID: userId,
        amount,
        creadit_amount,
        status: "pending",
      })
      .returning();
    if (paymentObject.length === 0) {
      return null;
    }
    return paymentObject[0];
  } catch (err) {
    console.error(err);
    return null;
  }
};

export interface UserPaymentHistoryType {
  id: string;
  amount: number;
  creadit_amount: number;
  status: "successful" | "pending" | "failed" | "canceled";
  created_at: Date;
  txnId: string;
}

export const getUserPaymentHistory = async (
  userId: string,
  {
    limit = PAYMENT_HISTORY_TABLE_PAGINATION_LIMIT,
    offset = 0,
  }: {
    limit?: number;
    offset?: number;
  }
): Promise<UserPaymentHistoryType[]> => {
  try {
    const paymentHistory = await db.query.paymentHistorySchema.findMany({
      columns: {
        id: true,
        amount: true,
        creadit_amount: true,
        status: true,
        created_at: true,
        txnId: true,
      },
      where: eq(paymentHistorySchema.userID, userId),
      orderBy: [desc(paymentHistorySchema.created_at)],
      limit,
      offset,
    });
    return paymentHistory;
  } catch {
    return [];
  }
};

export const getPaymentHistoryByTransactionId = async (txnId: string) => {
  try {
    const paymentHistory = await db.query.paymentHistorySchema.findFirst({
      where: eq(paymentHistorySchema.txnId, txnId),
    });

    return paymentHistory;
  } catch (err) {
    console.error(err);
    return null;
  }
};

type PaymentStatusType = "successful" | "pending" | "failed" | "canceled";

export const updatePaymentStatus = async (
  txnId: string,
  status: PaymentStatusType,
  val_id: string | null = null
) => {
  try {
    const data = {
      status,
      val_id,
    };

    const paymentHistory = await db
      .update(paymentHistorySchema)
      .set(data)
      .where(eq(paymentHistorySchema.txnId, txnId));
    return paymentHistory;
  } catch (err) {
    console.error(err);
    return null;
  }
};
