import { MAX_CONTENT_LENGTH } from "@/constants/constants";
import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  json,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { paymentStatusEnum } from "./customTypes";

const TEMPLATE_TABLE_NAME = "templates";
const PAYMENT_HISTORY_TABLE_NAME = "payment_history";
const CONTENT_HISTORY_TABLE_NAME = "prompt_history";
const CREADIT_TABLE_NAME = "creadits";

const userID = varchar("user_id", { length: 100 }).notNull();

export const templateSchema = pgTable(TEMPLATE_TABLE_NAME, {
  id: uuid()
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  userID,
  public: boolean().notNull().default(false),
  title: varchar({ length: 50 }).notNull(),
  description: varchar({ length: 500 }),
  icon: varchar({ length: 1000 }).notNull(),
  icon_id: varchar({ length: 250 }),
  prompt: varchar({ length: 3000 }),
  forms: json().notNull().default("[]"),
  popularity: integer().notNull().default(0),
  created_at: timestamp().notNull().default(new Date()),
  updated_at: timestamp().notNull().default(new Date()),
});

export const paymentHistorySchema = pgTable(PAYMENT_HISTORY_TABLE_NAME, {
  id: uuid()
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  userID: varchar("user_id", { length: 100 }).notNull(),
  amount: integer().notNull(),
  creadit_amount: integer().notNull(),
  txnId: uuid()
    .unique()
    .notNull()
    .default(sql`gen_random_uuid()`),
  status: paymentStatusEnum().notNull().default("pending"),
  val_id: varchar({ length: 100 }).unique(),
  created_at: timestamp().defaultNow().notNull(),
});

export const contentHistorySchema = pgTable(CONTENT_HISTORY_TABLE_NAME, {
  id: uuid()
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  userID,
  created_at: timestamp().notNull().defaultNow(),
  template_id: uuid()
    .notNull()
    .references(() => templateSchema.id),
  content: varchar({ length: MAX_CONTENT_LENGTH }).notNull(),
});

export const creaditSchema = pgTable(CREADIT_TABLE_NAME, {
  userID: userID.primaryKey(),
  balance: integer().default(0).notNull(),
  balance_spent: integer().default(0).notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});

export const templateContentHistoryRelations = relations(
  contentHistorySchema,
  ({ one }) => ({
    template: one(templateSchema, {
      fields: [contentHistorySchema.template_id],
      references: [templateSchema.id],
    }),
  })
);
export const TABLE_NAMES = [
  TEMPLATE_TABLE_NAME,
  PAYMENT_HISTORY_TABLE_NAME,
  CONTENT_HISTORY_TABLE_NAME,
  CREADIT_TABLE_NAME,
];

export { CUSTOM_TYPES } from "./customTypes";
