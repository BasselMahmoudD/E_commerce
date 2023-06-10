const express = require('express');
const router = express.Router();
const WarehouseController = require('./warehouseController');

const warehouseController = new WarehouseController();

router.post('/', warehouseController.createWarehouse);
router.get('/', warehouseController.getWarehouses);
router.get('/:id', warehouseController.getWarehouseById);
router.put('/:id', warehouseController.updateWarehouse);
router.delete('/:id', warehouseController.deleteWarehouse);

module.exports = router;