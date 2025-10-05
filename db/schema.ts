import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const canvasesTable = pgTable("canvases", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	user_id: text().notNull(),
	name: text().notNull(),
	data: jsonb().notNull(),
	created_at: timestamp({ mode: "date" }).notNull().defaultNow(),
	updated_at: timestamp({ mode: "date" }).notNull().defaultNow(),
});

export const CanvasDataSchema = z.object({
	keyPartners: z.array(z.string()),
	keyActivities: z.array(z.string()),
	keyResources: z.array(z.string()),
	valuePropositions: z.array(z.string()),
	customerRelationships: z.array(z.string()),
	channels: z.array(z.string()),
	customerSegments: z.array(z.string()),
	costStructure: z.array(z.string()),
	revenueStreams: z.array(z.string()),
});

export type Canvas = InferSelectModel<typeof canvasesTable>;