const express = require("express");
const {
  getAllLiquidation_1hr,
  createLiquidation_1hr,
  getLiquidation_1hrById,
  updateLiquidation_1hrById,
  deleteLiquidation_1hrById,
} = require("../../Controllers/Liquidation/liquidation_1hr");

const advancedResults = require("../../Middleware/advancedresults");
const Liquidation_1hr = require("../../Models/Liquidation/Liquidation_1hr");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Liquidation_1hr, false), getAllLiquidation_1hr)
  .post(createLiquidation_1hr);

router
  .route("/:id")
  .get(getLiquidation_1hrById)
  .put(updateLiquidation_1hrById)
  .delete(deleteLiquidation_1hrById);

module.exports = router;
