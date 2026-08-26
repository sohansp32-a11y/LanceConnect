import jwt from "jsonwebtoken";
import pool from "../core/db";
import { UserIdInput, PlanTypeInput } from "../schemas/users.schemas";

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

export const changePlanService = async (data: PlanTypeInput) => {
    const plan = data.plan
    const id = data.user_id

    const result = await pool.query(
        `
        UPDATE users
        SET plan = $1
        WHERE id = $2
        RETURNING id, full_name, email, plan, created_at
        `,
        [plan, id]
    );

    const return_data = result.rows[0]

    if (!return_data) {
        return {
            "error": "User not found."
        }
    }
    
    return {
        return_data
    }

}