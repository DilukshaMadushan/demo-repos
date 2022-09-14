const express = require("express");
const {
  getAllLiquidation_1min,
  createLiquidation_1min,
  getLiquidation_1minById,
  updateLiquidation_1minById,
  deleteLiquidation_1minById,
} = require("../../Controllers/Liquidation/liquidation_1min");

const advancedResults = require("../../Middleware/advancedresults");
const Liquidation_1min = require("../../Models/Liquidation/Liquidation_1min");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Liquidation_1min, false), getAllLiquidation_1min)
  .post(createLiquidation_1min);

router
  .route("/:id")
  .get(getLiquidation_1minById)
  .put(updateLiquidation_1minById)
  .delete(deleteLiquidation_1minById);

module.exports = router;
