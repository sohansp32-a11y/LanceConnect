import { Request, Response } from "express";
import { userIdSchema, membershipSchema } from "../schemas/users.schemas";
import { getUserDataService, changePlanService } from "../services/users.services";

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

export const changePlanType = async (req: Request, res: Response) => {
    const request = membershipSchema.safeParse(req.body)

    if (!request.success) {
        return res.status(400).send({
            "error": "Invalid request format"
        })
    }

    const data = request.data

    const response = await changePlanService(data)

    if (!response.error) {
        return res.status(200).send(response)
    }

    return res.status(404).send(response)

}