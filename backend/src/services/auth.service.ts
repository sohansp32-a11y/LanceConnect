import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../core/db";
import type { SignupInput, LoginInput, RefreshTokenInput } from "../schemas/auth.schemas"

export const signupService = async (data: SignupInput) => {
  const { full_name, email, password } = data;

  // 1. Check if user already exists
  const existingUser = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    return {
        "error": "User already exists.",
        "detail": "Invalid email or password, choose another one."
    }
  }

  // 2. Hash password
  const passwordHash = await bcrypt.hash(password, 12);

  // 3. Create user
  const result = await pool.query(
    `
    INSERT INTO users (full_name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, full_name, email, created_at
    `,
    [full_name, email, passwordHash]
  );

  const user = result.rows[0];

  // 4. Generate access token
  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: "15m" }
  );

  // 5. Generate refresh token
  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "7d" }
  );

  // 6. Return data to controller
  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const LoginService = async (data: LoginInput) => {
    const {email, password} = data

    const result = await pool.query(
        `
        SELECT
            id,
            full_name,
            email,
            plan,
            created_at,
            password_hash
        FROM users
        WHERE email = $1
        `,
        [email]
        );

        const user_data = result.rows[0];

        if (!user_data) {
            return {
                "error": "User does not exists.",
                "detail": "Invalid email or password."
            }
        }

        const passwordValid = await bcrypt.compare(
        password,
        user_data.password_hash
        );

        if (!passwordValid) {
            return {
                "error": "Incorrect Password",
                "detail": "Invalid email or password."
            }
        }

        const { password_hash, ...user } = user_data;

        const accessToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_ACCESS_SECRET!,
            { expiresIn: "15m" }
        );

        // 5. Generate refresh token
        const refreshToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_REFRESH_SECRET!,
            { expiresIn: "7d" }
        );

        return {
            user,
            accessToken,
            refreshToken
        }

}

export const RefreshService = async (data: RefreshTokenInput) => {

    const refreshToken = data.refresh_token

    const payload = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!,
    ) as {userId: string};

    const id = payload.userId

    const result = await pool.query(
        `
        SELECT id
        FROM users
        WHERE id = $1
        `,
        [id]
    );

    if (result.rows.length === 0) {
        return {
            "error": "User Not Found",
            "detail": "Invalid User, user not found."
        }
    }

    const accessToken = jwt.sign(
        { userId: id },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: "15m" }
    );

    return {
        accessToken,
    }
}