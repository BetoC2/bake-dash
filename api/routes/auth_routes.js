import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
} from "../controllers/auth_controller.js";
import { authRequiered } from "../middlewares/validateToken.js";
const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/profile", authRequiered, profile);

export default router;
