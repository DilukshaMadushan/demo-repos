const express = require("express");
const {
  getAllLiquidation_15min,
  createLiquidation_15min,
  getLiquidation_15minById,
  updateLiquidation_15minById,
  deleteLiquidation_15minById,
} = require("../../Controllers/Liquidation/liquidation_15min");

const advancedResults = require("../../Middleware/advancedresults");
const Liquidation_15min = require("../../Models/Liquidation/Liquidation_15min");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Liquidation_15min, false), getAllLiquidation_15min)
  .post(createLiquidation_15min);

router
  .route("/:id")
  .get(getLiquidation_15minById)
  .put(updateLiquidation_15minById)
  .delete(deleteLiquidation_15minById);

module.exports = router;
