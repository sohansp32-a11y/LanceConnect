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

export const orgIdInput = z.object({
    org_id: z.uuid()
})

export const createUpdateSchema = z.object({
    organization_id: z.string().uuid(),
    created_by: z.string().uuid(),

    title: z.string()
        .min(1)
        .max(255),

    description: z.string()
        .optional(),

    img_url: z.string()
        .url()
        .optional(),

    status: z.enum(["in_progress", "completed"])
        .default("in_progress"),
});

export type createOrgTypes = z.infer<typeof createOrgInput>;
export type orgIdType = z.infer<typeof orgIdInput>;
export type createUserTypes = z.infer<typeof createUserInput>;
export type createUpdateTypes = z.infer<typeof createUpdateSchema>;
