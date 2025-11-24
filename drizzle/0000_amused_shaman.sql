CREATE TABLE `subscriptions` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`price` integer NOT NULL,
	`is_yearly` integer DEFAULT false NOT NULL,
	`created_at` integer
);
