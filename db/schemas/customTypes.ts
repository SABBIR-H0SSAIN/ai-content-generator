import { pgEnum } from "drizzle-orm/pg-core";

export const paymentStatusEnum = pgEnum("status", [
  "successful",
  "pending",
  "failed",
  "canceled",
]);
export const CUSTOM_TYPES = [
  "status",
]