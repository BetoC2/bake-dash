import { Router } from "express";
import { adminAuth } from "../middlewares/validateToken.js";
import {
  getAllProducts,
  getProductById,
  getProductsByName,
  removeProduct,
  updateProduct,
} from "../controllers/product_controller.js";
const router = Router();

router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/search/:name", getProductsByName);
router.delete("/:id", adminAuth, removeProduct);
router.put("/:id", adminAuth, updateProduct);

export default router;
