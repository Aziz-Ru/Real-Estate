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
