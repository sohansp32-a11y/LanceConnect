import { Request, Response } from "express";
import { createOrgInput } from "../schemas/org.schemas";
import { createOrgService } from "../services/org.services";

export const createOrganization = async (req: Request, res: Response) => {
    const request = createOrgInput.safeParse(req.body)

    if (!request.success) {
        return res.status(400).send({
            "error": "Invalid request format"
        })
    }

    const data = request.data;

    const response = await createOrgService(data)

    if (response.error) {
        return res.status(404).send(response)
    }

    return res.status(201).send(response)

}