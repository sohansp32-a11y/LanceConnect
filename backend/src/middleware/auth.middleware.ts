import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).send({
                "error": "Authorization token required.",
            })
        }

        const [schema, token] = authHeader.split(" ")

        if (schema !== "Bearer" || !token) {
            return res.status(401).send({
                "error": "Authorization header format invalid."
            })
        }

        const payload = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET!
        )

        console.log(payload);

        next()
        return;
    } catch {
        return res.status(401).send({
            "error": "Invalid or expired token",
        })
    }
} 