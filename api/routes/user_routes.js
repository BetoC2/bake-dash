import { Router } from "express";
import { update, remove } from "../controllers/user_controller.js";
import { adminAuth } from "../middlewares/validateAuth.js";
const router = Router();

router.put("/update", adminAuth, update);
router.delete("/remove", adminAuth, remove);

export default router;
