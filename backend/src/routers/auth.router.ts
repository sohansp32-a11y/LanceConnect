import { Router } from "express";
import { signUp, loginRequest, refershRequest } from "../controllers/auth.controller";

const router = Router();

router.post("/sign-up", signUp)

router.post("/log-in", loginRequest)

router.post("/refresh", refershRequest)

export default router;