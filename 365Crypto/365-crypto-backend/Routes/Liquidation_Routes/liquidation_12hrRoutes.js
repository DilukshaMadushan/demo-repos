const express = require("express");
const {
  getAllLiquidation_12hr,
  createLiquidation_12hr,
  getLiquidation_12hrById,
  updateLiquidation_12hrById,
  deleteLiquidation_12hrById,
} = require("../../Controllers/Liquidation/liquidation_12hr");

const advancedResults = require("../../Middleware/advancedresults");
const Liquidation_12hr = require("../../Models/Liquidation/Liquidation_12hr");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Liquidation_12hr, false), getAllLiquidation_12hr)
  .post(createLiquidation_12hr);

router
  .route("/:id")
  .get(getLiquidation_12hrById)
  .put(updateLiquidation_12hrById)
  .delete(deleteLiquidation_12hrById);

module.exports = router;
