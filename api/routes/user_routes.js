import { Router } from "express";
import {
  update,
  remove,
  getUsers,
  getUserById,
  getUsersByName,
} from "../controllers/user_controller.js";
import { adminAuth } from "../middlewares/validateAuth.js";
const router = Router();

router.put("/:id", adminAuth, update);
router.delete("/:id", adminAuth, remove);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/search/:name", getUsersByName);

export default router;
