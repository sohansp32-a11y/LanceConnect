import { z } from "zod";

export const userIdSchema = z.object({
  user_id: z.uuid(),
});

export const membershipSchema = z.object({
  plan: z.enum(["free", "pro", "max"]),
  user_id: z.uuid()
})

export type PlanTypeInput = z.infer<typeof membershipSchema>;
export type UserIdInput = z.infer<typeof userIdSchema>;