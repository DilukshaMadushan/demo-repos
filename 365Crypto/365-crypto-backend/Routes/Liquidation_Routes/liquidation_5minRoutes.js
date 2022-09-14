const express = require("express");
const {
  getAllLiquidation_5min,
  createLiquidation_5min,
  getLiquidation_5minById,
  updateLiquidation_5minById,
  deleteLiquidation_5minById,
} = require("../../Controllers/Liquidation/liquidation_5min");

const advancedResults = require("../../Middleware/advancedresults");
const Liquidation_5min = require("../../Models/Liquidation/Liquidation_5min");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Liquidation_5min, false), getAllLiquidation_5min)
  .post(createLiquidation_5min);

router
  .route("/:id")
  .get(getLiquidation_5minById)
  .put(updateLiquidation_5minById)
  .delete(deleteLiquidation_5minById);

module.exports = router;
