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

export const orgRequestsInput = z.object({
    org_id: z.string().uuid()
})

export const createRequestSchema = z.object({
    organization_id: z.string().uuid(),
    client_id: z.string().uuid(),
    title: z.string().min(1).max(255),
    description: z.string().optional(),
    status: z.enum(["pending", "approved", "rejected", "completed"]).default("pending")
})

export const updateRequestSchema = z.object({
    request_id: z.string().uuid(),
    status: z.enum(["pending", "approved", "rejected", "completed"]) 
})

export type orgRequestsType = z.infer<typeof orgRequestsInput>;
export type createRequestType = z.infer<typeof createRequestSchema>;
export type createOrgTypes = z.infer<typeof createOrgInput>;
export type orgIdType = z.infer<typeof orgIdInput>;
export type createUserTypes = z.infer<typeof createUserInput>;
export type createUpdateTypes = z.infer<typeof createUpdateSchema>;
export type updateRequestType = z.infer<typeof updateRequestSchema>;

export const orgInvoicesInput = z.object({
    org_id: z.string().uuid()
})

export const createInvoiceSchema = z.object({
    organization_id: z.string().uuid(),
    created_by: z.string().uuid(),

    title: z.string()
        .min(1)
        .max(255),

    price: z.number().nonnegative(),

    status: z.enum(["pending", "final"]).default("pending"),

    accepted_at: z.string().optional()
})

export const updateInvoiceSchema = z.object({
    invoice_id: z.string().uuid(),
    status: z.enum(["pending", "final"]) 
})

export type orgInvoicesType = z.infer<typeof orgInvoicesInput>;
export type createInvoiceType = z.infer<typeof createInvoiceSchema>;
export type updateInvoiceType = z.infer<typeof updateInvoiceSchema>;