const express = require("express");
const {
  getAllCoin,
  createCoin,
  getCoinById,
  updateCoinById,
  deleteCoinById,
} = require("../Controllers/coin");

const searchCoin = require("../Middleware/searchCoin");
const Coin = require("../Models/Coin");

const router = express.Router();

const { protect, authorize } = require("../Middleware/auth");

router
  .route("/")
  .get(searchCoin(Coin, false), getAllCoin)
  .post(protect, authorize("admin"), createCoin);

router
  .route("/:id")
  .get(getCoinById)
  .put(protect, authorize("admin"), updateCoinById)
  .delete(protect, authorize("admin"), deleteCoinById);

module.exports = router;
