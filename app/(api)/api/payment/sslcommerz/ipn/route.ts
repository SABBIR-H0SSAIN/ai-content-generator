import {
  addCredit,
  getPaymentHistoryByTransactionId,
  updatePaymentStatus,
} from "@/lib/db";
import { validatePayment } from "@/lib/sslcommerz";
import { NextRequest, NextResponse } from "next/server";

type PaymentStatusType =
  | "VALID"
  | "FAILED"
  | "CANCELLED"
  | "UNATTEMPTED"
  | "EXPIRED";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const txnId = formData.get("tran_id") as string;
    const val_id = formData.get("val_id") as string;
    const amount = formData.get("amount") as number | null;
    const status = formData.get("status") as PaymentStatusType;

    if (!amount || !txnId || !status || (status === "VALID" && !val_id)) {
      return NextResponse.json({ message: "failed" }, { status: 400 });
    }

    const historyData = await getPaymentHistoryByTransactionId(txnId);
    if (!historyData) {
      return NextResponse.json({ message: "failed" }, { status: 400 });
    }

    if (status === "VALID") {
      const validation = await validatePayment(val_id);

      if (
        !historyData ||
        !validation ||
        validation.amount != amount ||
        historyData.amount != amount ||
        historyData.val_id ||
        validation?.tran_id !== txnId ||
        historyData?.txnId !== txnId ||
        validation?.val_id !== val_id ||
        validation?.status !== "VALID" ||
        historyData?.status === "successful"
      ) {
        return NextResponse.json({ message: "failed" }, { status: 400 });
      }

      await updatePaymentStatus(historyData.txnId, "successful", val_id);
      const userId = historyData.userID;
      await addCredit(userId, historyData.creadit_amount);
    } else if (status == "FAILED") {
      await updatePaymentStatus(historyData.txnId, "failed", val_id);
    } else {
      await updatePaymentStatus(historyData.txnId, "canceled", val_id);
    }
    return NextResponse.json({ message: "successful" });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
