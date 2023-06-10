const util = require("util");
const conn = require("../db/dbconnection");

class WarehouseService {
  async isNameExist(name) {
    const query = util.promisify(conn.query).bind(conn);
    const warehouses = await query("SELECT * FROM warehouse WHERE name = ?", [
      name,
    ]);
    return warehouses.length > 0;
  }

  async createWarehouse(name, location) {
    const query =util.promisify(conn.query).bind(conn);
    const warehouse = {
    name,
    location,
    };
    await query("INSERT INTO warehouse SET ?", warehouse);
    }
    
    async getAllWarehouses() {
    const query = util.promisify(conn.query).bind(conn);
    const warehouses = await query("SELECT * FROM warehouse");
    return warehouses;
    }
    
    async getWarehouseById(id) {
    const query = util.promisify(conn.query).bind(conn);
    const warehouses = await query(
    "SELECT * FROM warehouse WHERE id = ?",
    [id]
    );
    if (warehouses.length === 0) {
    throw new Error("Warehouse not found");
    }
    return warehouses[0];
    }
    
    async updateWarehouse(id, name, status, location) {
    const query = util.promisify(conn.query).bind(conn);
    const warehouse = await this.getWarehouseById(id);
    const newWarehouse = {
    name: name || warehouse.name,
    status: status || warehouse.status,
    location: location || warehouse.location,
    };
    await query("UPDATE warehouse SET ? WHERE id = ?", [
    newWarehouse,
    warehouse.id,
    ]);
    }
    
    async deleteWarehouse(id) {
    const query = util.promisify(conn.query).bind(conn);
    const warehouse = await this.getWarehouseById(id);
    await query("DELETE FROM warehouse WHERE id = ?", [warehouse.id]);
    }
    }
    
    module.exports = WarehouseService;