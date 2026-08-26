import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware"
import { createOrganization } from "../controllers/org.controller"

const router = Router()

router.post("/create_org", authMiddleware, createOrganization)

export default router;