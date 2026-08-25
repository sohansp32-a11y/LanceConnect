import { z } from "zod";

export const userIdSchema = z.object({
  user_id: z.uuid(),
});

export type UserIdInput = z.infer<typeof userIdSchema>;