const express = require('express');
const {
  getAllHeatPoints,
  createHeatPoint,
  getHeatPointById,
  updateHeatPointById,
  deleteHeatPointById,
} = require('../Controllers/heatPoint');

const advancedResults = require('../Middleware/advancedResults');
const HeatPoint = require('../Models/HeatPoint');

const router = express.Router();

router
  .route('/')
  .get(advancedResults(HeatPoint, null), getAllHeatPoints)
  .post(createHeatPoint);

router
  .route('/:id')
  .get(getHeatPointById)
  .put(updateHeatPointById)
  .delete(deleteHeatPointById);

module.exports = router;
