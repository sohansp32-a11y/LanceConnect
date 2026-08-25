import jwt from "jsonwebtoken";
import pool from "../core/db";
import { UserIdInput } from "../schemas/users.schemas";

export const getUserDataService = async (data: UserIdInput) => {
    const userId = data.user_id

    const result = await pool.query(
        `
        SELECT
            id,
            full_name,
            email,
            plan,
            created_at
        FROM users
        WHERE id = $1
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