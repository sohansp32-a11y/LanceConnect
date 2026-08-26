import { Request, Response } from "express";
import { createOrgInput, createUserInput, orgIdInput, createUpdateSchema } from "../schemas/org.schemas";
import { createOrgService, addUserService, getOrgUpdatesService, postOrgUpdate } from "../services/org.services";

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

export const addUser = async (req: Request, res: Response) => {
    const request = createUserInput.safeParse(req.body)

    if (!request.success) {
        return res.status(400).send({
            "error": "Invalid request json format"
        })
    }

    const data = request.data;

    const response = await addUserService(data)

    if (response.error) {
        return res.status(404).send(response)
    }

    return res.status(201).send(response)

}

export const getOrgUpdates = async (req: Request, res: Response) => {
    const request = orgIdInput.safeParse(req.body)

    if (!request.success) {
        return res.status(400).send({
            "error": "Invalid request body json"
        })
    }

    const data = request.data

    const response = await getOrgUpdatesService(data)

    if (response.error) {
        return res.status(404).send(response)
    }

    return res.status(200).send(response)

}

export const createOrgUpdate = async (req: Request, res: Response) => {
    const request = createUpdateSchema.safeParse(req.body)

    if (!request.success) {
        return res.status(400).send({
            "error": "Invalid request body json"
        })
    }

    const data = request.data

    const response = await postOrgUpdate(data)

    if (response.error) {
        return res.status(400).send(response)
    }

    return res.status(201).send(response)
}