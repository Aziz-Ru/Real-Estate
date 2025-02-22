ALTER TABLE "post_details" DROP CONSTRAINT "post_details_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "post_images" DROP CONSTRAINT "post_images_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "post_details" ADD CONSTRAINT "post_details_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_images" ADD CONSTRAINT "post_images_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;