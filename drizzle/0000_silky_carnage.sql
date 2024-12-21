CREATE TABLE `todolist-t3_post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256),
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `todolist-t3_todo` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text(2000),
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `todolist-t3_post` (`name`);--> statement-breakpoint
CREATE INDEX `title_idx` ON `todolist-t3_todo` (`title`);