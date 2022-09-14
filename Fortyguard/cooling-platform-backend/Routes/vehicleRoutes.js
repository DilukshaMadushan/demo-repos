const express = require('express');
const {
  getAllVehicles,
  createVehicle,
  getVehicleById,
  updateVehicleById,
  deleteVehicleById,
} = require('../Controllers/vehicle');

const advancedResults = require('../Middleware/advancedResults');
const Vehicle = require('../Models/Vehicle');

const router = express.Router();

router
  .route('/')
  .get(advancedResults(Vehicle, null), getAllVehicles)
  .post(createVehicle);

router
  .route('/:id')
  .get(getVehicleById)
  .put(updateVehicleById)
  .delete(deleteVehicleById);

module.exports = router;
