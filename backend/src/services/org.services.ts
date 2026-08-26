import pool from "../core/db";
import { createOrgTypes, createUserTypes } from "../schemas/org.schemas";

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