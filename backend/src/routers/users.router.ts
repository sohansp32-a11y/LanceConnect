import { authMiddleware } from "../middleware/auth.middleware";
import { Router } from "express";
import { getUserData, changePlanType } from "../controllers/users.controllers";

const router = Router();

router.post("/data", authMiddleware, getUserData)

router.put("/plan", authMiddleware, changePlanType)

export default router;