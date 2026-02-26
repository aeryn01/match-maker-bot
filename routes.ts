import { z } from 'zod';
import { insertMatchSchema, matches } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  matches: {
    list: {
      method: 'GET' as const,
      path: '/api/matches' as const,
      responses: {
        200: z.array(z.custom<typeof matches.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type MatchesListResponse = z.infer<typeof api.matches.list.responses[200]>;
