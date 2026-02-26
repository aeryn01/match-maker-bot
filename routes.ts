import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.matches.list.path, async (req, res) => {
    try {
      const allMatches = await storage.getMatches();
      res.json(allMatches);
    } catch (err) {
      console.error("Error fetching matches:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
