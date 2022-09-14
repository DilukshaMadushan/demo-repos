const express = require('express');
const {
  getAllSensors,
  createSensor,
  getSensorById,
  updateSensorById,
  deleteSensorById,
} = require('../Controllers/sensor');

const advancedResults = require('../Middleware/advancedResults');
const Sensor = require('../Models/Sensor');

const router = express.Router();

router
  .route('/')
  .get(advancedResults(Sensor, null), getAllSensors)
  .post(createSensor);

router
  .route('/:id')
  .get(getSensorById)
  .put(updateSensorById)
  .delete(deleteSensorById);

module.exports = router;
