import { config } from "@/config";
import axios from "axios";

const storeId = config.sslcommerz.storeId;
const storePassword = config.sslcommerz.storePassword;

const isLive = config.NODE_ENV === "production";
const initUrl = isLive
  ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
  : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

export const initPayment = async (data: any) => {
  try {
    const response = await axios.post(
      initUrl,
      {
        ...data,
        store_id: storeId,
        store_passwd: storePassword,
        shipping_method: "NO",
        product_name: "Credits Purchase",
        product_category: "Digital",
        product_profile: "general",
        emi_option: 0,
        num_of_item: 1,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch {
    return null;
  }
};

export const validatePayment = async (val_id: string) => {
  const url = isLive
    ? "https://securepay.sslcommerz.com/validator/api/validationserverAPI.php"
    : "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php";

  try {
    const response = await axios.get(url, {
      params: {
        val_id,
        store_id: storeId,
        store_passwd: storePassword,
        format: "json",
      },
    });
    return response.data;
  } catch {
    return null;
  }
};
