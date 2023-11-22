import { Router } from "express";
import { login, register, profile } from "../controllers/auth_controller.js";
import { authRequiered, adminAuth } from "../middlewares/validateAuth.js";
const router = Router();

router.post("/login", login);
router.post("/register", adminAuth, register);
router.get("/profile", authRequiered, profile);

export default router;
