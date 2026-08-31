import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware"
import { createOrganization, addUser, getOrgUpdates, createOrgUpdate, getOrgRequests, createOrgRequest, updateOrgRequest, getOrgInvoices, createOrgInvoice, updateOrgInvoice } from "../controllers/org.controller"

const router = Router()

router.post("/create_org", authMiddleware, createOrganization)
router.post("/add-user", authMiddleware, addUser)
router.post("/get_updates", authMiddleware, getOrgUpdates)
router.post("/post_update", authMiddleware, createOrgUpdate)
router.post("/get_requests", authMiddleware, getOrgRequests)
router.post("/post_request", authMiddleware, createOrgRequest)
router.post("/update_request", authMiddleware, updateOrgRequest)
router.post("/get_invoices", authMiddleware, getOrgInvoices)
router.post("/post_invoice", authMiddleware, createOrgInvoice)
router.post("/update_invoice", authMiddleware, updateOrgInvoice)

export default router;