import { mysqlTable, int, varchar, tinyint } from "drizzle-orm/mysql-core";

export const tasks = mysqlTable("tasks", {
    id: int("id").primaryKey().autoincrement(),
    task: varchar("task", { length: 255 }).notNull(),
    tags: varchar("tags", { length: 255 }),
    completed: tinyint("completed").default(0),
});

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;