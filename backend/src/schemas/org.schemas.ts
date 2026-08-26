import { z } from "zod"

export const createOrgInput = z.object({
    name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name must be at most 80 characters"),
    owner_id: z.uuid()
})

export type createOrgTypes = z.infer<typeof createOrgInput>;