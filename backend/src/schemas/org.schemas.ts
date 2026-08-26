import { error } from "node:console";
import { z } from "zod"

export const createOrgInput = z.object({
    name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name must be at most 80 characters"),
    owner_id: z.uuid()
})

export const createUserInput = z.object({
    org_id: z.uuid(),
    user_id: z.uuid(),
    role: z.enum(["client", "freelancer"])
})

export type createOrgTypes = z.infer<typeof createOrgInput>;
export type createUserTypes = z.infer<typeof createUserInput>;