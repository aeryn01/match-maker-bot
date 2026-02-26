import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  creatorId: text("creator_id").notNull(),
  creatorName: text("creator_name").notNull(),
  game: text("game").notNull(),
  amount: integer("amount").notNull(),
  acceptedById: text("accepted_by_id"),
  acceptedByName: text("accepted_by_name"),
  status: text("status").notNull().default("pending"), // pending, accepted
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMatchSchema = createInsertSchema(matches).omit({ 
  id: true, 
  createdAt: true 
});

export type Match = typeof matches.$inferSelect;
export type InsertMatch = z.infer<typeof insertMatchSchema>;
export type UpdateMatchRequest = Partial<InsertMatch>;
