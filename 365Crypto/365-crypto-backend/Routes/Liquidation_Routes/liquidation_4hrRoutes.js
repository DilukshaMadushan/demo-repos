const express = require("express");
const {
  getAllLiquidation_4hr,
  createLiquidation_4hr,
  getLiquidation_4hrById,
  updateLiquidation_4hrById,
  deleteLiquidation_4hrById,
} = require("../../Controllers/Liquidation/liquidation_4hr");

const advancedResults = require("../../Middleware/advancedresults");
const Liquidation_4hr = require("../../Models/Liquidation/Liquidation_4hr");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Liquidation_4hr, false), getAllLiquidation_4hr)
  .post(createLiquidation_4hr);

router
  .route("/:id")
  .get(getLiquidation_4hrById)
  .put(updateLiquidation_4hrById)
  .delete(deleteLiquidation_4hrById);

module.exports = router;
