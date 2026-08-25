import { authMiddleware } from "../middleware/auth.middleware";
import { Router } from "express";
import { getUserData } from "../controllers/users.controllers";

const router = Router();

router.post("/data", authMiddleware, getUserData)

export default router;