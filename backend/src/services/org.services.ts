import pool from "../core/db";
import { createOrgTypes } from "../schemas/org.schemas";

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