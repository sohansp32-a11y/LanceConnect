import { Request, Response } from "express";
import { signupSchema, loginSchema } from "../schemas/auth.schemas";
import { signupService, LoginService } from "../services/auth.service";

export const signUp = async (req: Request, res: Response) => {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).send(
            {
                error: "The Request is not valid",
                details: result.error.flatten().fieldErrors,
            }
        )
    }

    const data = result.data;

    const response = await signupService(data)

    if (!response.error) {
        res.status(200).send(response)
        return;
    }
    else {
        res.status(409).send(response)
        return;
    }

}

export const loginRequest = async (req: Request, res: Response) => {
    const request = loginSchema.safeParse(req.body)

    if (!request.success) {
        return res.status(400).send({
            error: "The Request is not valid",
            details: request.error.flatten().fieldErrors,
        })
    }

    const data = request.data

    const response = await LoginService(data)

    if (!response.error) {
        res.status(200).send(response)
        return;
    }
    else {
        res.status(401).send(response)
        return;
    }
}