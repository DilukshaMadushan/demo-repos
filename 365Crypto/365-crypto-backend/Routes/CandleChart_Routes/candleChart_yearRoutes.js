const express = require("express");
const {
  getAllCandleChart_year,
  createCandleChart_year,
  getCandleChart_yearById,
  updateCandleChart_yearById,
  deleteCandleChart_yearById,
} = require("../../Controllers/CandleChart/candleChart_year");

const advancedResults = require("../../Middleware/advancedresults");
const CandleChart_year = require("../../Models/CandleChart/CandleChart_year");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(CandleChart_year, false), getAllCandleChart_year)
  .post(createCandleChart_year);

router
  .route("/:id")
  .get(getCandleChart_yearById)
  .put(updateCandleChart_yearById)
  .delete(deleteCandleChart_yearById);

module.exports = router;
