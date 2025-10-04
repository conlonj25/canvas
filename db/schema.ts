import { integer, pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export const canvasesTable = pgTable("canvases", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	user_id: text().notNull(),
	name: text().notNull(),
	data: jsonb().notNull(),
	created_at: timestamp({ mode: "date" }).notNull().defaultNow(),
	updated_at: timestamp({ mode: "date" }).notNull().defaultNow(),
});
