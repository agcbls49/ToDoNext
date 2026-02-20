CREATE TABLE `tasks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`task` varchar(255) NOT NULL,
	`tags` varchar(255),
	`completed` tinyint DEFAULT 0,
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`)
);
