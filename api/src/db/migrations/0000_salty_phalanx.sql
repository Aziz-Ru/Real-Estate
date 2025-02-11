CREATE TYPE "public"."post_property_type" AS ENUM('APARTMENT', 'HOUSE', 'COMMERCIAL', 'LAND', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."post_type" AS ENUM('RENT', 'SALE', 'AUCTION');--> statement-breakpoint
CREATE TABLE "post_details" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" uuid NOT NULL,
	"description" text NOT NULL,
	"utility" varchar(255),
	"pet_policy" varchar(255),
	"parking" varchar(255),
	"size" integer,
	"school" integer,
	"resturant" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "post_details_post_id_unique" UNIQUE("post_id")
);
--> statement-breakpoint
CREATE TABLE "post_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" uuid NOT NULL,
	"img" varchar(555) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
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
CREATE TABLE "users" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false,
	"confirmation_code" varchar(255) NOT NULL,
	"avatar" varchar(2),
	"confirmation_code_sent_at" timestamp (6) with time zone NOT NULL,
	"confirmed_at" timestamp (6) with time zone,
	"is_activated" boolean DEFAULT true,
	"last_signed_in_at" timestamp,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "post_details" ADD CONSTRAINT "post_details_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_images" ADD CONSTRAINT "post_images_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_users_uid_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("uid") ON DELETE no action ON UPDATE no action;