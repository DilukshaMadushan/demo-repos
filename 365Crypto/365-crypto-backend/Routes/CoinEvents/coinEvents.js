const express = require("express");
const {
  getAllCoinEvents,
  createCoinEvents,
  getCoinEventsById,
  updateCoinEventsById,
  deleteCoinEventsById,
} = require("../../Controllers/CoinEvents/coinEvents");

const searchCoinEvents = require("../../Middleware/searchCoinEvents");
const CoinEvents = require("../../Models/CoinEvents/CoinEvents");

const router = express.Router();

router
  .route("/")
  .get(searchCoinEvents(CoinEvents, "coins"), getAllCoinEvents)
  .post(createCoinEvents);

router
  .route("/:id")
  .get(getCoinEventsById)
  .put(updateCoinEventsById)
  .delete(deleteCoinEventsById);

module.exports = router;
