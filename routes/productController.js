const { validationResult } = require("express-validator");
const ProductService = require("./ProductService");

class ProductController {
  static async createProduct(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const productData = {
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        warehouse_id: req.body.warehouse_id,
      };

      const productService = new ProductService();
      const createdProduct = await productService.createProduct(productData);

      res.status(200).json({
        msg: "product created successfully",
        product: createdProduct,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  static async listProducts(req, res) {
    try {
      const productService = new ProductService();
      const products = await productService.listProducts();

      res.status(200).json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  static async getProduct(req, res) {
    try {
      const productService = new ProductService();
      const product = await productService.getProduct(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  static async deleteProduct(req, res) {
    try {
      const productService = new ProductService();
      const product = await productService.getProduct(req.params.id);

      if (!product) {
        res.status(404).json({ msg: "product not found" });
      }

      await productService.deleteProduct(req.params.id);

      res.status(200).json({ msg: "product deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
}

module.exports = ProductController;