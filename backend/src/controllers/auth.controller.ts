import { Request, Response } from "express";
import { signupSchema } from "../schemas/auth.schemas";

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

    const { full_name, email, password } = result.data;

    console.log(full_name)
    console.log(email)
    console.log(password)

    res.status(200).send({
        message: "Successful Request"
    })
}