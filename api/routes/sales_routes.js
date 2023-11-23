import { Router } from "express";
import { adminAuth } from "../middlewares/validateAuth.js";
import {
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
  createSale,
} from "../controllers/sales_controller.js";
const router = Router();

router.get("/",  getAllSales);
router.get("/:id", getSaleById);
router.delete("/:id", deleteSale);
router.put("/:id", adminAuth, updateSale);
router.post("/", createSale);

export default router;
