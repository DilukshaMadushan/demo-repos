const express = require("express");
const {
  getAllLiquidation_24hr,
  createLiquidation_24hr,
  getLiquidation_24hrById,
  updateLiquidation_24hrById,
  deleteLiquidation_24hrById,
} = require("../../Controllers/Liquidation/liquidation_24hr");

const advancedResults = require("../../Middleware/advancedresults");
const Liquidation_24hr = require("../../Models/Liquidation/Liquidation_24hr");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Liquidation_24hr, false), getAllLiquidation_24hr)
  .post(createLiquidation_24hr);

router
  .route("/:id")
  .get(getLiquidation_24hrById)
  .put(updateLiquidation_24hrById)
  .delete(deleteLiquidation_24hrById);

module.exports = router;
