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
ALTER TABLE "post_details" ADD CONSTRAINT "post_details_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;