const express = require("express");
const {
  getAllCandleChart_month,
  createCandleChart_month,
  getCandleChart_monthById,
  updateCandleChart_monthById,
  deleteCandleChart_monthById,
} = require("../../Controllers/CandleChart/candleChart_month");

const advancedResults = require("../../Middleware/advancedresults");
const CandleChart_month = require("../../Models/CandleChart/CandleChart_month");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(CandleChart_month, false), getAllCandleChart_month)
  .post(createCandleChart_month);

router
  .route("/:id")
  .get(getCandleChart_monthById)
  .put(updateCandleChart_monthById)
  .delete(deleteCandleChart_monthById);

module.exports = router;
