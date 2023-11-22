import { Router } from "express";
import { adminAuth } from "../middlewares/validateAuth.js";
import {
  getAllProducts,
  getProductById,
  getProductsByName,
  removeProduct,
  updateProduct,
  createProduct,
  getProductByBarcode,
} from "../controllers/product_controller.js";
const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/search/:name", getProductsByName);
router.delete("/:id", adminAuth, removeProduct);
router.put("/:id", adminAuth, updateProduct);
router.post("/", adminAuth, createProduct);
router.get("/barcode/:barcode", getProductByBarcode);

export default router;
