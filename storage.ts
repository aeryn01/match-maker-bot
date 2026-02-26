import { db } from "./db";
import { matches, type Match, type InsertMatch, type UpdateMatchRequest } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getMatches(): Promise<Match[]>;
  getMatch(id: number): Promise<Match | undefined>;
  createMatch(match: InsertMatch): Promise<Match>;
  updateMatch(id: number, updates: UpdateMatchRequest): Promise<Match>;
}

export class DatabaseStorage implements IStorage {
  async getMatches(): Promise<Match[]> {
    return await db.select().from(matches).orderBy(desc(matches.createdAt));
  }

  async getMatch(id: number): Promise<Match | undefined> {
    const [match] = await db.select().from(matches).where(eq(matches.id, id));
    return match;
  }

  async createMatch(match: InsertMatch): Promise<Match> {
    const [newMatch] = await db.insert(matches).values(match).returning();
    return newMatch;
  }

  async updateMatch(id: number, updates: UpdateMatchRequest): Promise<Match> {
    const [updatedMatch] = await db.update(matches).set(updates).where(eq(matches.id, id)).returning();
    return updatedMatch;
  }
}

export const storage = new DatabaseStorage();
