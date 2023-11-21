import { Router } from "express";
const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", authRequiered, profile);

export default router;
