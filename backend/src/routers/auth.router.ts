import { Router } from "express";
import { signUp, loginRequest } from "../controllers/auth.controller";

const router = Router();

router.post("/sign-up", signUp)

router.post("/log-in", loginRequest)

export default router;