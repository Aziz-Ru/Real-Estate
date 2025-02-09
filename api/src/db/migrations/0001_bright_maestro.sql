CREATE TYPE "public"."post_property_type" AS ENUM('APARTMENT', 'HOUSE', 'COMMERCIAL', 'LAND', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."post_type" AS ENUM('RENT', 'SALE', 'AUCTION');--> statement-breakpoint
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"price" numeric(10, 3) NOT NULL,
	"address" text NOT NULL,
	"city" varchar(255) NOT NULL,
	"bedroom" integer DEFAULT 1,
	"bathroom" integer DEFAULT 1,
	"latitude" varchar(255) NOT NULL,
	"longitude" varchar(255) NOT NULL,
	"type" "post_type" NOT NULL,
	"property_type" "post_property_type" NOT NULL,
	"user_id" uuid NOT NULL,
	"img" varchar(555) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_users_uid_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("uid") ON DELETE no action ON UPDATE no action;