import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware"
import { createOrganization, addUser, getOrgUpdates, createOrgUpdate } from "../controllers/org.controller"

const router = Router()

router.post("/create_org", authMiddleware, createOrganization)
router.post("/add-user", authMiddleware, addUser)
router.post("/get_updates", authMiddleware, getOrgUpdates)
router.post("/post_update", authMiddleware, createOrgUpdate)

export default router;