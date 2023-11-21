import { Router } from "express";
import { update, remove } from "../controllers/user_controller.js";
import { adminAuth } from "../middlewares/validateAuth.js";
const router = Router();

router.put("/:id", adminAuth, update);
router.delete("/:id", adminAuth, remove);

export default router;
