CREATE TYPE "public"."status" AS ENUM('successful', 'pending', 'failed', 'canceled');--> statement-breakpoint
CREATE TABLE "prompt_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"template_id" uuid NOT NULL,
	"content" varchar(5000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "creadits" (
	"user_id" varchar(100) PRIMARY KEY NOT NULL,
	"balance" integer DEFAULT 0 NOT NULL,
	"balance_spent" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(100) NOT NULL,
	"amount" integer NOT NULL,
	"creadit_amount" integer NOT NULL,
	"txnId" uuid DEFAULT gen_random_uuid() NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"val_id" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "payment_history_txnId_unique" UNIQUE("txnId"),
	CONSTRAINT "payment_history_val_id_unique" UNIQUE("val_id")
);
--> statement-breakpoint
CREATE TABLE "templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(100) NOT NULL,
	"public" boolean DEFAULT false NOT NULL,
	"title" varchar(50) NOT NULL,
	"description" varchar(500),
	"icon" varchar(1000) NOT NULL,
	"icon_id" varchar(250),
	"prompt" varchar(3000),
	"forms" json DEFAULT '[]' NOT NULL,
	"popularity" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT '2025-07-03 17:26:32.350' NOT NULL,
	"updated_at" timestamp DEFAULT '2025-07-03 17:26:32.350' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "prompt_history" ADD CONSTRAINT "prompt_history_template_id_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."templates"("id") ON DELETE no action ON UPDATE no action;