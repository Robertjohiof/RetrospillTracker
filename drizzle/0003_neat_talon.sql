PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_sessions` (
	`session_id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`ip_address` text,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`expires_at` integer NOT NULL,
	`revoked` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_sessions`("session_id", "user_id", "ip_address", "created_at", "updated_at", "expires_at", "revoked") SELECT "session_id", "user_id", "ip_address", "created_at", "updated_at", "expires_at", "revoked" FROM `sessions`;--> statement-breakpoint
DROP TABLE `sessions`;--> statement-breakpoint
ALTER TABLE `__new_sessions` RENAME TO `sessions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `session_idx` ON `sessions` (`session_id`);--> statement-breakpoint
ALTER TABLE `users` ADD `password_hash` text NOT NULL;