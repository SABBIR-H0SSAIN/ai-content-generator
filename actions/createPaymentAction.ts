"use server";
import { config } from "@/config";
import { addPaymentHistory } from "@/lib/db";
import { initPayment } from "@/lib/sslcommerz";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const createPaymentAction = async (
  prevState: any,
  formData: FormData
) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const amount = Number(formData.get("amount"));
  if (!amount) {
    return {
      success: false,
      error: "Please enter a valid amount",
    };
  }

  if (amount < 10) {
    return {
      success: false,
      error: "Amount must be greater than 10",
    };
  }

  const costPerCredit = 2;
  const totalCoast = amount * costPerCredit;

  const paymentObject = await addPaymentHistory(
    userId,
    totalCoast,
    amount
  );
  if (!paymentObject) {
    return {
      success: false,
      error: "Payment failed",
    };
  }
  const txnId = paymentObject.txnId;

  const data = {
    total_amount: totalCoast,
    currency: "BDT",
    tran_id: txnId,
    success_url: config.sslcommerz.successUrl,
    fail_url: config.sslcommerz.failedUrl,
    cancel_url: config.sslcommerz.canceledUrl,
    ipn_url: config.sslcommerz.ipnUrl,

    cus_name: "Dummy Name",
    cus_email: "dummy_mail@example.com",
    cus_add1: "Dummy Address",
    cus_city: "Dummy City",
    cus_state: "Dummy State",
    cus_postcode: "1000",
    cus_country: "Dummy Country",
    cus_phone: "01711111111",
  };

  try {
    const response = await initPayment(data);

    if (response && response.status == "SUCCESS") {
      return {
        success: true,
        paymentUrl: response.GatewayPageURL,
      };
    }
    return {
      success: false,
      error: "Something went wrong",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: "Payment failed",
    };
  }
};
