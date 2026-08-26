import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware"
import { createOrganization, addUser } from "../controllers/org.controller"

const router = Router()

router.post("/create_org", authMiddleware, createOrganization)
router.post("/add-user", authMiddleware, addUser)

export default router;