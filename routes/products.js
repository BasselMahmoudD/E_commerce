const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const ProductController = require("./productController");

router.post(
  "/",
  
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("quantity").notEmpty().withMessage("Quantity is required"),
    body("warehouse_id").notEmpty().withMessage("Warehouse ID is required"),
  ],
  ProductController.createProduct
);

router.get("/", ProductController.listProducts);

router.get("/:id", ProductController.getProduct);

router.delete("/:id", ProductController.deleteProduct);

module.exports = router;