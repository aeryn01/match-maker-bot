import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

// Create an extended schema that handles dates appropriately for the frontend
const matchesResponseSchema = api.matches.list.responses[200];

export function useMatches() {
  return useQuery({
    queryKey: [api.matches.list.path],
    queryFn: async () => {
      const res = await fetch(api.matches.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch matches");
      
      const data = await res.json();
      
      // Parse data and coerce ISO strings back to Date objects for the frontend
      const result = matchesResponseSchema.safeParse(data);
      
      if (!result.success) {
        console.error("[Zod] Match parsing failed:", result.error.format());
        throw new Error("Invalid data format received from server");
      }
      
      // Map strings to Dates if they aren't already
      return result.data.map(match => ({
        ...match,
        createdAt: match.createdAt ? new Date(match.createdAt) : null
      }));
    },
    // Poll every 3 seconds to keep dashboard live with Discord bot actions
    refetchInterval: 3000,
  });
}
