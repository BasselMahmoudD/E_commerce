const { validationResult } = require("express-validator");
const WarehouseService = require("./warehouseService");

class WarehouseController {
  static async createWarehouse(req, res) {
    try {
      const { name, location } = req.body;

      const warehouseService = new WarehouseService();
      const isNameExist = await warehouseService.isNameExist(name);

      if (isNameExist) {
        return res.status(400).json({
          errors: [{ msg: "Name already exists" }],
        });
      }

      const warehouse = await warehouseService.createWarehouse(name, location);

      res.status(200).json({
        msg: "Insert add successfuly",
        data: warehouse,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  static async getWarehouses(req, res) {
    try {
      const warehouseService = new WarehouseService();
      const warehouses = await warehouseService.getWarehouses();

      res.status(200).json(warehouses);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  static async getWarehouseById(req, res) {
    try {
      const { id } = req.params;

      const warehouseService = new WarehouseService();
      const warehouse = await warehouseService.getWarehouseById(id);

      if (!warehouse) {
        return res.status(404).json({ msg: "Warehouse not found" });
      }

      res.status(200).json(warehouse);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  static async updateWarehouse(req, res) {
    try {
      const { id } = req.params;
      const { name, location } = req.body;

      const warehouseService = new WarehouseService();
      const warehouse = await warehouseService.getWarehouseById(id);

      if (!warehouse) {
        return res.status(404).json({ msg: "Warehouse not found" });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const updatedWarehouse = await warehouseService.updateWarehouse(
        id,
        name,
        location
      );

      res.status(200).json({
        msg: "Warehouse updated successfully",
        data: updatedWarehouse,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  static async deleteWarehouse(req, res) {
    try {
      const { id } = req.params;

      const warehouseService = new WarehouseService();
      const warehouse = await warehouseService.getWarehouseById(id);

      if (!warehouse) {
        return res.status(404).json({ msg: "Warehouse not found" });
      }

      await warehouseService.deleteWarehouse(id);

      res.status(200).json({ msg: "Warehouse deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
}

module.exports = WarehouseController;