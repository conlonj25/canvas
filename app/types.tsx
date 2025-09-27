import { z } from "zod";

export const CanvasSchema = z.object({
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

export type Canvas = z.infer<typeof CanvasSchema>;