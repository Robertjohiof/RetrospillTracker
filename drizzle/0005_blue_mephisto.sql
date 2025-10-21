CREATE TABLE `collection_entries` (
	`entry_id` integer PRIMARY KEY NOT NULL,
	`game_id` integer NOT NULL,
	`collection_id` integer NOT NULL,
	`status` integer,
	`score` integer,
	`priority` integer,
	`play_time` integer,
	`finished_at` text,
	FOREIGN KEY (`game_id`) REFERENCES `games`(`game_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`collection_id`) REFERENCES `collections`(`collection_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`status`) REFERENCES `playing_status`(`status_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `collections` (
	`collection_id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`is_backlog` integer NOT NULL,
	`is_public` integer NOT NULL,
	`name` text,
	`likes` integer DEFAULT 0,
	`description` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `collection_id` ON `collections` (`collection_id`);--> statement-breakpoint
CREATE TABLE `developers` (
	`developer_id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`created_at` text,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `developers_slug_unique` ON `developers` (`slug`);--> statement-breakpoint
CREATE INDEX `developer_namex` ON `developers` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `developer_slugx` ON `developers` (`slug`);--> statement-breakpoint
CREATE TABLE `games` (
	`game_id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`api_key` text NOT NULL,
	`description` text,
	`story` text,
	`cover_image_url` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `games_slug_unique` ON `games` (`slug`);--> statement-breakpoint
CREATE INDEX `games_title_idx` ON `games` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `games_slug_x` ON `games` (`slug`);--> statement-breakpoint
CREATE TABLE `games_to_developers` (
	`game_id` integer,
	`developer_id` integer NOT NULL,
	PRIMARY KEY(`game_id`, `developer_id`),
	FOREIGN KEY (`game_id`) REFERENCES `games`(`game_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`developer_id`) REFERENCES `developers`(`developer_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `games_to_genres` (
	`game_id` integer NOT NULL,
	`genre_id` integer NOT NULL,
	PRIMARY KEY(`game_id`, `genre_id`),
	FOREIGN KEY (`game_id`) REFERENCES `games`(`game_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`genre_id`) REFERENCES `genres`(`genre_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `games_to_platforms` (
	`game_id` integer NOT NULL,
	`platform_id` integer NOT NULL,
	PRIMARY KEY(`game_id`, `platform_id`),
	FOREIGN KEY (`game_id`) REFERENCES `games`(`game_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`platform_id`) REFERENCES `platforms`(`platform_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `genres` (
	`genre_id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`api_key` text,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `genres_slug_unique` ON `genres` (`slug`);--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` integer PRIMARY KEY NOT NULL,
	`user_name` text NOT NULL,
	`slug` text NOT NULL,
	`email` text NOT NULL,
	`first_name` text,
	`last_name` text,
	`profile_picture` text,
	`profile_banner` text,
	`biography` text,
	`isActive` integer NOT NULL,
	`created_at` text,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	`role_id` integer NOT NULL,
	FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_user_name_unique` ON `users` (`user_name`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_slug_unique` ON `users` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_idx` ON `users` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_slugx` ON `users` (`slug`);--> statement-breakpoint
CREATE TABLE `roles` (
	`id` integer PRIMARY KEY NOT NULL,
	`role_name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `roles_role_name_unique` ON `roles` (`role_name`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`session_id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`ip_address` text,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`expires_at` integer,
	`revoked` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_idx` ON `sessions` (`session_id`);--> statement-breakpoint
CREATE TABLE `platforms` (
	`platform_id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`manufacturer` text,
	`release_year` text,
	`api_key` text,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `platforms_name_unique` ON `platforms` (`name`);--> statement-breakpoint
CREATE TABLE `tags` (
	`tag_slug` text PRIMARY KEY NOT NULL,
	`tag_name` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tag_slugx` ON `tags` (`tag_slug`);--> statement-breakpoint
CREATE TABLE `reviews` (
	`review_id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`game_id` integer NOT NULL,
	`title` text,
	`score` integer NOT NULL,
	`review_description` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`game_id`) REFERENCES `games`(`game_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `playing_status` (
	`status_id` integer PRIMARY KEY NOT NULL,
	`status` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `playing_status_status_unique` ON `playing_status` (`status`);--> statement-breakpoint
CREATE TABLE `tags_to_collections` (
	`tag_slug` text NOT NULL,
	`collection_id` integer NOT NULL,
	PRIMARY KEY(`tag_slug`, `collection_id`),
	FOREIGN KEY (`tag_slug`) REFERENCES `tags`(`tag_slug`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`collection_id`) REFERENCES `collections`(`collection_id`) ON UPDATE no action ON DELETE cascade
);
