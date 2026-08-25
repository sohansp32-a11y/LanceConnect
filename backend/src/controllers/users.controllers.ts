import { Request, Response } from "express";
import { userIdSchema } from "../schemas/users.schemas";
import { getUserDataService } from "../services/users.services";

export const getUserData = async (req: Request, res: Response) => {
    const request = userIdSchema.safeParse(req.body)

    if (!request.success) {
        res.status(400).send({
            "error": "Invalid request body",
        })
        return;
    }

    const data = request.data

    const response = await getUserDataService(data);

    if (response.error) {
        res.status(404).send(response)
        return;
    }

    res.status(200).send(response)
    return;    

}