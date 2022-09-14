const express = require("express");
const {
  getAllCoinEvents_Categories,
  createCoinEvents_Categories,
  getCoinEvents_CategoriesById,
  updateCoinEvents_CategoriesById,
  deleteCoinEvents_CategoriesById,
} = require("../../Controllers/CoinEvents/coinEvents_Categories");

const advancedResults = require("../../Middleware/advancedresults");
const CoinEvents_Categories = require("../../Models/CoinEvents/CoinEvents_Categories");

const router = express.Router();

router
  .route("/")
  .get(getAllCoinEvents_Categories)
  .post(createCoinEvents_Categories);

router
  .route("/:id")
  .get(getCoinEvents_CategoriesById)
  .put(updateCoinEvents_CategoriesById)
  .delete(deleteCoinEvents_CategoriesById);

module.exports = router;
