const express = require("express");
const {
  getAllExchange,
  createExchange,
  getExchangeById,
  updateExchangeById,
  deleteExchangeById,
} = require("../Controllers/exchange");

const advancedResults = require("../Middleware/advancedresults");
const Exchange = require("../Models/Exchange");

const router = express.Router();

const { protect, authorize } = require("../Middleware/auth");

router
  .route("/")
  .get(advancedResults(Exchange, false), getAllExchange)
  .post(protect, authorize("admin"), createExchange);

router
  .route("/:id")
  .get(getExchangeById)
  .put(protect, authorize("admin"), updateExchangeById)
  .delete(protect, authorize("admin"), deleteExchangeById);

module.exports = router;
