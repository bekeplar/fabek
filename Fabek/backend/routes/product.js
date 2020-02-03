import { Router } from "express";

import { createProduct, updateProduct, getProducts, getProduct, deleteProduct } from "../controllers/product";

import checkAuth from "../middleware/check-auth";
import extractFile from "../middleware/file";

const router = Router();

router.post("", checkAuth, extractFile, createProduct);

router.put("/:id", checkAuth, extractFile, updateProduct);

router.get("", getProducts);

router.get("/:id", getProduct);

router.delete("/:id", deleteProduct);

export default router;
