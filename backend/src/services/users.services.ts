import jwt from "jsonwebtoken";
import pool from "../core/db";
import { UserIdInput } from "../schemas/users.schemas";

export const getUserDataService = async (data: UserIdInput) => {
    const userId = data.user_id

    const result = await pool.query(
        `
        SELECT
            u.id,
            u.full_name,
            u.email,
            u.plan,
            u.created_at,
            (
                SELECT COUNT(*)
                FROM organizations o
                WHERE o.owner_id = u.id
            ) AS total_organizations
        FROM users u
        WHERE u.id = $1
        `,
        [userId]
);

    const user_data = result.rows[0]

    if (!user_data) {
        return {
            "error": "No userdata for the provided id was found",
        }
    }

    return {
        user_data
    }
}