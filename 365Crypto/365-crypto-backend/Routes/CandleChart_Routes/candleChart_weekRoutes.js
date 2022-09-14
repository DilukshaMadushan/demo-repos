const express = require("express");
const {
  getAllCandleChart_week,
  createCandleChart_week,
  getCandleChart_weekById,
  updateCandleChart_weekById,
  deleteCandleChart_weekById,
} = require("../../Controllers/CandleChart/candleChart_week");

const advancedResults = require("../../Middleware/advancedresults");
const CandleChart_week = require("../../Models/CandleChart/CandleChart_week");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(CandleChart_week, false), getAllCandleChart_week)
  .post(createCandleChart_week);

router
  .route("/:id")
  .get(getCandleChart_weekById)
  .put(updateCandleChart_weekById)
  .delete(deleteCandleChart_weekById);

module.exports = router;
