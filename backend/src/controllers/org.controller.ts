import { Request, Response } from "express";
import { createOrgInput, createUserInput, orgIdInput, createUpdateSchema, orgRequestsInput, createRequestSchema, updateRequestSchema, orgInvoicesInput, createInvoiceSchema, updateInvoiceSchema } from "../schemas/org.schemas";
import { createOrgService, addUserService, getOrgUpdatesService, postOrgUpdate, getOrgRequestsService, postOrgRequest, updateOrgRequestService, getOrgInvoicesService, postOrgInvoice, updateOrgInvoiceService } from "../services/org.services";

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

export const getOrgRequests = async (req: Request, res: Response) => {
    const request = orgRequestsInput.safeParse(req.body)

    if (!request.success) {
        return res.status(400).send({
            "error": "Invalid request body json"
        })
    }

    const data = request.data

    const response = await getOrgRequestsService(data)

    if (response.error) {
        return res.status(404).send(response)
    }

    return res.status(200).send(response)

}

export const createOrgRequest = async (req: Request, res: Response) => {
    const request = createRequestSchema.safeParse(req.body)

    if (!request.success) {
        return res.status(400).send({
            "error": "Invalid request body json"
        })
    }

    const data = request.data

    const response = await postOrgRequest(data)

    if (response.error) {
        return res.status(400).send(response)
    }

    return res.status(201).send(response)

}

export const updateOrgRequest = async (req: Request, res: Response) => {
    const request = updateRequestSchema.safeParse(req.body)

    if (!request.success) {
        return res.status(400).send({
            "error": "Invalid request body json"
        })
    }

    const data = request.data

    const response = await updateOrgRequestService(data)

    if (response.error) {
        return res.status(400).send(response)
    }

    return res.status(200).send(response)

}

export const getOrgInvoices = async (req: Request, res: Response) => {
    const request = orgInvoicesInput.safeParse(req.body)

    if (!request.success) {
        return res.status(400).send({
            "error": "Invalid request body json"
        })
    }

    const data = request.data

    const response = await getOrgInvoicesService(data)

    if (response.error) {
        return res.status(404).send(response)
    }

    return res.status(200).send(response)

}

export const createOrgInvoice = async (req: Request, res: Response) => {
    const request = createInvoiceSchema.safeParse(req.body)

    if (!request.success) {
        return res.status(400).send({
            "error": "Invalid request body json"
        })
    }

    const data = request.data

    const response = await postOrgInvoice(data)

    if (response.error) {
        return res.status(400).send(response)
    }

    return res.status(201).send(response)

}

export const updateOrgInvoice = async (req: Request, res: Response) => {
    const request = updateInvoiceSchema.safeParse(req.body)

    if (!request.success) {
        return res.status(400).send({
            "error": "Invalid request body json"
        })
    }

    const data = request.data

    const response = await updateOrgInvoiceService(data)

    if (response.error) {
        return res.status(400).send(response)
    }

    return res.status(200).send(response)

}