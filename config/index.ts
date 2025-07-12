import dotenv from "dotenv";

dotenv.config(); // To avoid error in database seeder script on production remove it. Nextjs automatically loads the .env file
const BASE_URL = process.env.BASE_URL!;
const DATABASE_URL = process.env.DATABASE_URL;
const NODE_ENV = process.env.NODE_ENV || "development";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL_NAME = process.env.GEMINI_MODEL_NAME;
const SSLCOMMERZ_STORE_ID = process.env.SSLCOMMERZ_STORE_ID;
const SSLCOMMERZ_STORE_PASSWORD = process.env.SSLCOMMERZ_STORE_PASSWORD;
const GEMINI_SYSTEM_INSTRUCTION = process.env.GEMINI_SYSTEM_INSTRUCTION;
const SSLCOMMERZ_SUCCESS_URL = process.env.SSLCOMMERZ_SUCCESS_URL;
const SSLCOMMERZ_FAILED_URL = process.env.SSLCOMMERZ_FAILED_URL;
const SSLCOMMERZ_CANCELED_URL = process.env.SSLCOMMERZ_CANCELED_URL;
const SSLCOMMERZ_IPN_URL = process.env.SSLCOMMERZ_IPN_URL;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

const missingVars = [];
if (!DATABASE_URL) missingVars.push("DATABASE_URL");
if (!GEMINI_API_KEY) missingVars.push("GEMINI_API_KEY");
if (!GEMINI_MODEL_NAME) missingVars.push("GEMINI_MODEL_NAME");
if (!SSLCOMMERZ_STORE_ID) missingVars.push("SSLCOMMERZ_STORE_ID");
if (!SSLCOMMERZ_STORE_PASSWORD) missingVars.push("SSLCOMMERZ_STORE_PASSWORD");
if (!BASE_URL) missingVars.push("BASE_URL");
if (!SSLCOMMERZ_IPN_URL) missingVars.push("SSLCOMMERZ_IPN_URL");
if (!CLOUDINARY_CLOUD_NAME) missingVars.push("CLOUDINARY_CLOUD_NAME");
if (!CLOUDINARY_API_KEY) missingVars.push("CLOUDINARY_API_KEY");
if (!CLOUDINARY_API_SECRET) missingVars.push("CLOUDINARY_API_SECRET");

if (missingVars.length > 0) {
  console.error("Missing environment variables:", missingVars);
  throw new Error(
    `Missing required environment variables: ${missingVars.join(", ")}`
  );
}

export const config = {
  baseUrl: BASE_URL,
  db: {
    url: DATABASE_URL,
  },
  gemini: {
    apiKey: GEMINI_API_KEY,
    model: GEMINI_MODEL_NAME,
    systemInstruction:
      GEMINI_SYSTEM_INSTRUCTION ||
      "Your name is EasyAi. You dont accept media generation and your maximum response length is 1000 words",
  },
  sslcommerz: {
    storeId: SSLCOMMERZ_STORE_ID,
    storePassword: SSLCOMMERZ_STORE_PASSWORD,
    successUrl:
      BASE_URL + (SSLCOMMERZ_SUCCESS_URL || "/api/sslcommerz/success"),
    failedUrl: BASE_URL + (SSLCOMMERZ_FAILED_URL || "/api/sslcommerz/failed"),
    canceledUrl:
      BASE_URL + (SSLCOMMERZ_CANCELED_URL || "/api/sslcommerz/canceled"),
    ipnUrl: SSLCOMMERZ_IPN_URL,
  },
  cloudinary: {
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    apiSecret: CLOUDINARY_API_SECRET,
  },
  NODE_ENV,
};
