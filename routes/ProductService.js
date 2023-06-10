const util = require("util");
const conn = require("../db/dbconnection");

class ProductService {
  async createProduct(productData) {
    const query = util.promisify(conn.query).bind(conn);
    const idExist = await query("SELECT * FROM warehouse WHERE id = ?", [
      productData.warehouse_id,
    ]);

    if (!idExist[0]) {
      throw new Error("Warehouse not found");
    }

    const createdProduct = await query("INSERT INTO product SET ?", productData);
    return createdProduct;
  }

  async listProducts() {
    const query = util.promisify(conn.query).bind(conn);
    const products = await query("SELECT * FROM product");
    return products;
  }

  async getProduct(productId) {
    const query = util.promisify(conn.query).bind(conn);
    const product = await query("SELECT * FROM product WHERE id = ?", [
        productId,
        ]);
        return product[0];
        }
        
        async deleteProduct(productId) {
        const query = util.promisify(conn.query).bind(conn);
        await query("DELETE FROM product WHERE id = ?", [productId]);
        }
        }
        
        module.exports = ProductService;