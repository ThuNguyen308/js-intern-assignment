import express from "express";
import {
  createProductController,
  updateProductController,
  deleteProductController,
  fetchAllProductController,
  fetchSingleProductController,
} from "../controllers/productController.js";

const router = express.Router();

//FETCH ALL PRODUCT
router.get("/", fetchAllProductController);

//FETCH SINGLE PRODUCT
router.get("/:id", fetchSingleProductController);

//CREATE PRODUCT
router.post("/", createProductController);

//UPDATE PRODUCT
router.put("/:id", updateProductController);

//DELETE PRODUCT
router.delete("/:id", deleteProductController);

export default router;
