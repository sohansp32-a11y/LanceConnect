import pool from "../core/db";
import { createOrgTypes, createUserTypes, orgIdType, createUpdateTypes, orgRequestsType, createRequestType, updateRequestType, orgInvoicesType, createInvoiceType, updateInvoiceType } from "../schemas/org.schemas";

export const createOrgService = async (data: createOrgTypes) => {
    const name = data.name
    const owner = data.owner_id

    const result = await pool.query(
        `
        INSERT INTO organizations (name, owner_id)
        VALUES ($1, $2)
        RETURNING
            organization_id,
            name,
            owner_id,
            created_at
        `,
        [name, owner]
    );

    const organization = result.rows[0]

    if (!organization) {
        return {
            "error": "User not found or some internal error"
        }
    }

    return {
        organization
    }

}

export const addUserService = async (data: createUserTypes) => {
    const { org_id, user_id, role} = data

    const result = await pool.query(
        `
        INSERT INTO organization_users (
            organization_id,
            user_id,
            role
        )
        VALUES ($1, $2, $3)
        RETURNING
            organization_id,
            user_id,
            role
        `,
        [org_id, user_id, role]
    );

    const return_data = result.rows[0]

    if (!return_data) {
        return {
            "error": "User id not found"
        }
    }

    return {
        return_data
    }
}

export const getOrgUpdatesService = async (data: orgIdType) => {
    const id = data.org_id

    const result = await pool.query(
        `
        SELECT * FROM updates WHERE organization_id = $1
        `,
        [id]
    )

    const updates = result.rows

    if (!updates) {
        return {
            "error": "Organization not found"
        }
    }

    return {
        updates
    }

}

export const postOrgUpdate = async (data: createUpdateTypes) => {

    const { organization_id, created_by, title, description, status, img_url} = data

    const result = await pool.query(
        `INSERT INTO updates (
            organization_id,
            created_by,
            title,
            description,
            img_url,
            status
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [
            organization_id,
            created_by,
            title,
            description ?? null,
            img_url ?? null,
            status,
        ]
    );

    const update_data = result.rows[0]

    if (!update_data) {
        return {
            "error": "Invalid input values, re-check request values."
        }
    }

    return {
        update_data
    }
}

export const getOrgRequestsService = async (data: orgRequestsType) => {
    const id = data.org_id

    const result = await pool.query(
        `SELECT * FROM requests WHERE organization_id = $1`,
        [id]
    )

    const requests = result.rows

    if (!requests) {
        return {
            "error": "Organization not found"
        }
    }

    return {
        requests
    }

}

export const postOrgRequest = async (data: createRequestType) => {
    const { organization_id, client_id, title, description, status } = data

    const result = await pool.query(
        `INSERT INTO requests (
            organization_id,
            client_id,
            title,
            description,
            status
        ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [organization_id, client_id, title, description ?? null, status]
    )

    const request_data = result.rows[0]

    if (!request_data) {
        return {
            "error": "Invalid input values, re-check request values."
        }
    }

    return {
        request_data
    }

}

export const updateOrgRequestService = async (data: updateRequestType) => {
    const { request_id, status } = data

    const result = await pool.query(
        `UPDATE requests SET status = $2 WHERE request_id = $1 RETURNING *`,
        [request_id, status]
    )

    const updated = result.rows[0]

    if (!updated) {
        return {
            "error": "Request not found or invalid input"
        }
    }

    return {
        updated
    }

}

export const getOrgInvoicesService = async (data: orgInvoicesType) => {
    const id = data.org_id

    const result = await pool.query(
        `SELECT * FROM invoices WHERE organization_id = $1`,
        [id]
    )

    const invoices = result.rows

    if (!invoices) {
        return {
            "error": "Organization not found"
        }
    }

    return {
        invoices
    }

}

export const postOrgInvoice = async (data: createInvoiceType) => {
    const { organization_id, created_by, title, price, status, accepted_at } = data

    const result = await pool.query(
        `INSERT INTO invoices (
            organization_id,
            created_by,
            title,
            price,
            status,
            accepted_at
        ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [organization_id, created_by, title, price, status, accepted_at ?? null]
    )

    const invoice_data = result.rows[0]

    if (!invoice_data) {
        return {
            "error": "Invalid input values, re-check invoice values."
        }
    }

    return {
        invoice_data
    }

}

export const updateOrgInvoiceService = async (data: updateInvoiceType) => {
    const { invoice_id, status } = data

    const result = await pool.query(
        `UPDATE invoices SET status = $2, accepted_at = CASE WHEN $2 = 'final' THEN NOW() ELSE NULL END WHERE invoice_id = $1 RETURNING *`,
        [invoice_id, status]
    )

    const updated = result.rows[0]

    if (!updated) {
        return {
            "error": "Invoice not found or invalid input"
        }
    }

    return {
        updated
    }

}