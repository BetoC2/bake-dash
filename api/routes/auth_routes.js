import { Router } from "express";
import { login, register, profile } from "../controllers/auth_controller.js";
import { authRequiered } from "../middlewares/validateToken.js";
const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", authRequiered, profile);

export default router;
