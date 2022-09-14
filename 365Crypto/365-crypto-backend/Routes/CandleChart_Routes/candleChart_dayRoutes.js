const express = require("express");
const {
  getAllCandleChart_day,
  createCandleChart_day,
  getCandleChart_dayById,
  updateCandleChart_dayById,
  deleteCandleChart_dayById,
} = require("../../Controllers/CandleChart/candleChart_day");

const advancedResults = require("../../Middleware/advancedresults");
const CandleChart_day = require("../../Models/CandleChart/CandleChart_day");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(CandleChart_day, false), getAllCandleChart_day)
  .post(createCandleChart_day);

router
  .route("/:id")
  .get(getCandleChart_dayById)
  .put(updateCandleChart_dayById)
  .delete(deleteCandleChart_dayById);

module.exports = router;
